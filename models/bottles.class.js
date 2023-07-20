/* `class Bottles extends MovableObject` is creating a new class called `Bottles` that extends the
`MovableObject` class. This means that the `Bottles` class inherits all the properties and methods
of the `MovableObject` class and can also have its own unique properties and methods. */
class Bottles extends MovableObject {
    y = 350;
    height = 80;
    width = 70;
    offset = {
        top: 10,
        bottom: 10,
        left: 18,
        right: 14
    };

    /**
     * This is a constructor function that loads an image and sets the x position.
     * @param imagePath - The imagePath parameter is a string that represents the file path or URL of
     * an image that will be loaded by the loadImage() method.
     * @param x - The x parameter is a number representing the horizontal position of the object on the
     * screen or canvas.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }

}