
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	
}

function setup() {
	createCanvas(800, 700);




	engine = Engine.create();
	world = engine.world;

	var prop_retangulo = {
		restitution: 0.01,
		friction: 1,
		frictionAir:0.3
	}

	prop_bola = {
		restitution: 0.5,
		friction: 0.02,
		frictionAir:0
	}

	prop_quadrado = {
		restitution: 0.7,
		friction: 0.01,
		frictionAir:0.1
	}

	//Crie os Corpos Aqui.

	retangulo = Bodies.rectangle(350, 50, 10, 10, prop_retangulo);
	World.add(world, retangulo);

	bola = Bodies.circle(220, 10, 10, prop_bola);
	World.add(world, bola);

	quadrado = Bodies.rectangle(110, 50, 10, 10, prop_quadrado);
	World.add(world, quadrado);

	ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
	World.add(world, ground);
  

	Engine.run(engine);
  
	//var plane_options = {
	//	isStatic = true
	//}
	//World.add(world, plane_options);
  
}


function draw() {
	rectMode(CENTER);
	background("lightgreen");
	
		Engine.update(engine);
	  
  
	  rect(retangulo.position.x, retangulo.position.y, 10, 10)  
	  
	  rect(quadrado.position.x, quadrado.position.y, 10, 10,)  
  
	  rect(bola.position.x, bola.position.y, 10);
  
	  rect(ground.position.x, ground.position.y, width * 2, 1);
 
}



