var PLAY = 1;
var END = 0;
var gameState = 1;

var ghost, ghostimg;
var background1, backgroundimg, door, doorimg, climber, climberimg, audio;
var doorgroup, climbergroup;

function preload(){

  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  backgroundimg = loadImage("tower.png");
  ghostimg = loadImage("ghost-standing.png");
  audio = loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600);
  
  background1 = createSprite (300,300);
  background1.addImage(backgroundimg);
  background1.velocityY = 2;
  
  doorgroup = new Group();
  climbergroup = new Group();
  
  ghost = createSprite (300,300)
  ghost.addImage(ghostimg);
  ghost.scale = 0.4;
}
  


function draw(){
  background("white");
  
  if(background1.y > 400){
     background1.y = height / 2;
  }
  
  audio.play();
  
  if(gameState === PLAY){
  
    ghost.velocityY = ghost.velocityY + 0.5;
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
  
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 7;
    }
  
    if(keyDown("left_arrow")){
      ghost.x -= 7;
    }
  
    if(climbergroup.isTouching(ghost) || ghost.y>600){
      ghost.velocityY = 0;
      ghost.destroy();
      gameState = END;
    }
    
    spawndoors();
  }
  
  drawSprites();
  
  if(gameState === END){
    background("black");
    textSize (30);
    fill ("yellow");
    stroke("yellow")
    text ("GAME OVER", 210,300);
    
  }
}

function spawndoors(){
  
  if(frameCount % 240 === 0){
    door = createSprite (100,-50);
    door.addImage(doorimg);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 400;
    doorgroup.add(door);
    
    climber = createSprite (100,10);
    climber.addImage(climberimg);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 400;
    climbergroup.add(climber);
    
    ghost.depth = door.depth + 1;
    ghost.depth = climber.depth + 1;
  }
}