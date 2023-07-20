/* The `class DrawableObject` is defining a blueprint for objects that can be drawn on a canvas. It
includes properties such as `x`, `y`, `height`, `width`, `img`, `imageCache`, and `currentImage`, as
well as methods such as `loadImage`, `draw`, `drawFrame`, and `loadImages`. These properties and
methods can be inherited by other classes that extend `DrawableObject`, allowing them to be drawn on
a canvas and manipulated in various ways. */
class DrawableObject {
    x = 120;
    y = 200;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * The function loads an image from a given path.
     * @param path - The path parameter is a string that represents the URL or file path of the image
     * that needs to be loaded. It is used as an argument for the loadImage method to set the source
     * (src) property of the Image object.
     */
    loadImage(path) { // loadImage Methode
        this.img = new Image(); // Image existiert bereits in JS; entspricht this.img = document ...
        this.img.src = path;
    }


    /**
     * This function draws an image on a canvas context at a specified position and size.
     * @param ctx - ctx stands for "context" and refers to the canvas context on which the image is
     * being drawn. It is usually obtained by calling the getContext() method on a canvas element. The
     * context provides methods and properties for drawing and manipulating graphics on the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Image could not loaded', error);
            console.log(this.img.src);
        }
    }


    /**
     * This function draws a frame around certain objects in a canvas context.
     * @param ctx - ctx stands for "context" and refers to the canvas context on which the frame is
     * being drawn. It is an object that provides methods and properties for drawing on the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof ChickenYellow ||
            this instanceof Bottles ||
            this instanceof ThrowableObject ||
            this instanceof Endboss) {
            // outline
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            //ctx.stroke();
            // inner line
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - 2 * this.offset.right,
                this.height - (this.offset.bottom + this.offset.top)
            );
            //ctx.stroke();
        }
    }


    /**
     * The function loads images from an array and caches them in an object.
     * @param arr - an array of strings representing the file paths of images to be loaded into the
     * image cache.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}