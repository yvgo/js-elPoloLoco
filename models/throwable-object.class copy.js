/* The `class ThrowableObject` is extending the `MovableObject` class, which means that it inherits all
the properties and methods of the `MovableObject` class. This allows the `ThrowableObject` class to
use and modify the properties and methods of the `MovableObject` class, while also adding its own
unique properties and methods. */
class ThrowableObject extends MovableObject {
    height = 100;
    width = 100;
    speedY = 25;
    speedX = 9;
    bottleHitEndbos = false;

    //collectedBottles = 0;

    IMAGES_SPLASH_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_THROW_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * This is a constructor function that sets the position, height, width, and image of a salsa
     * bottle object and throws it.
     * @param x - The x-coordinate of the position where the salsa bottle will be placed on the screen.
     * @param y - The parameter "y" represents the vertical position of the object on the screen or
     * canvas. It determines where the object will be placed along the y-axis.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_THROW_BOTTLES);
        this.loadImages(this.IMAGES_SPLASH_BOTTLES);
        this.x = x;
        this.y = y;
        /*  this.height = 60;
         this.width = 50;  */
        this.throw();
    }

    /**
     * The function sets the speed and movement of an object while applying gravity.
     */
    throw() {
        //this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
        setInterval(() => {
            if (!this.bottleHitEndbos) {
                this.playAnimation(this.IMAGES_THROW_BOTTLES);
            }
            else {
                this.playAnimation(this.IMAGES_SPLASH_BOTTLES);
            }
        }, 50);
    }

    /* animate() {
        setInterval(() => {
            if (!this.bottleHitEndbos) {
                this.playAnimation(this.IMAGES_THROW_BOTTLES);
            }
            else {
                this.playAnimation(this.IMAGES_SPLASH_BOTTLES);
            }
        }, 50);
    } */
}