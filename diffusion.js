import {Grid, GridCell} from './grid.js';

const canvas = document.getElementById('canvas');
const canvas2d = document.getElementById('canvas2d');
const btn = document.getElementById('start');
const btn2 = document.getElementById('start2d');
const ballCnt = document.getElementById('ballCnt');
const autoStart = document.getElementById('autoStart');
const speedCnt = document.getElementById('speedCnt');

canvas.width = 500;
canvas.height = 500;
canvas2d.width = 500;
canvas2d.height = 50;


const g = new Grid(canvas.height, canvas.width, 20, canvas, false);
const g2 = new Grid(canvas.height, canvas.width, 50, canvas2d, true);
let speed = 1000;

function move(grid){
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            let cell = grid.get(row, col);
            grid.diffuse(cell);
            
        }
    }
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            let cell = grid.get(row, col);
            grid.redrawCell(cell);
            for (let ball of cell.balls){
                ball.visited = false;
            }
        }
    }
}


let started = false;
function diffuseAuto(){
    const mainLoopId = setInterval(function(){
        move();
    }, speed);
}

autoStart.addEventListener('click', function(){
    if (!started){
        diffuseAuto();
        started = true;
    }
    else{
        clearInterval(mainLoopId);
        started = false;
    }
})
speedCnt.addEventListener('change', function(){
    speed = parseInt(speedCnt.value);
    clearInterval(mainLoopId);
    diffuseAuto();
})

ballCnt.addEventListener('change', function(){
    g.ballCntAdd = parseInt(ballCnt.value);
})

btn.addEventListener('click', function(){
    move(g);
})

btn2.addEventListener('click', function(){
    move(g2);
})
