var backImage,backgr;
var monkey , monkeyrunning
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
 var survivaltime=0;
 
 var PLAY = 1;
var END = 0;
var gameState=PLAY;

function preload(){
 backImage=loadImage("jungle.jpg");
  monkeyrunning =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
   }

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgr=createSprite(0,0,windowWidth-20,windowHeight-30);
  backgr.addImage(backImage);
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4
  
  //creating monkey
   monkey=createSprite(70,windowHeight-70,20,20);
   monkey.addAnimation("walking", monkeyrunning);
  // monkey.addImage(bananaImage)
   monkey.scale=0.2
  
  ground = createSprite(width/2,height-10,width,125);
  ground.velocityX=-5;
  ground.visible=false
  foodGroup = new Group(); 
  obstaclesGroup = new Group();
  gameState=PLAY

  score = 0;
 
  
}


function draw() {
  background("white");
  
  if (gameState===PLAY){ 
  if(ground.x<350) {
    ground.x=ground.width/2;
  }
  if(backgr.x<250){
    backgr.x=backgr.width/2;
  }

  if(keyDown("space") ) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.5;
   monkey.collide(ground); 

   camera.position.x=monkey.x
  
   if(foodGroup.isTouching(monkey)){
    score=score+1
    foodGroup.destroyEach()
  }
  text("Survival time: "+ survivaltime, 100,50);
  stroke("white");
  textSize(20);
  fill("white");
  survivaltime=Math.ceil(frameCount/frameRate()) 
  
  text("Score: "+ score, 500,50); 

  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
}
  switch(score){
        case 10: monkey.scale=0.25;
                break;
        case 20: monkey.scale=0.27;
                break;
        case 30: monkey.scale=0.28;
                break;
        case 40: monkey.scale=0.3;
                break;
        default: break;
    }
   
  spawnBanana();
  spawnObstacles();
  

 
}

else if (gameState === END) {
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  monkey.velocityY = 0;
  backgr.velocityX=0;
  monkey.visible=false
  obstaclesGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  text("GAME OVER",100,500);
  stroke("white");
  textSize(30);

}
drawSprites();
}
  

function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 50 === 0) {
    banana = createSprite(600,height-50,40,10);
    banana.y = random(Math.round(450,550));    
    banana.velocityX = -6;
   banana.addImage(bananaImage);
     banana.scale=0.15;
    banana.lifetime = 1000;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 210 === 0) {
    obstacle = createSprite(800,height-50,10,10);
    obstacle.velocityX = -7;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function end(){
  console.log("game over")
}
