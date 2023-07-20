/* `class ChickenYellow extends MovableObject` is creating a new class called `ChickenYellow` that
extends the `MovableObject` class. This means that the `ChickenYellow` class inherits all the
properties and methods of the `MovableObject` class and can also have its own unique properties and
methods. */
class ChickenYellow extends MovableObject {
  y = 380;
  height = 45;
  width = 40;

  CHICKEN_YELLOW_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  CHICKEN_YELLOW_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
  ];
  offset = {
    top: 0,
    bottom: 0,
    left: 10,
    right: 10
  };


  /**
   * This function loads images and sets random values for the chicken's position and speed before
   * starting an animation.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.CHICKEN_YELLOW_WALKING);
    this.loadImages(this.CHICKEN_YELLOW_DEAD);
    this.x = 800 + Math.random() * 1800; // Zufallswert zw. 200 - 700
    this.speed = 0.1 + Math.random() * 0.25;
    this.animate();
  }


  /**
   * The function animates a yellow chicken by moving it left and playing different animations based on
   * whether it is dead or alive.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if(!this.enemyDead) {
        this.playAnimation(this.CHICKEN_YELLOW_WALKING);
      } else { 
        this.playAnimation(this.CHICKEN_YELLOW_DEAD);
      }
    }, 250);
  }

}

