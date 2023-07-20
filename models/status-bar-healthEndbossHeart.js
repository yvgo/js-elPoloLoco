/* The `class StatusBarHealthEndbossHeart` is creating a new class that extends the `DrawableObject`
class. This means that the `StatusBarHealthEndbossHeart` class inherits all the properties and
methods of the `DrawableObject` class and can also have its own unique properties and methods. */
class StatusBarHealthEndbossHeart extends DrawableObject {

    x = 466;
    y = 5;
    width = 60;
    height = 60;
    percentage = 100;
    IMAGES_HEART = ['img/7_statusbars/3_icons/icon_health_endboss.png'];

    /**
     * This is not a valid JavaScript function as it is missing the function declaration and the
     * context in which it is being used.
     */
    constructor() {
        super().loadImage(this.IMAGES_HEART);
    }
}