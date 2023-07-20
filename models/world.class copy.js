class World {
    character = new Character();
    endboss = new Endboss();
    //bottles = new Bottles();
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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() { //In dieser Funktion werden alle Variablen der Welt an die Klasse Character übergeben.
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions(); // kontrolliert regelmäßig ob 2 Elemente kollidieren
            this.checkCollisionsCoins();
            this.checkThrowObjects();
            //endboss

            //this.checkGameOver();
            //game_sound.play();
        }, 100);

        setInterval(() => {
            this.checkCollisionsBottlesEndboss();
            this.checkCollisionsEnemies();
        }, 10);

        setInterval(() => {
            this.checkCollisionsBottles();
            this.checkCollisionsEndboss();
        }, 50);
    }

    /* checkGameOver() {
        if (this.character.energy === 0) {
            setTimeout(() => {
                stopGame();
                game_sound.pause();
                if (this.character.energy === 0) {
                    lostGame();
                    characterDead_sound.play();
                }
            }, 800);

            setTimeout(() => {
                document.getElementById('running').classList.add('d-none');
                document.getElementById('play').classList.remove('d-none');
            }, 4500);
        }
    } */

    /* checkGameOver() {
        if (this.character.energy === 0 || this.level.endboss.energy === 0) {
            stopGame();
            setTimeout(() => {
                game_sound.pause();
                if (this.character.energy === 0) {
                    lostGame();
                    characterDead_sound.play();
                }
                if (this.level.endboss.energy === 0) {
                    wonGame();
                    winner_sound.play();
                }
            }, 800);

            setTimeout(() => {
                document.getElementById('running').classList.add('d-none');
                document.getElementById('play').classList.remove('d-none');
            }, 4500);
        }
    } */


    checkCollisionsEnemies() {
        //this.level.enemies.forEach((enemy, i) => {
        this.level.enemies.forEach((enemy) => {
            //  if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.enemyDead) {
            if (this.character.isColliding(enemy) && this.character.isFalling() && !enemy.enemyDead) {
                console.log('enemy is dead');
                enemy.enemyDead = true;
                if (enemy.enemyDead) {
                    chickenDead_sound.play();
                    setTimeout(() => { // pausiert und währenddessen läuft die Animation
                        //this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1); damit wird getroffenes Huhn gelöscht
                        //this.level.enemies.splice(i, 1);//damit wird getroffenes Huhn gelöscht
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    }, 1000)
                }
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isFalling()) {
                console.log(this.character.speedY);
                console.log('collision with character, energy', this.character.energy);
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                //console.log('collected bottle, bottle', this.character.bottleState);
                bolltleCollected_sound.play();
                this.character.bottleCounter();
                this.statusBarBottles.setPercentage(this.character.bottleState);
                this.collectedBottles.push(bottle);
                //console.log('gesammelte bottle, bottle', this.collectedBottles);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1); //damit wird getroffene Flasche gelöscht

            }
        });
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                //console.log('collected coins, coin', this.character.coinState);
                coinCollected_sound.play();
                this.character.coinCounter();
                this.statusBarCoins.setPercentage(this.character.coinState);
                this.level.coins.splice(this.level.coins.indexOf(coin), 1); //damit wird getroffener coin gelöscht
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottleCounter -= 20;
            console.log('thrown Bottles: ', bottle);
            this.statusBarBottles.setPercentage(this.character.bottleCounter);
        }
    }

    /* checkThrowObjects() {
        if (this.keyboard.D && this.character.bottleCounter > 0) {
            endbossHit_sound.play();
            if (!this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.bottleCounter -= 20;
                this.statusBarBottles.setPercentage(this.character.bottleCounter);
            } if (this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.character.bottleCounter -= 20;
                this.statusBarBottles.setPercentage(this.character.bottleCounter);
            }
        }
    } */

    //Endboss

    checkCollisionsBottlesEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    console.log('collision with bottle ');
                    endbossHit_sound.play();
                    this.endboss.hitEndboss();
                    this.statusBarEndboss.setPercentage(world.level.endboss[0].energyEndboss);
                    //this.statusBarEndboss.setPercentage(this.endboss.energyEndboss);
                    console.log('Energie', this.endboss.energyEndboss);
                    setTimeout(() => {
                        this.reduceThrowingBottlesFromArray(bottle);
                    }, 100);
                }
            });
        });
    }

    reduceThrowingBottlesFromArray(bottle) {
        let i = this.throwableObjects.indexOf(bottle);
        this.throwableObjects.splice(i, 1);
    }

    checkCollisionsEndboss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                console.log('Energie', this.character.energy);
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    //draws all movable objects of the world an the canvas
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

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save(); // speichern aller Eigenschaften der eingefügten Elemente
        this.ctx.translate(mo.width, 0); //muss um die Breite des Canvas reduziert werden
        this.ctx.scale(-1, 1); // bild um 180 grad gespiegelt
        mo.x = mo.x * -1; // x-Achse vom Character wird gespiegelt
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1; // x-Achse wird wieder auf Ursprung zurückgesetzt
        this.ctx.restore(); // Eigenschaften von z83 werden wieder hergestellt
    }
}