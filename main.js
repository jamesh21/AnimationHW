var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

// function MushroomDude(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
//     this.x = 0;
//     this.y = 0;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }
//
// MushroomDude.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }
//
// MushroomDude.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//         this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
// }
//
//
// // inheritance
// function Cheetah(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
//     this.speed = 350;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 250);
// }
//
// Cheetah.prototype = new Entity();
// Cheetah.prototype.constructor = Cheetah;
//
// Cheetah.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }
//
// Cheetah.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }
//
// // inheritance
// function Guy(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 154, 215, 4, 0.15, 8, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
// }
//
// Guy.prototype = new Entity();
// Guy.prototype.constructor = Guy;
//
// Guy.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }
//
// Guy.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

// // inheritance
// function Mario(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 39, 32, 5, 0.10, 5, true, 2.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
// }
//
// Mario.prototype = new Entity();
// Mario.prototype.constructor = Mario;
//
// Mario.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }
//
// Mario.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

// inheritance
function Megaman(game, spritesheet, jumpSpritesheet, fallingSpritesheet, swordSpritesheet, entranceSpritesheet, beamEntranceSpritesheet) {
    this.animation = new Animation(spritesheet, 36, 36, 11, 0.08, 11, true, 2.5);
    this.jumpAnimation = new Animation(jumpSpritesheet, 32, 49, 3, 0.18, 3, false, 2.5);
    this.fallingAnimation = new Animation(fallingSpritesheet, 32, 49, 4, 0.18, 4, true, 2.5);
    this.swordAnimation = new Animation(swordSpritesheet, 69, 58, 11, 0.05 ,11, false, 2.5);
    this.entranceAnimation = new Animation (entranceSpritesheet, 35, 45, 9, 0.18, 9, false, 2.5);
    this.beamAnimation = new Animation (beamEntranceSpritesheet, 13, 50, 1, 0.18, 1, true, 2.5);
    this.speed = 200;
    this.ctx = game.ctx;
    this.jumping = false;
    this.falling = false;
    this.attacking = false;
    this.entrance = false;
    this.beamEntrance = true;
    this.jumpHeight = 200;
    Entity.call(this, game, 0, 0);
}

Megaman.prototype = new Entity();
Megaman.prototype.constructor = Megaman;

Megaman.prototype.update = function () {
    //console.log(this.y);
    if (this.beamEntrance) {
       this.y += this.game.clockTick * this.speed + 5;
       if (this.y > 200) {
           this.beamEntrance = false;
           this.entrance = true;
       }
    }
    if (!this.attacking && !this.entrance && !this.beamEntrance) {
        console.log(1);
        this.x += this.game.clockTick * this.speed;
    }
    if (this.x > 910) {
        this.x = -230;
    }
    if (this.x > 200 && this.x < 210) {
        console.log(2);
        this.jumping = true;
        this.base = this.y;
    }
    if (this.x > 600 && this.x < 610) {
        //Entity.call(this, this.game, this.x, this.y);
        console.log("EREEEE");
        this.attacking = true;
    }
    if (this.jumping) {
        console.log(3);
        var height;
        var duration = this.jumpAnimation.elapsedTime + this.game.clockTick;
        if (duration > this.jumpAnimation.totalTime / 2) duration = this.jumpAnimation.totalTime - duration;
        duration = duration / this.jumpAnimation.totalTime;

        height = (2 * duration - 2 * duration * duration) * this.jumpHeight;
        this.y = this.base - height;
    }
    if (this.falling) {
        console.log(4);
        this.y += this.game.clockTick / this.jumpAnimation.totalTime * 2 * this.jumpHeight;
    }
    Entity.prototype.update.call(this);
}

Megaman.prototype.draw = function () {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, this.ctx, this.x + 25, this.y - 25);
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
            this.falling = true;
        }
    } else if (this.beamEntrance) {
        this.beamAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);

    } else if (this.falling) {
        this.fallingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x + 25, this.y - 25);
        if (this.y >= 200) {
            this.falling = false;
        }

    } else if (this.attacking) {
        this.y = 155;
        this.swordAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.swordAnimation.isDone()) {
            this.swordAnimation.elapsedTime = 0;
            this.attacking = false;
            this.y = 200;
        }
    } else if(this.entrance) {
        this.y = 175;
        this.entranceAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.entranceAnimation.isDone()) {
            this.entranceAnimation.elapsedTime = 0;
            this.entrance = false;
            this.y = 200;
        }
    } else if (!this.falling && !this.jumping) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}

// AM.queueDownload("./img/RobotUnicorn.png");
// AM.queueDownload("./img/guy.jpg");
// AM.queueDownload("./img/mushroomdude.png");
// AM.queueDownload("./img/runningcat.png");
// AM.queueDownload("./img/MarioWalking.png");
AM.queueDownload("./img/MegamanBackground.jpg");
AM.queueDownload("./img/MegaEntrance0.png");
AM.queueDownload("./img/MegamanEntrance.png");
AM.queueDownload("./img/MegamanRunning.png");
AM.queueDownload("./img/MegamanJumping.png");
AM.queueDownload("./img/MegamanFalling.png");
AM.queueDownload("./img/MegamanSword.png");
//AM.queueDownload("./img/background.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/MegamanBackground.jpg")));
    gameEngine.addEntity(new Megaman(gameEngine, AM.getAsset("./img/MegamanRunning.png"),
        AM.getAsset("./img/MegamanJumping.png"), AM.getAsset("./img/MegamanFalling.png"),
        AM.getAsset("./img/MegamanSword.png"), AM.getAsset("./img/MegamanEntrance.png"), AM.getAsset("./img/MegaEntrance0.png")));
    console.log("All Done!");
});