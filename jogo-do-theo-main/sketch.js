var edges;
var foguete_voando, foguete_explosão, foguete;
var meteoroImg, meteoroGroup;
var espaçoImg, espaço;
var pontos = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var explosãoImg, explosão;
var gameOverImg, gameOver;
var coraçãoImg;
var vidas = [];
var moedaImg, moedaGroup;
var alienGroup, alienImg;
var laserAzul, laserAzulImg, laserAzulGroup;
var lazerVermelho, laserVermelhoImg, laserVermelhoGroup;

function preload(){

    espaçoImg = loadImage("espaço");
    meteoroImg = loadImage("meteoro.png");
    foguete_voando = loadAnimation("foguete_voando.png");
    foguete_explosão = loadAnimation("foguete_explosao.png");
    gameOverImg = loadImage("gameOver.png");
    coraçãoImg = loadImage("coração.png");
    moedaImg = loadImage("moeda.png");
    alienImg = loadImage("alien.png");
    laserAzulImg = loadImage("laser azul.png");
    laserVermelhoImg = loadImage("laser vermelho.png");
}

function setup() {
    createCanvas(600,600);

    edges = createEdgeSprites();

    espaço = createSprite(300,300);
    espaço.addImage(espaçoImg);
    espaço.velocityY = 1;

    foguete = createSprite(300,300);
    foguete.addAnimation("voando", foguete_voando);
    foguete.addAnimation("explosão", foguete_explosão);
    foguete.scale = 0.35

    for(var i = 0; i < 3; i ++){
      var vida = createSprite(50 + 55*i, 50)
      vida.addImage(coraçãoImg)
      vida.scale = 0.2
      vidas.push(vida)
    }

    meteoroGroup = new Group();
    moedaGroup = new Group();
    alienGroup = new Group();
    laserAzulGroup = new Group();
    laserVermelhoGroup = new Group();
    
    gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    foguete.setCollider("circle",0,0,150);
    //foguete.debug = true;



}

function gerarMoeda(){

    if(World.frameCount % 80 == 0){   
        var moeda = createSprite(Math.round(random(50, 550)), 10, 10);
        moeda.addImage(moedaImg);
        moeda.velocityY = 10;
        moeda.lifetime = 700;
        moeda.scale = 0.08;
        moedaGroup.add(moeda);

    }

}

function gerarAlien(){

  if(World.frameCount % 140 == 0){   
    var alien = createSprite(Math.round(random(50, 550)), 10, 10);
    alien.addImage(alienImg);
    alien.velocityX = 7;
    alien.scale = 0.3;
    alienGroup.add(alien);

}

}

function atirarFoguete(){
  laserAzul= createSprite(150, width/2, 50,20)
  laserAzul.y= foguete.y
  laserAzul.x= foguete.x
  laserAzul.addImage(laserAzulImg)
  laserAzul.scale=0.5
  laserAzul.velocityY= -7
  laserAzulGroup.add(laserAzul)
}

function gerarMeteoro(){

  if(World.frameCount % 80 == 0){   
    var meteoro = createSprite(Math.round(random(50, 550)), 10, 10);
    meteoro.addImage(meteoroImg);
    meteoro.velocityY = 3;
    meteoro.lifetime = 700;
    meteoro.scale = 0.1;
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

  atirarFoguete();
  


function draw() {
    //reset();

    
    background("black");

   alienGroup.bounceOff(edges);

    if (gameState===PLAY){

      
        foguete.y = World.mouseY;
        foguete.x = World.mouseX;
      
      
        if(espaço.y > 600){
            espaço.y = height/4;
          }
      
        
        gerarMeteoro();
        gerarMoeda();
        gerarAlien();

        if(keyDown("space")){
          atirarFoguete();
        }

        laserAzulGroup.overlap(alienGroup, function(coletor,coletado){
          coletado.remove()
          coletor.remove()
          pontos +=2
  
        })

        laserAzulGroup.overlap(meteoroGroup, function(coletor,coletado){
          coletado.remove()
          coletor.remove()
  
        })

        foguete.overlap(alienGroup, function(coletor,coletado){
          coletado.remove()
          vidas[vidas.length-1].destroy();
  
        })

        
        
        if(foguete.isTouching(meteoroGroup)){
            meteoroGroup.destroyEach();
            vidas[vidas.length-1].destroy();
            vidas.pop();

        }

        if(vidas.length ==0){
          gameState = END
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

      foguete.overlap(moedaGroup, function(coletor,coletado){
        coletado.remove()
        pontos++

      })
        
        

      



    drawSprites()
    textSize(40);
    fill("white");
    text("Pontos: "+ pontos,400, 50);
}