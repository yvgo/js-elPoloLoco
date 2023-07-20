/* The above code is defining a class called "World" in JavaScript using the class syntax. */
class World {
    character = new Character();
    //bottlesThrowable = new ThrowableObject();
    level = level1;
    ctx; // context kommt von JS
    canvas;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarHealthEndboss();
    statusBarEndbossHeart = new StatusBarHealthEndbossHeart();
    throwableObjects = [];
    collectedBottles = [];
    enemyDead = false;
    endbossDead = false;
    endbossAlreadyHit = false;
    characterAlreadyHit = false;

    /**
     * This is a constructor function that initializes properties and methods for a game canvas and
     * keyboard input.
     * @param canvas - The canvas parameter is a reference to the HTML canvas element that the game
     * will be drawn on. The getContext('2d') method is used to get the 2D rendering context of the
     * canvas, which is used to draw graphics on the canvas.
     * @param keyboard - The `keyboard` parameter is likely an object or instance that allows the user
     * to interact with the game or application using their keyboard. It could contain methods or
     * properties that detect which keys are being pressed, released, or held down, and trigger
     * corresponding actions in the game or application.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * The setWorld function assigns all world variables to the Character class.
     */
    setWorld() { //In dieser Funktion werden alle Variablen der Welt an die Klasse Character übergeben.
        this.character.world = this;
    }


    /**
     * The function runs multiple setInterval functions to check for collisions and game events at
     * different intervals.
     */
    run() {
        setInterval(() => {
            this.checkCollisions(); // kontrolliert regelmäßig ob 2 Elemente kollidieren
            this.checkCollisionsCoins();
            this.checkThrowObjects();
            game_sound.play();
        }, 100);

        setInterval(() => {
            this.checkCollisionsEnemies();
        }, 10);

        setInterval(() => {
            this.checkCollisionsBottles();
            this.checkCollisionsBottlesEndboss();
            this.checkCollisionsEndboss();
            this.checkGameLost();
        }, 50);
    }

    /**
     * The function checks if the character's energy is zero and ends the game if it is.
     */
    checkGameLost() {
        if (this.character.energy == 0) {
            clearAllIntervals();
            walking_sound.pause();
            game_sound.pause();
            setTimeout(() => {
                lostGame();
                characterDead_sound.play();
            }, 800);
            setTimeout(() => {
                document.getElementById('running').classList.add('d-none');
                document.getElementById('runningMobile').classList.add('d-none')
                document.getElementById('play').classList.remove('d-none');
                document.getElementById('playMobile').classList.remove('d-none');
            }, 4500);
        }
    }

    /**
     * The function stops all sounds and intervals, plays a winning sound, displays a "won game"
     * message, and shows the "play" button after a delay.
     */
    gameWon() {
        clearAllIntervals();
        walking_sound.pause();
        game_sound.pause();
        setTimeout(() => {
            wonGame();
            winner_sound.play();
        }, 800);
        setTimeout(() => {
            document.getElementById('running').classList.add('d-none');
            document.getElementById('runningMobile').classList.add('d-none');
            document.getElementById('play').classList.remove('d-none');
            document.getElementById('playMobile').classList.remove('d-none');
        }, 4500);
    }


    // Character

    /**
     * The function checks for collisions between the character and enemies in the game and removes the
     * enemy if it is hit while falling.
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isFalling() && !enemy.enemyDead) {
                enemy.enemyDead = true;
                if (enemy.enemyDead) {
                    chickenDead_sound.play();
                    setTimeout(() => { 
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    }, 180)
                }
            }
        })
    }


    /**
     * The function checks for collisions between the game character and enemies, and reduces the
     * character's energy if a collision occurs.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isFalling()) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * This function checks for collisions between the game character and bottles, and if a collision
     * occurs, it updates the game state accordingly.
     */
    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bolltleCollected_sound.play();
                this.character.bottleCounter();
                this.statusBarBottles.setPercentage(this.character.bottleState);
                this.collectedBottles.push(bottle);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1); //damit wird getroffene Flasche gelöscht

            }
        });
    }


    /**
     * This function checks for collisions between the game character and coins, and updates the game
     * accordingly.
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coinCollected_sound.play();
                this.character.coinCounter();
                this.statusBarCoins.setPercentage(this.character.coinState);
                this.level.coins.splice(this.level.coins.indexOf(coin), 1); //damit wird getroffener coin vom canva gelöscht
            }
        });
    }


    /**
     * This function checks if the "throw" key is pressed, the character has a bottle, and is moving
     * right, and if so, creates a new throwable object (bottle) and adds it to the list of throwable
     * objects while reducing the character's bottle state and updating the status bar.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW && this.character.bottleState > 0 && this.character.movingRight) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottleState -= 20;
            this.statusBarBottles.setPercentage(this.character.bottleState);
        }
    }


    //Endboss

    /**
     * This function checks for collisions between throwable objects and an endboss in a game and
     * updates the endboss's energy level accordingly.
     */
    checkCollisionsBottlesEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !this.endbossAlreadyHit) {
                    this.endbossAlreadyHit = true;
                    bottle.bottleHitEndbos = true;
                    endbossHit_sound.play();
                    endboss.hitEndboss();
                    this.statusBarEndboss.setPercentage(endboss.energyEndboss);
                    setTimeout(() => {
                        this.endbossAlreadyHit = false;
                    }, 1000)
                }
            });
        });
    }


    /**
     * This function checks for collisions between the game character and the end boss, and reduces the
     * character's energy if a collision occurs.
     */
    checkCollisionsEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterAlreadyHit) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.characterAlreadyHit = true;
                setTimeout(() => {
                    this.characterAlreadyHit = false;
                }, 150);
            }
        });
    }


    /**
     * The draw function clears the canvas, adds objects to the map, and translates the camera
     * perspective.
     */
    draw() {
        this.clearCanvas();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //leert canvas

        this.ctx.translate(this.camera_x, 0); //wir zeichnen alle Elemente versetzt um 100px
        // Camera wird an unseren Charakter gekoppelt
        this.addObjectsToMap(this.level.grounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0); // back - um die Kameraperspektive zurücksetzen

        // space for fixed object
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossHeart);
        this.ctx.translate(this.camera_x, 0); // forward - um die Kameraperspektive wieder vorzurücken

        this.addToMap(this.character);
        //this.addToMap(this.bottlesThrowable);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0); //hier wird es wieder zurückgesetzt

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () { // diese Funktion wird ausgeführt wenn alles oberhalb der Funktion ausgeführt wurde
            self.draw();
        });
    }


    /**
     * The function clears the canvas by removing all content from it.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * This function adds multiple objects to a map by iterating through an array of objects and
     * calling the addToMap method for each object.
     * @param objects - An array of objects that need to be added to a map. The function iterates
     * through each object in the array and adds it to the map using the `addToMap` method.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * The function adds an image to a map and flips it if necessary.
     * @param mo - The parameter "mo" is likely an object representing a game character or object that
     * has properties and methods related to its appearance and behavior in the game. The code is
     * likely part of a larger game engine or framework that handles the rendering and updating of game
     * objects.
     */
    addToMap(mo) {
        if (mo.otherDirection) { //hierüber wird das Bild spiegelverkehrt eingefügt
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) { // nun soll es wieder vorwärts eingefügt werden
            this.flipImageBack(mo);
        }
    }


    /**
     * The flipImage function flips an image horizontally and updates the x-axis position of a
     * character accordingly.
     * @param mo - The parameter "mo" is likely an object representing an image or character that needs
     * to be flipped horizontally. The function "flipImage" uses the Canvas API to flip the image
     * horizontally by translating it to the right edge of the canvas and then scaling it by -1 on the
     * x-axis. The "
     */
    flipImage(mo) {
        this.ctx.save(); // speichern aller Eigenschaften der eingefügten Elemente
        this.ctx.translate(mo.width, 0); //muss um die Breite des Canvas reduziert werden
        this.ctx.scale(-1, 1); // bild um 180 grad gespiegelt
        mo.x = mo.x * -1; // x-Achse vom Character wird gespiegelt
    }


    /**
     * This function flips an image back to its original position on the x-axis and restores the
     * properties of a canvas context.
     * @param mo - The parameter "mo" is likely an object that represents an image or graphic element
     * on a canvas. The function "flipImageBack" is likely used to flip the image back to its original
     * orientation by resetting its x-axis position and restoring any previously modified properties.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1; // x-Achse wird wieder auf Ursprung zurückgesetzt
        this.ctx.restore(); // Eigenschaften von z83 werden wieder hergestellt
    }
}