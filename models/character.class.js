/* The `class Character extends MovableObject` is creating a new class called `Character` that extends
the `MovableObject` class. This means that the `Character` class inherits all the properties and
methods of the `MovableObject` class and can also have its own unique properties and methods. */
class Character extends MovableObject {
    x = 40;
    y = 0;
    width = 125;
    height = 270;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_BREAK = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_SlEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    lastMove = 0;
    offset = {
        top: 100,
        bottom: 0,
        left: 20,
        right: 20,
    };
    

    /**
     * The constructor function loads various images and applies gravity and animation to a character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); //damit wird von der übergeordneten Methode das load.img aufgerufen
        this.loadImages(this.IMAGES_BREAK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SlEEPING);
        this.getCurrentTime();
        this.applyGravity();
        this.isAboveGround();
        this.isFalling();
        this.animate();
    }


    /* The `animate()` method is responsible for animating the character. It runs two `setInterval`
    functions. The first one runs every 16.67 milliseconds and checks if the right or left arrow
    keys are pressed and moves the character accordingly using the `moveRight` and `moveLeft`
    methods. It also checks if the spacebar is pressed and the character is not already in the air,
    and if so, calls the `jump` method to make the character jump. Finally, it updates the camera
    position based on the character's position. The second `setInterval` function runs every 50
    milliseconds and checks the current state of the character (whether it is dead, hurt, jumping,
    taking a break, or walking) and plays the corresponding animation by calling the `playAnimation`
    method with the appropriate image array. If the character is walking, it also checks whether the
    player is pressing the left or right arrow keys and sets the current time by calling the
    `getCurrentTime` method. If the character is hurt, it also pauses the walking sound and sets the
    current time. If the character is dead, it also pauses the walking sound. */
    animate() {

        /* The `setInterval` function is repeatedly executing the code block inside it every 16.67
        milliseconds (1000/60). The code block checks if the right or left arrow keys are pressed
        and moves the character accordingly using the `moveRight` and `moveLeft` methods. It also
        checks if the spacebar is pressed and the character is not already in the air, and if so,
        calls the `jump` method to make the character jump. Finally, it updates the camera position
        based on the character's position. If the walking sound is playing, it pauses it before
        moving and plays it again after moving. */
        
        setInterval(() => {
            walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.getCurrentTime();
                walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                walking_sound.play();
            }
            
            this.world.camera_x = -this.x + 50;
        }, 800 / 60);

        setInterval(() => {
            if (this.world && this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        }, 80);

        /* This `setInterval` function is responsible for animating the character. It runs every 50
        milliseconds and checks the current state of the character (whether it is dead, hurt,
        jumping, taking a break, or walking) and plays the corresponding animation by calling the
        `playAnimation` method with the appropriate image array. If the character is walking, it
        also checks whether the player is pressing the left or right arrow keys and sets the current
        time by calling the `getCurrentTime` method. If the character is hurt, it also pauses the
        walking sound and sets the current time. If the character is dead, it also pauses the
        walking sound. */
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                walking_sound.pause();
            } else if (this.isHurt() && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_HURT);
                walking_sound.pause();
                this.getCurrentTime();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.getCurrentTime();
            } else if (this.hasBreak()) {
                this.playAnimation(this.IMAGES_BREAK);
                this.getCurrentTime();
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.getCurrentTime();
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }
    
    /**
     * The function sets the value of the speedY property to 30.
     */
    jump() {
        this.speedY = 25;
    }

}