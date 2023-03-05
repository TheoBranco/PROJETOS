var ball;
var ground;
var left;
var right;
var top_wall;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	
}

function setup() {
	createCanvas(900, 800);


	engine = Engine.create();
	world = engine.world;
	

	//Create the Bodies Here.
	var ball_options={
		isStatic:false,
		restitution:0,
		density:1.2
	}

	ground =new Ground(200,390,400,20);
	right = new Ground(390,200,20,400);
	left = new Ground(10,200,20,400);
	top_wall = new Ground(200,10,400,20);


	ball = Bodies.circle(200,100,20,ball_options);
	World.add(world,ball)
	Engine.run(engine);
	rectMode(CENTER);
	ellipseMode(RADIUS);
	
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  ground.show();
  top_wall.show();
  left.show();
  right.show();
  ellipse(ball.position.x,ball,position.y,20);
  groundObj.display();
  
  Engine.update(engine);
  drawSprites();
 
}



