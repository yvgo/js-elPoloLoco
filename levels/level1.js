/* `let level1;` is declaring a variable `level1` with the `let` keyword, but not assigning any value
to it. The variable is likely to be used later in the code to store an instance of the `Level`
class. */
let level1;

/* The `initLevel()` function is initializing a new level by creating instances of various game objects
such as chickens, endboss, clouds, ground, bottles, and coins. These objects are passed as arguments
to the `Level` constructor to create a new level. */
function initLevel() {

    level1 = new Level(

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenYellow(),
            new ChickenYellow(),
            new ChickenYellow(),
            new ChickenYellow(),
            new ChickenYellow(),
        ],
        [
            new Endboss(),
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('img/5_background/layers/4_clouds/2.png', 450),

            new Cloud('img/5_background/layers/4_clouds/1.png', 900),
            new Cloud('img/5_background/layers/4_clouds/2.png', 1350),

            new Cloud('img/5_background/layers/4_clouds/1.png', 1800),
            new Cloud('img/5_background/layers/4_clouds/2.png', 2250),

            new Cloud('img/5_background/layers/4_clouds/1.png', 2700),
            new Cloud('img/5_background/layers/4_clouds/1.png', 3150),

            new Cloud('img/5_background/layers/4_clouds/2.png', 3600),
        ],
        [
            new Ground('img/5_background/layers/air.png', -719),
            new Ground('img/5_background/layers/3_third_layer/2.png', -719),
            new Ground('img/5_background/layers/2_second_layer/2.png', -719),
            new Ground('img/5_background/layers/1_first_layer/2.png', -719),

            new Ground('img/5_background/layers/air.png', 0),
            new Ground('img/5_background/layers/3_third_layer/1.png', 0),
            new Ground('img/5_background/layers/2_second_layer/1.png', 0),
            new Ground('img/5_background/layers/1_first_layer/1.png', 0),
            new Ground('img/5_background/layers/air.png', 719),
            new Ground('img/5_background/layers/3_third_layer/2.png', 719),
            new Ground('img/5_background/layers/2_second_layer/2.png', 719),
            new Ground('img/5_background/layers/1_first_layer/2.png', 719),

            new Ground('img/5_background/layers/air.png', 719 * 2),
            new Ground('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new Ground('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new Ground('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new Ground('img/5_background/layers/air.png', 719 * 3),
            new Ground('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new Ground('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new Ground('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],
        [
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 550),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 630),

            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 880),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 960),

            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1260),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1360),

            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1660),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1760),

            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1960),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 2060),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ]
    );
}