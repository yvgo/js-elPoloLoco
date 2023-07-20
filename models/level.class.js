/* The `class Level` is defining a blueprint for creating objects that represent a level in a game or
application. It has properties for enemies, endboss, clouds, grounds, bottles, coins, and
level_end_x, and a constructor function that takes in parameters for these properties and assigns
them to the object being created. This allows for easy creation of level objects with pre-defined
properties and methods. */
class Level {
    enemies;
    endboss;
    grounds;
    clouds;
    bottles;
    coins;
    level_end_x = 2200;

    /**
     * The constructor function takes in parameters for enemies, endboss, clouds, grounds, bottles, and
     * coins and assigns them to properties of the object being created.
     * @param enemies - An array of enemy objects in the game.
     * @param endboss - The "endboss" parameter is likely referring to a game boss that appears at the
     * end of a level or game. It could be a powerful enemy that the player must defeat in order to
     * progress to the next level or complete the game.
     * @param clouds - The "clouds" parameter is likely an array or collection of objects that
     * represent clouds in a game or application. These objects may contain properties such as
     * position, size, and texture, and may be used to create a visual background or environment for
     * the game.
     * @param grounds - The "grounds" parameter is likely an array or object that contains information
     * about the ground elements in a game or application. This could include things like the position,
     * size, texture, and collision properties of the ground objects. The "grounds" parameter is being
     * passed into a constructor function, which is a
     * @param bottles - It is a parameter that represents the bottles in a game or application. It
     * could refer to power-ups, health potions, or any other type of collectible item that the player
     * can obtain during gameplay.
     * @param coins - The "coins" parameter is likely an array or object that contains information
     * about the coins in the game. This could include their position, value, and any other relevant
     * data. The constructor is assigning this parameter to the "coins" property of the object being
     * created.
     */
    constructor(enemies, endboss, clouds, grounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.grounds = grounds;
        this.bottles = bottles;
        this.endboss = endboss;
        this.coins = coins;
    }
}