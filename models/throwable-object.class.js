/* The `class ThrowableObject` is extending the `MovableObject` class, which means that it inherits all
the properties and methods of the `MovableObject` class. This allows the `ThrowableObject` class to
use and modify the properties and methods of the `MovableObject` class, while also adding its own
unique properties and methods. */
class ThrowableObject extends MovableObject {

    IMAGES_SPLASH_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    IMAGES_THROW_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 18,
        right: 14
    };

    bottleHitEndbos = false;

    /**
     * This is a constructor function that sets the position, height, width, and image of a salsa
     * bottle object and throws it.
     * @param x - The x-coordinate of the position where the salsa bottle will be placed on the screen.
     * @param y - The parameter "y" represents the vertical position of the object on the screen or
     * canvas. It determines where the object will be placed along the y-axis.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW_BOTTLES);
        this.loadImages(this.IMAGES_SPLASH_BOTTLES);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 90;
        this.throw();
        this.animate();
    }

  
    /**
     * The function throws a bottle and applies gravity to it until it hits the end of the screen, then
     * it stops the bottle's movement.
     */
    throw() {
        if (!this.bottleHitEndbos) {
            this.speedY = 25; // Wert war 30
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
        } else if (this.bottleHitEndbos) {
            this.speedY = 0;
            setInterval(() => {
                this.x -= 10;
            }, 450);
        }
    }


    /**
     * The function animates the throwing and splashing of bottles based on whether or not they hit the
     * endbos.
     */
    animate() {
        setInterval(() => {
            if (!this.bottleHitEndbos) {
                this.playAnimation(this.IMAGES_THROW_BOTTLES);
            }
            else if (this.bottleHitEndbos) {
                this.playAnimation(this.IMAGES_SPLASH_BOTTLES);
            }
        }, 150);
    }
}