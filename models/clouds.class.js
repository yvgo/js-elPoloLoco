/* `class Cloud extends MovableObject` is creating a new class called `Cloud` that extends the
`MovableObject` class. This means that the `Cloud` class inherits all the properties and methods of
the `MovableObject` class and can also have its own unique properties and methods. */
class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 250;
    speed = 0.85;

    
    /**
     * This is a constructor function that loads an image, sets its x position, speed, and initiates
     * animation.
     * @param imagePath - The file path or URL of the image that will be loaded for this object.
     * @param x - The x parameter is the initial x-coordinate of the object being constructed.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath, x);
        this.x = x;
        this.speed = 0.25 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * The function animates an object by repeatedly calling the moveLeft() method at a set interval.
     */
    animate(){
        setInterval(() => {
            this.moveLeft();
          }, 9000 / 60);
    }

}
