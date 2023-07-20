/* The `class StatusBarCoins` is creating a new class that extends the `DrawableObject` class. This
means that the `StatusBarCoins` class inherits all the properties and methods of the
`DrawableObject` class and can also have its own unique properties and methods. */
class StatusBarCoins extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    /**
     * The constructor initializes properties and loads images for an object.
     */
    constructor() {
        super(); // um Methoden vom übergeordneten Objekt zu initialisieren
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }


    /**
     * This function sets the percentage value and updates the image displayed based on the new
     * percentage.
     * @param percentage - The `percentage` parameter is a number that represents the percentage of
     * completion or progress of a task or process. It is used in the `setPercentage` method to update
     * the `percentage` property of an object and to determine which image to display based on the
     * current percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];
    }


    /**
     * This function returns an image index based on a percentage value.
     * @returns The function `resolveImageIndexCoins()` returns an integer value between 0 and 5 based
     * on the value of the `percentage` property of the object calling the function. The value returned
     * corresponds to the index of an image to be displayed, where a higher percentage value
     * corresponds to a higher index value.
     */
    resolveImageIndexCoins() {
        if (this.percentage == 60) {
            return 5;
        } else if(this.percentage > 40) {
            return 4;
        } else if(this.percentage > 30) {
            return 3;
        } else if(this.percentage > 20) {
            return 2;
        } else if(this.percentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }

}