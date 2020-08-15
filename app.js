const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//create the snake
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 9 * box
}

//controlling the movement of snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let keyPress = event.keyCode;
    //second condition prevents snake from going in opposite direction
    if(keyPress == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(keyPress == 38 && d != "DOWN"){
        d = "UP";
    }else if(keyPress == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(keyPress == 40 && d != "UP"){
        d = "DOWN";
    }
}

//in the case snake collides with itself
function collision(head, array){
    for(let i = 0 ; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*17+1) * box
}

//create score variable
let score = 0;

//draw everything to canvas
function draw(){

    //draw background
    ctx.drawImage(ground, 0, 0);

    for(let i=0; i < snake.length ; i++){
        //if i is 0 then green otherwise boxes will be white
        ctx.fillStyle = (i == 0)? "green" : "white"; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        //the head of snake will have red border
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //draw the food image to screen at random location
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //look at direction player has moved snaked
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //when snake eats the food
    if (snakeX == food.x && snakeY == food.y){
        score++;
        //generate new position for food plus dont remove tail
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        //remove the tail
        snake.pop();
    }

    //Add new head of snake
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
        clearInterval(game);
    }
    

    snake.unshift(newHead);



    //show score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2 * box, 1.6 * box);
}

//call draw function every 100ms
let game = setInterval(draw,100);