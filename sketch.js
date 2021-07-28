var gameState = "play";
var tower;
var towerImage;
var climber, climberImg, climberGroup
var ghost, ghostImg
var invisibleBlock, invisibleBlockGroup

var door, doorImg, doorsGroup
function preload(){
    towerImage = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
}

function setup(){
    createCanvas(600, 600);
    tower = createSprite(300, 300, 50, 50);
    tower.addImage("tower", towerImage);
    tower.velocityY = 1;
    doorsGroup = new Group();
    climberGroup = new Group();
    ghost = createSprite(200, 200, 10, 10);
    ghost.addImage("ghost", ghostImg);
    ghost.scale = 0.3;
    invisibleBlockGroup = new Group();
}

function draw() {
  background("white")

    if(gameState === "play"){

    
    if(tower.y > 400){
        tower.y = 300;
    }

    if (keyDown("space")){
        ghost.velocityY = -4;
        
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (keyDown("left")){
        ghost.x = ghost.x -3;
    }

    if(keyDown("right")){
        ghost.x = ghost.x +3;
    }

    if(climberGroup.isTouching(ghost)){
        ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y> 600){
        ghost.destroy();
        gameState = "end";
    }
    doors();
}
    else if (gameState === "end"){
        textSize(30);
        fill("yellow");
        text("Game Over", 230, 250);
    }
    drawSprites();
}
function doors(){
    if(frameCount % 250 === 0){
        var door = createSprite( 150, -50, 10, 10);
        door.addImage("door", doorImg);
        door.x = Math.round(random(120, 400)); 
        door.velocityY = 1;
        door.lifeTime = 800;
        doorsGroup.add(door);

        var climber = createSprite(200, 10, 10, 10);
        climber.addImage("climber", climberImg);
        climber.x = door.x;
        climber.velocityY = 1;
        climber.lifeTime = 800;
        climberGroup.add(climber);

        var invisibleBlock = createSprite(200, 15, 10, 10)
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;
        invisibleBlock.x = door.x;
        invisibleBlock.velocityY = 1;
        invisibleBlock.debug = true;
        invisibleBlockGroup.add(invisibleBlock);
        
        ghost.depth = door.depth;
        ghost.depth = ghost.depth +1;
    }

}
