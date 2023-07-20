
/* This code is defining a class called `Ground` that extends the `MovableObject` class. This means
that the `Ground` class inherits all the properties and methods of the `MovableObject` class and can
also have its own unique properties and methods. */
class Ground extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x; 
        this.y = 480 - this.height;
    }

}
