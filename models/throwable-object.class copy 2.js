/* The `class ThrowableObject` is extending the `MovableObject` class, which means that it inherits all
the properties and methods of the `MovableObject` class. This allows the `ThrowableObject` class to
use and modify the properties and methods of the `MovableObject` class, while also adding its own
unique properties and methods. */
class ThrowableObject extends MovableObject {

    collectedBottles = 0;

    /**
     * This is a constructor function that sets the position, height, width, and image of a salsa
     * bottle object and throws it.
     * @param x - The x-coordinate of the position where the salsa bottle will be placed on the screen.
     * @param y - The parameter "y" represents the vertical position of the object on the screen or
     * canvas. It determines where the object will be placed along the y-axis.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'); //damit wird von der übergeordneten Methode das load.img aufgerufen
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * The function sets the speed and movement of an object while applying gravity.
     */
    throw() {
        this.speedY = 25; // Wert war 30
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /* this.level.endboss.forEach((endboss) => {
        setInterval(() => {
            if (!world.level.endboss(endboss).isHurtEndboss()) {
                this.playAnimation(this.IMAGES_THROW_BOTTLES);
            } else {
                this.playAnimation(this.IMAGES_SPLASH_BOTTLES);
            }
        }, 1000 / 20);
    })
} */