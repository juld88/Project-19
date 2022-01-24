var RockGroup, Rock;
var Ball;
var gameState = "PLAY";
var Grass;
var Score;

function preload(){
    RockImage = loadImage("Rock.png");
    BallImage = loadImage("Soccer ball.png");
    GrassImage = loadImage("Grass.png");
}

function setup() {
    createCanvas(400, 400);
    Grass = createSprite(200, 250);
    Grass.addImage("Grass", GrassImage);
    Grass.velocityX = -1;
    Ball = createSprite(50, 250, 10, 10);
    Ball.addImage("Ball", BallImage);
    Ball.scale = 0.3;
    RockGroup =  new Group();
}

function draw() {
    background("white");
    if (gameState === "PLAY") {
        if(keyDown("LEFT")) {
            Ball.x = Ball.x-3;
        }
        if(keyDown("RIGHT")) {
            Ball.x = Ball.x+3;
        }
        if(Grass.x < 150) {
            Grass.x = 300;
        }
        if(Ball.x < 1) {
            Ball.x = Ball.x + 4;
        }
        if(Ball.x > 400) {
            Ball.x = Ball.x - 4;
        }
        new Text("Score: " + Score, 300, 50);
    }

    SpawnRocks();

    if(RockGroup.isTouching(Ball)) {
        Ball.destroy();
        gameState = "END";
    }

    if(gameState === "END") {
        stroke("red");
        Fill("red");
        Text("You Lost!", 150, 200);
    }
    drawSprites();
}

function SpawnRocks() {
    if (frameCount % 240 === 0) {
        Rock = createSprite(200, -50);
        Rock.x = Math.round(random(0,400));
        Rock.addImage("Rock", RockImage)
        Rock.scale = 0.2;
        Rock.velocityY = 1;
        Rock.lifetime = 850;
        RockGroup.add(Rock);
        Score = Score+1;
    }
}