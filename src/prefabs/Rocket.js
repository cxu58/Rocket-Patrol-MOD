// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.pointer = game.input.activePointer;//
    }
//this.x >= borderUISize + this.width
    update() {
        //left/right movement
       
       if(!this.isFiring) {
           this.x = this.pointer.worldX;
        }
        if( this.x >= game.config.width - borderUISize - this.width) {
            this.x = game.config.width - borderUISize - this.width;      
        }else if(this.x <= borderUISize + this.width){
            this.x = borderUISize + this.width;
        }
        // fire button
        if(this.pointer.leftButtonDown() && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
