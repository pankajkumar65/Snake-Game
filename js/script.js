// Game constant and variable
let inputdir = {x:0,y:0};
const musicsound = new Audio('music.mp3');
const eatsound = new Audio('eatsound.mp3');
const movesound = new Audio('move.mp3');
const gameover = new Audio('gameover.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:15}
]
let food = {x:6,y:10};
let score = 0;

//Game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime =  ctime;
    gamefunction();
}

function isCollide(){
    return false;
}

function gamefunction(){
    // part-1 : update snakearray and food
      
    if(isCollide(snakeArr)){
        gameover.play()
        musicsound.pause()
        inputdir = {x:0,y:0};
        alert("Gameover. press any key to play again!")
        snakeArr = [{x:13,y:15}]
        musicsound.play()
        score = 0;
    }

    // if you have eaten food then increament score and regenerate food
    
    if((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y)){
        console.log("chal rha hai");
        eatsound.play()
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a + (b-a)*Math.random()) ,y:Math.round(a + (b-a)*Math.random())}

    }

     // Moving the snake
       for(let i = snakeArr.length - 2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]};
       }

       snakeArr[0].x += inputdir.x;
       snakeArr[0].y += inputdir.y;


 

    //part-2 : display snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;

       if(index==0){
        snakeElement.classList.add('head');
       }
       
       else{
        snakeElement.classList.add('snake');
       }

       board.appendChild(snakeElement);

    });



    //Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




//main logic starts here
window.requestAnimationFrame(main);

addEventListener('keydown',e=>{
  inputdir = {x:0,y:1};//start the game

  movesound.play()

  switch (e.key) {
    case "ArrowUp":
        console.log('ArrowUp');
        inputdir.x = 0;
        inputdir.y = -1;
        break;

    case "ArrowDown":
        console.log('ArrowDown'); 
        inputdir.x = 0;
        inputdir.y = 1;
        break;

    case "ArrowLeft":
        console.log("ArrowLeft");
        inputdir.x = -1;
        inputdir.y = 0;
        break; 

    case "ArrowRight":
        console.log("ArrowRight");
        inputdir.x = 1;
        inputdir.y = 0;  
        break;

    default:
        break;
  }



});