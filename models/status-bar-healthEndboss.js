/* The `class StatusBarHealthEndboss` is creating a new class that extends the `DrawableObject` class.
This means that the `StatusBarHealthEndboss` class inherits all the properties and methods of the
`DrawableObject` class and can also have its own unique properties and methods. */
class StatusBarHealthEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    ];

    percentage = 100;

    /**
     * The constructor initializes properties and loads images for a status bar with a default
     * percentage of 100.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'); 
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * The function sets the percentage and updates the image cache.
     * @param percentage - The percentage parameter is a number that represents the percentage of
     * completion or progress of a task or process. It is used in the context of a progress bar or
     * similar visual representation of progress. The setPercentage method sets the percentage value
     * and updates the image displayed based on the new percentage value.
     */
    setPercentage (percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * The function returns an index based on the percentage value.
     * @returns The function `resolveImageIndex()` returns an integer value that corresponds to an
     * image index based on the percentage value of the object calling the function. If the percentage
     * is 100, it returns 0. If the percentage is 70, it returns 1. If the percentage is 40, it returns
     * 2. For any other percentage value, it returns 3.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if(this.percentage == 70) {
            return 1;
        } else if(this.percentage == 40) {
            return 2;
        } else {
            return 3;
        }
    }

}