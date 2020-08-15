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

//create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*17+1) * box
}

//create score variable
let score = 0;

//draw everything to canvas
function draw(){

    ctx.drawImage(ground, 0, 0);

}

//call draw function every 100ms
let game = setInterval(draw);