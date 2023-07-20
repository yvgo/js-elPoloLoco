class World {
    character = new Character();
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
    endbossAlreadyhit = false;
    characterIsInvulnerable = false;

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
            game_sound.play();
        }, 100);

        setInterval(() => {
            this.checkCollisionsEnemies();
            //this.checkCollisionsEndboss2();
        }, 10);

        setInterval(() => {
            this.checkCollisionsBottles();
            this.checkCollisionsBottlesEndboss();
            this.checkCollisionsEndboss();
            
            this.checkGameLost();
        }, 50);
    }

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
                document.getElementById('play').classList.remove('d-none');
            }, 4500);
        }
    }

    gameWon() {
        walking_sound.pause();
        game_sound.pause();
        clearAllIntervals();
        setTimeout(() => {
            wonGame();
            winner_sound.play();
        }, 800);
        setTimeout(() => {
            document.getElementById('running').classList.add('d-none');
            document.getElementById('play').classList.remove('d-none');
        }, 4500);
    }


    // Character

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
                this.level.coins.splice(this.level.coins.indexOf(coin), 1); //damit wird getroffener coin vom canva gelöscht
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            console.log('thrown Bottle: ', bottle);
            this.character.bottleState -= 20;
            this.statusBarBottles.setPercentage(this.character.bottleState);
        }
    }

    //Endboss

    positionEndboss() {
        return this.level.endboss.x;
    }

    positionCharacter() {
        return this.character.x;
    }

    endBossIsFasterThanCharacter() {
        return this.character.x < this.level.endBoss.x - 100;
    }

    checkCollisionsBottlesEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !this.endbossAlreadyhit) {
                    this.endbossAlreadyhit = true;
                    //console.log('collision bottle with endboss ');
                    endbossHit_sound.play();
                    endboss.hitEndboss();
                    this.statusBarEndboss.setPercentage(endboss.energyEndboss);
                    //console.log('Energie Endboss', endboss.energyEndboss);
                    setTimeout(() => {
                        this.endbossAlreadyhit = false;
                    }, 1000)
                }
            });
        });
    }

    checkCollisionsEndboss2() {
        if (endBossIsFasterThanCharacter()) {
            this.character.energy = 0;
            console.log('Character is dead');
        }
    }


    checkCollisionsEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterIsInvulnerable) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.characterIsInvulnerable = true;
                setTimeout(() => {
                    this.characterIsInvulnerable = false;
                }, 150);
            }
        });
    }

    /* checkCollisionsEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && this.positionEndboss < this.positionCharacter) {
                this.character.energy = 0;
                //this.character.hit();
                //this.statusbarHealth.setPercentage(this.character.energy);
                console.log('Character is dead');
            }
        });
    } */

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