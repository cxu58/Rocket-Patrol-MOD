class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('bird','./assets/bird.png');//改
        this.load.image('star','./assets/star.png');//改
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize, game.config.width, borderUISize * 1.5, 0x00FF00).setOrigin(0, 0);//计分板
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize,0xFFFF00).setOrigin(0 ,0);//上边
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFF00).setOrigin(0 ,0);//下边
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFF00).setOrigin(0 ,0);//左边
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFF00).setOrigin(0 ,0);//右边

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add star (p2)
        this.p2Rocket = new star(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'star').setOrigin(0, 0);
        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*4, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*8, 'spaceship', 0, 10).setOrigin(0,0);

        // add new Spaceships(x3)改
        this.bird01 = new bird(this, game.config.width + borderUISize*4, borderUISize*3 + borderPadding*3, 'bird', 0, 60).setOrigin(0, 0);
        this.bird02 = new bird(this, game.config.width + borderUISize*5.5, borderUISize*5 + borderPadding*5, 'bird', 0, 50).setOrigin(0,0);
        this.bird03 = new bird(this, game.config.width, borderUISize*7 + borderPadding*7, 'bird', 0, 40).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyj = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding*0.5, borderUISize + borderPadding*0.5, this.p1Score, scoreConfig);//上对齐
        this.scoreRight = this.add.text(borderUISize*15.5 + borderPadding*0.7, borderUISize + borderPadding*0.5, this.p2Score, scoreConfig);//下对齐
        this.timerLeft = this.add.text(borderUISize*8 + borderPadding*0.5, borderUISize + borderPadding*0.5, this.timerLeft, scoreConfig);
        this.gameOver = false;

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p2Rocket.update();
             this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.bird01.update();//改
            this.bird02.update();//改
            this.bird03.update();//改
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.P1Explode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.P1Explode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.P1Explode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.bird03)) {
            this.p1Rocket.reset();
            this.P1Explode(this.bird03);
        }
        if(this.checkCollision(this.p1Rocket, this.bird02)) {
            this.p1Rocket.reset();
            this.P1Explode(this.bird02);
        }
        if(this.checkCollision(this.p1Rocket, this.bird01)) {
            this.p1Rocket.reset();
            this.P1Explode(this.bird01);
        }
        

        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.P2Explode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.P2Explode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.P2Explode(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.bird03)) {
            this.p2Rocket.reset();
            this.P2Explode(this.bird03);
        }
        if(this.checkCollision(this.p2Rocket, this.bird02)) {
            this.p2Rocket.reset();
            this.P2Explode(this.bird02);
        }
        if(this.checkCollision(this.p2Rocket, this.bird01)) {
            this.p2Rocket.reset();
            this.P2Explode(this.bird01);
        }
        this.timerLeft.text= (game.settings.gameTimer - this.clock.elapsed)/1000;
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    P1Explode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.clock.elapsed -= 5000;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('sfx_explosion');
      }
    P2Explode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.clock.elapsed -= 5000;
        this.scoreRight.text = this.p2Score; 
        this.sound.play('sfx_explosion');
      }
      
}