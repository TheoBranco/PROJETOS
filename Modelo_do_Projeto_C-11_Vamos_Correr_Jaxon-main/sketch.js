var carlos,rua;
var carlosImg,ruaImg;
var parede,parede2,parede3,parede4;
var altura_aleatoria = 0;

function preload(){
  //imagens pré-carregadas
  ruaImg = loadImage("path.png");
  carlosImg = loadAnimation("Runner-1.png","Runner-2.png");
}

function setup(){
  createCanvas(400,400);
  //crie sprite aqui
  rua = createSprite(200,100,100,100);
  rua.addImage(ruaImg);
  rua.scale = 1.2
  rua.velocityY = 8

  carlos = createSprite(200,300,100,100);
  carlos.addAnimation("carlosCorrendo", carlosImg);
  carlos.scale = 0.07


  parede = createSprite(34,200,10,400);
  parede.visible = false;

  parede2 = createSprite(375,200,10,400);
  parede2.visible = false;

  parede3 = createSprite(200,10,400,10);
  parede3.visible = false;

  parede4 = createSprite(200,390,400,10);
  parede4.visible = false;



}

function draw() {
  background("green");

  if(rua.y > 400){
    rua.y = height/4;
  }

  if(keyIsDown(RIGHT_ARROW)){
    carlos.position.x = carlos.position.x +5
  }

  if(keyIsDown(LEFT_ARROW)){
    carlos.position.x = carlos.position.x -5
  }
  
  if(keyIsDown(UP_ARROW)){
    carlos.position.y = carlos.position.y -5
  }

  if(keyIsDown(DOWN_ARROW)){
    carlos.position.y = carlos.position.y +5
  }
  
  carlos.collide(parede3);
  carlos.collide(parede);
  carlos.collide(parede2);
  carlos.collide(parede4);

drawSprites();

}


