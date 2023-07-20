/* `class Endboss extends MovableObject` is creating a new class called `Endboss` that extends the
`MovableObject` class. This means that the `Endboss` class inherits all the properties and methods
of the `MovableObject` class, and can also have its own unique properties and methods. */
class Endboss extends MovableObject {
    y = 175;
    height = 265;
    width = 225;
    speed = 0.5;
    energyEndboss = 100;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    world;
    hadContact = false;
    isAlreadyRunning = false;


    /**
     * The constructor function loads images and sets initial values for the x position and speed of an
     * object, and then calls the animate function.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2600;
        this.animate();
    }


    /* The `animate()` function is responsible for animating the Endboss character. It sets an interval
    that runs every 150 milliseconds and checks the current state of the Endboss. If the Endboss is
    dead, it sets two more intervals to play the dead animation and apply a gravity effect to the
    character, and then calls the `gameWon()` function after a certain amount of time. If the
    Endboss is hurt, it calls the `animationIsHurt()` function to play a hurt animation and move the
    character left. If the Endboss is not dead or hurt and the character's x position is greater
    than 2100, it plays an alert animation for a maximum of 30 times. The `i` variable is used to
    keep track of how many times the alert animation has been played. */
    animate() {
        let i = 0;
        setInterval(() => {
            if (this.isDeadEndboss()) {
                this.animationIsDead();
                this.animationWon();
            } else if (this.isHurtEndboss() && !this.isDeadEndboss()) {
                this.animationIsHurt();
            } else if (world && world.character.x > 2100 && !this.isHurtEndboss() && !this.isDeadEndboss()) {
                if (i < 30) {
                    this.playAnimation(this.IMAGES_ALERT);
                    i++;
                }
            }
        }, 150);
    };


    /**
     * The function animates a hurt Endboss character by repeatedly playing a hurt animation and a
     * walking animation while moving left.
     */
    animationIsHurt() {
        let i = 0;
        if (!this.isDeadEndboss()) {
            if (i < 6) {
                this.playAnimation(this.IMAGES_HURT);
                i++;
            }
            i = 0;
            
            if (!this.isAlreadyRunning) {
                this.isAlreadyRunning = true;                
                setInterval(() => {
                    if (this.isAlreadyRunning && !this.isDeadEndboss()) {
                        this.moveLeft();
                    }
                }, 10);
                setInterval(() => {
                    if (this.isAlreadyRunning && !this.isDeadEndboss()) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }, 200);
  
            }
            /* if (!this.hadContact) {
                this.hadContact = true;
                setInterval(() => {
                    if (this.hadContact && !this.isDeadEndboss()) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }, 200);
            } */

        }
    }


    /**
     * The function animates a dead character and sets its gravity at regular intervals.
     */
    animationIsDead() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 500);
        setInterval(() => {
            this.setGravity();
        }, 1750);
    }


    /**
     * The function "animationWon" sets a timeout of 2300 milliseconds and then calls the "gameWon"
     * function of the "world" object.
     */
    animationWon() {
        setTimeout(() => {
            world.gameWon();
        }, 2300);
    }


    /**
     * This function sets a gravity effect on an object by decreasing its vertical position and speed
     * over time.
     */
    setGravity() {
        setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 30);
    }
}