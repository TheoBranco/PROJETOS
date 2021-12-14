var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,100);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  invisibleBlockGroup = new Group();
  
  climbersGroup = new Group();

  doorsGroup = new Group();

  //spookySound.loop()


}

function gerarPortas(){
 if(frameCount % 240 == 0){
  door = createSprite(200,-50);
  door.addImage(doorImg);
  door.x = Math.round(random(120,400))
  door.velocityY = 1;
  door.lifetime = 700;
  doorsGroup.add(door);

  climber = createSprite(door.x, 10)
  climber.addImage(climberImg);
  climber.velocityY = 1;
  climber.lifetime = 700;
  climbersGroup.add(climber);
  climber.debug = true;

  invisibleBlock = createSprite(door.x, 15, climber.width, 2);
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 700;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug = true;

  ghost.depth = door.depth;
  ghost.depth += 1;
   
}

}
function draw() {
  background(200);
  
if(gameState ==="play"){

  if(tower.y > 400){
    tower.y = 300
  }

  if (keyDown("left_arrow")) {
     ghost.x -= 3; } 
    
  if (keyDown("right_arrow")) {
     ghost.x += 3; }

if(keyDown("space")){
  ghost.velocityY = -6;

  
}
ghost.velocityY += 0.4;

if(ghost.isTouching(climbersGroup)){
  ghost.velocityY = 0;

}

  drawSprites()
  gerarPortas()

  if(ghost.isTouching(invisibleBlockGroup) || (ghost.y > 600)){
    gameState = "end";

  }

}
if(gameState ==="end"){
  background("black");
  doorsGroup.velocityY = 0
  textSize(50)
  text("Você perdeu",100,300);



}
  
}
