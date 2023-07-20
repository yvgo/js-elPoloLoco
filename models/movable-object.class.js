/* The `class MovableObject` is extending the `DrawableObject` class, which means that it inherits all
the properties and methods of the `DrawableObject` class and can also add its own properties and
methods. This allows the `MovableObject` class to have all the functionality of a drawable object,
as well as additional functionality for movement and collision detection. */
class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.0; //Sprunghöhe
    otherDirection = false;
    energy = 100;
    energyEndboss = 100;
    lastHit = 0;
    lastHitEndboss = 10;
    bottleState = 0;
    maxBottle = 100;
    coinState = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    enemyDead = false;
    endbossDead = false;
    lastMove = 0;
    movingRight = true;


    /**
     * The function applies gravity to an object's vertical movement.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1300 / 30);
    }


    /**
     * The function checks if an object is above ground level or not.
     * @returns If the object is an instance of ThrowableObject, the function will return true.
     * Otherwise, it will return whether the object's y-coordinate is less than 165, indicating whether
     * the object is above ground or not.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall down
            return true;
        } else {
            return this.y < 156;
        }
    }

    /**
     * The function checks if the object is falling but still above the ground.
     * @returns The function `isFalling()` returns a boolean value indicating whether the object is
     * currently falling but still above the ground. It returns `true` if the object's `speedY`
     * property is less than 0 (i.e. it is moving downwards) and its `isAboveGround()` method returns
     * `true`. Otherwise, it returns `false`.
     */
    isFalling() { //abfragen, ob ich falle aber noch über dem Grund bin
        return this.speedY < 0 && this.isAboveGround();
    }


    /**
     * The function sets the current time as the value of the "lastMove" property.
     */
    getCurrentTime() {
        this.lastMove = new Date().getTime();
    }


    /**
     * The function checks if two objects are colliding by comparing their positions and dimensions.
     * @param mo - The parameter "mo" is likely an object representing another game element or object
     * that the current object is checking for collision with.
     * @returns The `isColliding` function is returning a boolean value indicating whether or not there
     * is a collision between the object calling the function and the `mo` object passed as an
     * argument.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&    //   right > left =>   Collision in front
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&     //    top > bottom =>   Collision bottom
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&       //     left > right =>   Collision behind
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;       //      bottom > top =>   Collision top   
    }


    /**
     * The "hit" function reduces the energy of a character by 5 and records the time of the hit.
     */
    hit() { 
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); 
        }
    }


    /**
     * The function hitEndboss reduces the energy of the end boss by 30 and updates the last hit time,
     * setting energy to 0 if it falls below 10.
     */
    hitEndboss() {
        this.energyEndboss -= 30;
        if (this.energyEndboss <= 10) {
            this.energyEndboss = 0;
        }
        else {
            this.lastHitEndboss = new Date().getTime(); 
        }
    }


    /**
     * The function checks if a character has been hurt within the last 1.35 seconds.
     * @returns The function `isHurt()` is returning a boolean value indicating whether the time passed
     * since the last hit on the character is less than 1.35 seconds.
     */
    isHurt() { //Character
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        this.timepassed = timepassed;
        return timepassed < 1.35;
    }


    /**
     * The function checks if the time passed since the last hit on the Endboss is less than 1.35
     * seconds.
     * @returns The function `isHurtEndboss()` is returning a boolean value indicating whether the time
     * passed since the last hit on the Endboss is less than 1.35 seconds.
     */
    isHurtEndboss() { //Endboss
        let timepassed = new Date().getTime() - this.lastHitEndboss; 
        timepassed = timepassed / 1000; 
        this.timepassed = timepassed;
        return timepassed < 1.35;
    }


    /**
     * The function checks if a character is dead by returning true if their energy is 0.
     * @returns This function is returning a boolean value (true or false) depending on whether the
     * energy of the character is equal to 0 or not. If the energy is 0, then the function returns
     * true, indicating that the character is dead. Otherwise, it returns false, indicating that the
     * character is still alive.
     */
    isDead() { //Character
        return this.energy == 0; 
    }


    /**
     * The function checks if the energy of the Endboss is zero and returns a boolean value
     * accordingly.
     * @returns This function is returning a boolean value of true or false. It will return true if the
     * energyEndboss is equal to 0, indicating that the endboss is dead, and false if the energyEndboss
     * is greater than 0, indicating that the endboss is still alive.
     */
    isDeadEndboss() { //Endboss
        return this.energyEndboss == 0; 
    }


    /**
     * The function checks if more than 1.5 seconds have passed since the last move.
     * @returns The function `hasBreak()` is returning a boolean value. It returns `true` if the time
     * passed since the last move is greater than 1.5 seconds, and `false` otherwise.
     */
    hasBreak() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 0.35;
    }


    /**
     * The function checks if the time passed since the last move is greater than 3 seconds and returns
     * a boolean value indicating if the object is sleeping.
     * @returns The function `isSleeping()` is returning a boolean value. It returns `true` if the time
     * passed since the last move is greater than 3 seconds, indicating that the object is sleeping,
     * and `false` otherwise.
     */
    isSleeping() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000;
        return timePassed > 3;
    }


    /**
     * The function increases the bottle state by 10 and sets it to a maximum of 100.
     */
    bottleCounter() {
        this.bottleState += 10;
        if (this.bottleState > 100) {
            this.bottleState = 100;
        }
    }


    /**
     * The function adds 10 to a coin state variable and caps it at 100.
     */
    coinCounter() {
        this.coinState += 10;
        if (this.coinState > 100) {
            this.coinState = 100;
        }
    }


    /**
     * The function plays a walk animation by cycling through a given array of images and updating the
     * object's image variable.
     * @param images - an array of file paths to the images that will be used for the animation.
     */
    playAnimation(images) { // walk animation
        let i = this.currentImage % images.length; // let i = 0 % 6; i = 0, 1, 2, 3, 4, 5, 6, 0  //Modulo fängt wieder von vorne an zu zählen.
        let path = images[i]; //path = Pfade aus Array, beginnend bei currentImage = 0
        this.img = this.imageCache[path]; //img ist die Variable, die aus der Klasse moveableObject. In dieser Zeile wird gesagt, dass das Bild aus dem JSON imageCache[path] der Variable img entsprechen soll
        this.currentImage++; //Bild wird um 1 erhöht
    }


    /**
     * The function moves an object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
        this.movingRight = true;

    }


    /**
     * The function moves an object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
        this.movingRight = false;
    }

    
    /**
     * The function "jump()" sets the vertical speed to 30, defining the height of a jump.
     */
    jump() {
        this.speedY = 20; //definiert die Sprunghöhe
    }

}