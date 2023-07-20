class Endboss extends MovableObject {
    y = 175;
    height = 265;
    width = 225;
    speed = 10;
    speedThroughHit = 50;
    energyEndboss = 100;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    world;
    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2600;
        //this.speed = 0.15
        //this.checkIsDead();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDeadEndboss()) {
                console.log('Enboss is dead');
                this.animateIsDead();
            }
            else if (this.isHurtEndboss() && !this.isDeadEndboss()) {
                this.animateHurt();
            } else {
                this.animateFirst();
            }
        }, 1000);
    }

    animateHurt() {
        console.log('Enboss is hurt');
        setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
            //this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 450);
    }

    animationIsHurt() {
        let i = 0;
        //setInterval(() => {
            if (!this.isDeadEndboss()) {
                if (i < 10) {
                this.playAnimation(this.IMAGES_HURT);
                i++;
            }
            }
        //}, 145);
        setInterval(() => {
            if (!this.isDeadEndboss()) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100); 
    }

    animateFirst() {
        let i = 0; // abspielen der einzelnen Animationen wird auf null gesetzt
        setInterval(() => {
            if (world.character.x > 2100 && !this.isHurtEndboss() && !this.isDeadEndboss()) {
                console.log(world.character.x);
                if (i < 20) { //solange die Animation nicht bereits 50x wiederholt wurde erhöhe ich um 1
                    this.playAnimation(this.IMAGES_ALERT);
                    i++;
                }
            }
        }, 150);
    }

    animateIsDead() {
        console.log('Enboss is dead');
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 150);
        this.energyEndboss = 0;
        clearAllIntervals();
        this.gameWon();
    };


    /* gameIsOver() {
        playAnimationDead(this.IMAGES_DEAD);
        gameWon();
        //checkGameOver();
    }  */
}