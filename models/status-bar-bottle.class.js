/* The `class StatusBarBottles` is creating a new class that extends the `DrawableObject` class. This
means that the `StatusBarBottles` class inherits all the properties and methods of the
`DrawableObject` class and can also have its own unique properties and methods. */
class StatusBarBottles extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;

    /**
     * The constructor initializes properties and loads images for an object.
     */
    constructor() {
        super(); // um Methoden vom übergeordneten Objekt zu initialisieren
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }


    /**
     * This function sets the percentage value and updates the image displayed based on the new
     * percentage.
     * @param percentage - The `percentage` parameter is a number between 0 and 5 that represents the
     * percentage of a bottle that is filled. This function sets the `percentage` property of an object
     * and updates the `img` property based on the new percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndexBottles()];
        this.img = this.imageCache[path];
    }


    /**
     * This function returns an index number based on the percentage value to determine the number of
     * bottles to display.
     * @returns The function `resolveImageIndexBottles()` returns a number between 0 and 5 based on the
     * value of the `percentage` property of the object calling the function.
     */
    resolveImageIndexBottles() {
        if (this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}