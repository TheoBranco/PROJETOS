var foguete_voando, foguete_explosão, foguete;
var meteoroImg, meteoroGroup;
var espaçoImg, espaço;
var pontos = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var explosãoImg, explosão;
var gameOverImg, gameOver;


function preload(){

    espaçoImg = loadImage("espaço");
    meteoroImg = loadImage("meteoro.png");
    foguete_voando = loadAnimation("foguete_voando.png");
    foguete_explosão = loadAnimation("foguete_explosao.png");
    gameOverImg = loadImage("gameOver.png");

}

function setup() {
    createCanvas(600,600);

    espaço = createSprite(300,300);
    espaço.addImage(espaçoImg);
    espaço.velocityY = 1;

    foguete = createSprite(300,500);
    foguete.addAnimation("voando", foguete_voando);
    foguete.addAnimation("explosão", foguete_explosão);
    foguete.scale = 0.5

    

    meteoroGroup = new Group();
    
    gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;



}

function gerarMeteoro(){

    if(World.frameCount % 80 == 0){   
        var meteoro = createSprite(Math.round(random(50, 550)), 10, 10);
        meteoro.addImage(meteoroImg);
        meteoro.velocityY = 3;
        meteoro.lifetime = 700;
        meteoro.scale = 0.08;
        meteoroGroup.add(meteoro);

    }

}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    
    meteoroGroup.destroyEach();
    
    espaço.velocityY = 1;
    
    foguete.changeAnimation("voando",foguete_voando);
    
    
  }
  


function draw() {
    //reset();
    

    
    background("black");

   

    if (gameState===PLAY){

      
        foguete.y = World.mouseY;
        foguete.x = World.mouseX;
      
      
        if(espaço.y > 600){
            espaço.y = height/4;
          }
      
        
        gerarMeteoro();
        
      
        if(foguete.isTouching(meteoroGroup)){
            gameState = END;
        }
      }
      else if (gameState === END) {
        
        
        espaço.velocityY = 0;
        foguete.velocityY = 0;
        meteoroGroup.setVelocityYEach(0);
        foguete.changeAnimation("explosão", explosão);
        
        
        meteoroGroup.setLifetimeEach(-1);
        
        gameOver.visible = true;
        
        if(mousePressedOver(gameOver)) {
          reset();
        }
      }



    drawSprites()
}