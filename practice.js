let out = document.querySelector(".out");
let snake = document.querySelector(".snakeHead");
let left = document.querySelector(".left");
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let right = document.querySelector(".right");
let food = document.querySelector(".food")

let way = "s";
let speed = 100;
let step = 10;
let area = 290;
let coordinates= [];
let i = 1;
let fail = "You fail"

function moveBody (x) {
  setInterval(()=>{
    document.querySelector(`${"#part"+x}`).style.top = coordinates[x][0];
     document.querySelector(`${"#part"+x}`).style.left = coordinates[x][1];
  }, 0)
}

function coord () {
  let arr = coordinates.slice(0,i-1);
  if (arr.find((el) => snake.style.top === el[0] && snake.style.left === el[1])) {
    alert(fail);
    location.reload();
  }
  if (coordinates.size > 900) coordinates.pop();
  coordinates.unshift([snake.style.top, snake.style.left])
}

function randLocFood () {
  food.style.top = Math.round(Math.random()*29)*step + "px";
  food.style.left = Math.round(Math.random()*29)*step + "px";
}

function check() {
  let locTopFood = parseInt(food.style.top);
let locLeftFood = parseInt(food.style.left)
let locTopSnake = parseInt(snake.style.top);
let locLeftSnake = parseInt(snake.style.left)
  if (locTopFood === locTopSnake && locLeftFood === locLeftSnake) {
    randLocFood();
     out.insertAdjacentHTML("afterbegin", `<div class='snakeBody' style='top:${coordinates[0][0]}; left:${coordinates[0][1]}' id='${'part'+i}'></div>`)
     moveBody(i)
     i += 1;
     //speed -= 10;
  }
}

function downStep() {
    if(way === "d" || (way === "t" && i > 1)) {
    return;
  }
  way = "d";
    if (parseInt(snake.style.top) != area)
  { 
    check();
    snake.style.top = (parseInt(snake.style.top) || 0) + step + "px";
    coord();
  }
  let timeDown = setInterval( () => {
    if (parseInt(snake.style.top) > area) {
       alert(fail);
       clearInterval(timeDown);
       location.reload();
    }
    if (way != "d") {
        check();
        clearInterval(timeDown);
        return 
  }
    check();
    snake.style.top = (parseInt(snake.style.top) || 0) + step + "px";
    coord();
}, speed)
}

function topStep() {
  if(way === "t" || (way === "d" && i > 1)) {
    return;
  }
  way = "t";
  if (parseInt(snake.style.top) != 0)
  { 
    check();
    snake.style.top = (parseInt(snake.style.top) || 0) - step + "px";
    coord();
  }
  let timeTop = setInterval( () => {
    if (parseInt(snake.style.top) < 0) {
       alert(fail);
       clearInterval(timeTop);
       location.reload();
    } 
    if (way != "t") {
        check();
        clearInterval(timeTop);
        return 
  }
  check();
 
    snake.style.top = (parseInt(snake.style.top) || 0) - step + "px";
     coord();
}, speed)
}

function leftStep() {
   if(way === "l" || (way === "r" && i > 1)) {
    return;
  }
  way = "l";
  if (parseInt(snake.style.left) != 0)
  { 
    check();
    snake.style.left = (parseInt(snake.style.left) || 0) - step + "px";
    coord();
  }
  let timeLeft = setInterval( () => {
    if (parseInt(snake.style.left) < 0) {
      alert(fail);
       clearInterval(timeLeft);
       location.reload();
    }
    if (way != "l") {
        check();
        clearInterval(timeLeft);
        return 
  }
  check();
  snake.style.left = (parseInt(snake.style.left) || 0) - step + "px";
   coord();
  }, speed)
}

function rightStep() {
  if(way === "r" || (way === "l" && i > 1)) {
    return;
  }
  way = "r";
  if (parseInt(snake.style.left) != area)
  { 
    check();
    snake.style.left = (parseInt(snake.style.left) || 0) + step + "px";
    coord();
  }
    let timeRight = setInterval( () => {
      if (parseInt(snake.style.left) > area) {
        alert(fail);
       clearInterval(timeRight);
       location.reload();
      }
      if (way != "r") {
         check();
    clearInterval(timeRight);
    return 
  }
  check();
      snake.style.left = (parseInt(snake.style.left) || 0) + step + "px";
       coord();
    }, speed)
}

down.addEventListener("click", downStep, true)

up.addEventListener("click", topStep, true)

left.addEventListener("click", leftStep, true)

right.addEventListener("click", rightStep, true)
