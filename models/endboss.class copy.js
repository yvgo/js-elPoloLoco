class Endboss extends MovableObject {
    y = 175;
    height = 265;
    width = 225;
    //speed = 10;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2600;
        //this.speed = 0.15
        this.animate();
    }

    animate() {
        let i = 0; // abspielen der einzelnen Animationen wird auf null gesetzt

        /* setInterval(() => {
            this.moveLeft();
          }, 1000 / 60); */

        /* setInterval(() => {
            // if (i < 10) { //solange die Animation nicht bereits 10x wiederholt wurde erhöhe ich um 1
            //i++;
            //if(world.character.x > 2400 && !hadFirstContact) {
            if (world.character.x > 2180) {
                console.log(world.character.x);
                if (i < 30) { //solange die Animation nicht bereits 10x wiederholt wurde erhöhe ich um 1
                    this.playAnimation(this.IMAGES_ALERT);
                    //i = 0; dann wird die Animation nocheinmal ausgeführt
                    //hadFirstContact = true;  dadurch wird es nicht nochmal ausgeführt
                    i++;
                }
            }
        }, 150); //1,5 Sekunden */

        /* setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
 */

        setInterval(() => {
            if (world.character.x > 1600 && !this.hitEndboss()) {
                console.log(world.character.x);
                if (i < 30) { //solange die Animation nicht bereits 10x wiederholt wurde erhöhe ich um 1
                    this.playAnimation(this.IMAGES_ALERT);
                    //i = 0; dann wird die Animation nocheinmal ausgeführt
                    //hadFirstContact = true;  dadurch wird es nicht nochmal ausgeführt
                    i++;
                }
            } else if (world.character.x > 1600 && this.hitEndboss()) {
                this.playAnimation(this.IMAGES_HURT);
                console.log('Enboss is hurt');
            }
        }, 200);
        else if (this.isDeadEndboss() && !this.hadFirstContact) {
            console.log('Enboss is dead');
            this.playAnimation(this.IMAGES_DEAD);
            /*  } else if (this.hitEndboss()) {
                 this.playAnimation(this.IMAGES_HURT);
                 console.log('Enboss is hurt'); */
    }

    /* else if 
                    (world.character.x < 2100 && !this.hadFirstContact && !this.isHurtEdboss() && !this.isDeadEndboss()) {
                    this.playAnimation(this.IMAGES_ALERT);
                    console.log('Show Alert Images');
                } else if (!this.isHurtEdboss() && !this.isDeadEndboss()) {
                        setInterval(() => {
                            this.moveLeft();
                            this.hadFirstContact = true;
                        }, 1000 / 60);
                        this.playAnimation(this.IMAGES_WALKING);
                        console.log('Show Attack Images');
                } */



    /* setInterval(() => {
        if (world.character.x > 2180 && this.hitEndboss() && this.endboss.energy > 0) {
            console.log(this.endboss.energy);
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.hitEndboss() && this.energy < 0) {
            this.endbossDead = true;
            this.playAnimation(this.IMAGES_DEAD);
        } 
    }, 150);  */

    /* setInterval(() => {
        if(!this.endbossDead) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.isDead()) {
            
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 350); */

}
