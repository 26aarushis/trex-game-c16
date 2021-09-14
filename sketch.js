var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds, cloudsImage;
var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var ran;
var score;
var obstaclesGroup;
var cloudsGroup;
var gameOver, gameOverImg;
var restart, restartImg;
var checkpointSound;
var dieSound;
var jumpSound;

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudsImage = loadImage("cloud.png");
    obstacleImage1 = loadImage("obstacle1.png");
    obstacleImage2 = loadImage("obstacle2.png");
    obstacleImage3 = loadImage("obstacle3.png");
    obstacleImage4 = loadImage("obstacle4.png");
    obstacleImage5 = loadImage("obstacle5.png");
    obstacleImage6 = loadImage("obstacle6.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
    checkpointSound = loadSound("checkpoint.mp3");
    dieSound = loadSound("die.mp3");
    jumpSound = loadSound("jump.mp3");
}

function setup() {
    createCanvas(600, 200);

    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collide", trex_collided);
    trex.scale = 0.5;
    
    //create a ground sprite
    ground = createSprite(300,180,600,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
   
    invisibleGround = createSprite(300,190,600,10);
    invisibleGround.visible = false;

    gameOver = createSprite(300,85);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    restart = createSprite(300,120);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible = false;

    score = 0;
   
    obstaclesGroup = new Group();
    cloudsGroup = new Group();

    trex.setCollider("rectangle",0,0,400,trex.height);
  //  trex.debug = true;
   // var ran = Math.round(random(10,100));
  //  console.log(ran);
   
}

function draw() {
    background(180);
    //console.log(gameState)
    if(gameState === PLAY){
        ground.velocityX = -(4+score/100);
   
    //jump when the space button is pressed
        
        if(score>0 && score%100 == 0) {
            checkpointSound.play();
             
        }

        if (keyDown("space") && trex.y >= 160)   {
            trex.velocityY = -13;
            jumpSound.play();
        }

        trex.velocityY = trex.velocityY + 0.8

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }

        score = score + (Math.round(frameCount/60)); 

        if(trex.isTouching(obstaclesGroup)){
           trex.velocityY = -12;
           jumpSound.play();
            // gameState = END;
           // dieSound.play();
        }
        
        spawnClouds();
        spawnObstacles();
    }
    else if(gameState === END){
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        trex.changeAnimation("collide", trex_collided);
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        
        trex.velocityY = 0;
        gameOver.visible = true;
        restart.visible = true;
    }
    //console.log(trex.y);

    trex.collide(invisibleGround);
    
    text ("Score: "+score, 500,50);

    drawSprites();
}

function spawnClouds(){
    if(frameCount%(Math.round(random(50,80))) === 0){
        clouds = createSprite(610,50,10,10);
        clouds.lifetime = 200
        clouds.addImage(cloudsImage);
        clouds.scale = random(0.09,0.3);
        clouds.velocityX = -3;
        clouds.y = Math.round(random(10,70));
        clouds.depth = trex.depth;
        trex.depth = trex.depth +1
        console.log(trex.depth);
        
        console.log(clouds.depth);
        cloudsGroup.add(clouds);
    }
}

function spawnObstacles(){
    if(frameCount%60 === 0){
        obstacle = createSprite(610,165,10,40);
        obstacle.velocityX = -(3+score/100);
        obstacle.lifetime = 200;
        obstacle.addImage(obstacleImage1);
        obstacle.scale = random(0.09,0.1);
       
        ran  = Math.round(random(1,6));
        switch(ran){
            case 1: obstacle.addImage(obstacleImage1);
                  
                    break;
            case 2: obstacle.addImage(obstacleImage2);
                   break;
            case 3: obstacle.addImage(obstacleImage3);
                   break;
            case 4: obstacle.addImage(obstacleImage4);
                   break;
            case 5: obstacle.addImage(obstacleImage5);
                   break;
            case 6: obstacle.addImage(obstacleImage6);
                   break;
            default:  

        
        }
        
        obstaclesGroup.add(obstacle);
        /*if(ran === 1) {
            obstacle.addImage(obstacleImage1);
        }
        else if(ran === 2) */
      
    }
}