/* The `class StatusBarHealth` is creating a new class that extends the `DrawableObject` class. This
means that the `StatusBarHealth` class inherits all the properties and methods of the
`DrawableObject` class and can also have its own unique properties and methods. */
class StatusBarHealth extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    /**
     * The constructor initializes properties and loads images for an object.
     */
    constructor() {
        super(); // um Methoden vom übergeordneten Objekt zu initialisieren
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }


    /**
     * This function sets the percentage property of an object and updates its image accordingly.
     * @param percentage - The `percentage` parameter is a number that represents the percentage of
     * completion or progress of a task or process. It is used in the `setPercentage` method to update
     * the `percentage` property of an object and to determine which image to display based on the
     * current progress.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * The function returns an image index based on a percentage value.
     * @returns The function `resolveImageIndex()` returns a number between 0 and 5 based on the value
     * of the `percentage` property of the object calling the function. If the `percentage` is 100, it
     * returns 5. If the `percentage` is greater than 80, it returns 4. If the `percentage` is greater
     * than 60, it returns 3. If
     */
    resolveImageIndex() {
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