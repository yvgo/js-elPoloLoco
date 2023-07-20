/* `class Bottles extends MovableObject` is creating a new class called `Bottles` that extends the
`MovableObject` class. This means that the `Bottles` class inherits all the properties and methods
of the `MovableObject` class and can also have its own unique properties and methods. */
class BottlesThrowable extends ThrowableObject {
    height = 75;
    width = 75;
    ground = 350;
    speedY = 25;
    offset = {
        top: 10,
        bottom: 10,
        left: 18,
        right: 14
    };

    IMAGES_THROW_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    IMAGES_SPLASH_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW_BOTTLES);
        this.loadImages(this.IMAGES_SPLASH_BOTTLES);
        this.x = x;
        this.y = y;
        this.throw();
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.endbossAlreadyHit) {
                this.playAnimation(this.IMAGES_THROW_BOTTLES);
            }
            else {
                this.playAnimation(this.IMAGES_SPLASH_BOTTLES);
            }
        }, 50);
    }
}