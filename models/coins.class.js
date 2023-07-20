/* `class Coin extends MovableObject` is creating a new class called `Coin` that extends the
`MovableObject` class. This means that the `Coin` class inherits all the properties and methods of
the `MovableObject` class and can also have its own unique properties and methods. */
class Coin extends MovableObject {
    y = 215;
    height = 120;
    width = 120;

    COINS_CHANGE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    /**
     * This function initializes a coin object with a random position and animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COINS_CHANGE);
        this.x = 400 + Math.random() * 1800; // Zufallswert zw. 200 - 700
        this.y = 85 + Math.random() * 35; // Zufallswert zw. 200 - 700
        this.animate();
    }


    /**
     * The function repeatedly plays a coin change animation at a set interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.COINS_CHANGE);
        }, 350);
    }

}




