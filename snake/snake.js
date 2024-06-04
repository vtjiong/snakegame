//board
var blocksize = 25
var row = 20
var column = 20
var board;
var context;

//snake head 
// This is saying that it will start at 5,5
var snakeX= blocksize*5
var snakeY= blocksize*5

var velocityX = 0
var velocityY = 0
//snake body
var snakebody = [];
//food 
var foodX; 
var foodY;

var gameOver = false;

window.onload = function () {
    board = document.getElementById("board")
    board.height = row * blocksize
    board.width = column * blocksize
    /* Rendering Context: This is what context refers to in the board.getContext method. 
     * The rendering context determines the capabilities of the canvas element, such as 
     * whether it can handle 2D or 3D graphics. It's the object that contains all the methods
     *  and properties needed to draw graphics on the canvas.
     */
    context = board.getContext("2d")// used for drawing the board
    placeFood()
    // find keyup, and then call the function changedirection
    document.addEventListener("keyup", changeDirection)
    setInterval(update,1000/10)// run 10 times every second
}

function update() {
    if (gameOver) {
        return;
    }
    // starting from 0,0 (0,0 is in the middle of the website) and creating a reactangle with the size of 500 * 500
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

     // create the food for the snake
    context.fillStyle = "pink"
    // location of the food is at foodx, foody and the size is blocksize
    context.fillRect(foodX, foodY, blocksize, blocksize)

    if (snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX, foodY])
        placeFood()
    }
    for (let i = snakebody.length - 1; i > 0; i--){
        snakebody[i]=snakebody[i-1]
    }
    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY]
    }

   //create a rectangle at the position 5,5 of the size blocksize
    context.fillStyle = "red" // The color of the snake
    snakeX += velocityX * blocksize // we multiply by it so thta we move 1 unit at a time
    snakeY += velocityY * blocksize
    context.fillRect(snakeX, snakeY, blocksize, blocksize)
    for (let x = 0; x < snakebody.length; x++){
        context.fillRect(snakebody[x][0],snakebody[x][1],blocksize,blocksize)
    }
    //game over conditions
    if (snakeX < 0 || snakeX > column*blocksize || snakeY < 0 || snakeY > row*blocksize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}
        

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY !=1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code == "ArrowLeft"&& velocityX!=1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code == "ArrowRight" && velocityX!=-1) {
        velocityX = 1
        velocityY=0
    }
}

function placeFood() {
    // Math.floor round downs the stuff
    //((0 to 1)*cols)*blocksize
    foodX = Math.floor(Math.random() * column) * blocksize 
    foodY= Math.floor(Math.random()*row)*blocksize 
}