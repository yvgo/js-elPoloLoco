/* The `class Chicken` is extending the `MovableObject` class, which means that the `Chicken` class
inherits all the properties and methods of the `MovableObject` class. This allows the `Chicken`
class to use and modify the properties and methods of the `MovableObject` class, as well as add its
own unique properties and methods. */
class Chicken extends MovableObject {
  y = 355;
  height = 70;
  width = 60;

  CHICKEN_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  CHICKEN_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',

  ];
  offset = {
    top: -5,
    bottom: 0,
    left: 0,
    right: 0
  };


  /**
   * The constructor function loads images and sets random values for the chicken's position and speed
   * before starting the animation.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.CHICKEN_WALKING);
    this.loadImages(this.CHICKEN_DEAD);

    this.x = 300 + Math.random() * 2000; // Zufallswert zw. 200 - 700
    this.speed = 0.1 + Math.random() * 0.25;
    this.animate();
  }


  /**
   * The function animates a chicken character by moving it left and playing different animations based
   * on whether it is dead or alive.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.enemyDead) {
        this.playAnimation(this.CHICKEN_WALKING);
      } else {
        this.playAnimation(this.CHICKEN_DEAD);
      }
    }, 250);
  }

}




