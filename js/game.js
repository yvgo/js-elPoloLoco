let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenActive = false;
let portrait = window.matchMedia("(orientation: portrait)");

/**
 * The function initializes mobile device and touch events.
 */
function init() {
    checkMobileDevice();
    touchEvents();
}

// Audio

/* These lines of code are creating new Audio objects for various sound effects used in the game. Each
Audio object is initialized with the path to the corresponding sound file. These objects can then be
used to play the sound effects at various points in the game. */
game_sound = new Audio('audio/totalGame.mp3');
walking_sound = new Audio('audio/walking.mp3');
bolltleCollected_sound = new Audio('audio/bing.mp3');
coinCollected_sound = new Audio('audio/coin.mp3');
chickenDead_sound = new Audio('audio/chickenDead.mp3');
winner_sound = new Audio('audio/gewonnen.mp3');
characterDead_sound = new Audio('audio/lost.mp3');
endbossHit_sound = new Audio('audio/bottle2.mp3');
endbossFinal_sound = new Audio('audio/finalEndboss.mp3');


/**
 * The function mutes all sound effects in a game by setting their volume to 0 and updating the
 * corresponding HTML elements.
 */
function muteSound() {
    document.getElementById('unmuteAudio').classList.remove('d-none');
    document.getElementById('unmuteAudioMobile').classList.remove('d-none');
    document.getElementById('muteAudio').classList.add('d-none');
    document.getElementById('muteAudioMobile').classList.add('d-none');
    game_sound.volume = 0;
    walking_sound.volume = 0;
    bolltleCollected_sound.volume = 0;
    coinCollected_sound.volume = 0;
    chickenDead_sound.volume = 0;
    characterDead_sound.volume = 0;
    winner_sound.volume = 0;
    endbossHit_sound.volume = 0;
    endbossFinal_sound.volume = 0;
}


/**
 * The function unmuteSound adjusts the volume of various game sounds and switches the mute/unmute
 * button display.
 */
function unmuteSound() {
    document.getElementById('unmuteAudio').classList.add('d-none');
    document.getElementById('unmuteAudioMobile').classList.add('d-none');
    document.getElementById('muteAudio').classList.remove('d-none');
    document.getElementById('muteAudioMobile').classList.remove('d-none');
    game_sound.volume = 1;
    walking_sound.volume = 1;
    bolltleCollected_sound.volume = 1;
    coinCollected_sound.volume = 1;
    chickenDead_sound.volume = 1;
    characterDead_sound.volume = 1;
    characterDead_sound.volume = 1;
    winner_sound.volume = 0.2;
    endbossHit_sound.volume = 1;
    endbossFinal_sound.volume = 1;
}


/**
 * The function clears all intervals set by the window object.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * The function hides the canvas and shows the lost image.
 */
function lostGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('lostImg').classList.remove('d-none');
}

/**
 * The function hides the canvas and displays the game over image.
 */
function wonGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('gamoOverImg').classList.remove('d-none');
}


/* This code is adding an event listener to the window object that listens for the 'keydown' event.
When a key is pressed, the function specified in the second argument is executed. This function
checks which key was pressed by checking the keyCode property of the event object. If the keyCode
matches one of the arrow keys (37 for left, 38 for up, 39 for right, and 40 for down), the
corresponding property of the keyboard object (LEFT, UP, RIGHT, or DOWN) is set to true. Similarly,
if the keyCode is 32 (for space) or 68 (for 'D' key), the corresponding property of the keyboard
object (SPACE or THROW) is set to true. This allows the game to keep track of which keys are
currently being pressed. */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.THROW = true;
    }
});


/* This code is adding an event listener to the window object that listens for the 'keyup' event. When
a key is released, the function specified in the second argument is executed. This function checks
which key was released by checking the keyCode property of the event object. If the keyCode matches
one of the arrow keys (37 for left, 38 for up, 39 for right, and 40 for down), the corresponding
property of the keyboard object (LEFT, UP, RIGHT, or DOWN) is set to false. Similarly, if the
keyCode is 32 (for space) or 68 (for 'D' key), the corresponding property of the keyboard object
(SPACE or THROW) is set to false. This allows the game to keep track of which keys are currently
being pressed or released. */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.THROW = false;
    }
});


// Mobile Devices

/* This line of code is adding an event listener to the `portrait` media query object. The event
listener listens for changes in the orientation of the device (from portrait to landscape or vice
versa) and triggers the `checkMobileOrientation()` function when a change is detected. The
`checkMobileOrientation()` function checks whether the device is currently in portrait or landscape
mode and updates the display accordingly by showing or hiding certain elements on the page. */
portrait.addEventListener("change", () => checkMobileOrientation());


/**
 * The function checks if the device's screen size is smaller than 400x800 and calls another function
 * to check the orientation if it is a mobile device.
 */
function checkMobileDevice() {
    if (window.innerWidth < 400 && window.innerHeight < 800) {
        checkMobileOrientation();
    }
}


/**
 * The function checks the orientation of a mobile device and displays different elements based on
 * whether it is in portrait or landscape mode.
 */
function checkMobileOrientation() {
    if (portrait.matches) {
        document.getElementById('mainScreen').classList.add('d-none');
        document.getElementById('rotateScreen').classList.remove('d-none');
    } else {
        document.getElementById('rotateScreen').classList.add('d-none');
        document.getElementById('mainScreen').classList.remove('d-none');
    }
}


/**
 * This function adds touch event listeners to buttons and updates the keyboard object accordingly.
 */
function touchEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.THROW = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.THROW = false;
    });
}


// Start / Reload

/**
 * The function starts the game by initializing the level, creating a new world, and updating the HTML
 * elements to display the game.
 */
function startGame() {
    showLoadingScreen();
    document.getElementById('lostImg').classList.add('d-none');
    document.getElementById('gamoOverImg').classList.add('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    setTimeout(() => {
        document.getElementById('canvas').innerHTML = '';
        document.getElementById('body').style.backgroundImage = 'url(img/background/sunset-dark.png)';
        document.getElementById('startImg').classList.add('d-none');
        document.getElementById('play').classList.add('d-none');
        document.getElementById('playMobile').classList.add('d-none');
        document.getElementById('canvas').classList.remove('d-none');
        document.getElementById('running').classList.remove('d-none');
        document.getElementById('runningMobile').classList.remove('d-none');
        document.getElementById('home').classList.remove('d-none');
        document.getElementById('homeMobile').classList.remove('d-none');
        closeLoadingScreen();
    }, 1000);
}


/**
 * The function shows a loading screen and hides a start image.
 */
function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    document.getElementById('startImg').classList.add('d-none');

}


/**
 * The function adds a 'd-none' class to the element with the ID 'loadingScreen' to hide it.
 */
function closeLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
}


/**
 * The function reStartGame() waits for 2 seconds and then calls the startGame() function.
 */
function reStartGame() {
    setTimeout(() => {
        startGame();
    }, 2000);
}


/**
 * The function reloads the current webpage and hides the element with the ID 'home'.
 * @returns a boolean value of `false`.
 */
function reloadSite() {
    document.getElementById('home').classList.add('d-none');
    location.reload();
    return false;
}


// Info-Bubbles

/**
 * The function toggles the visibility of an HTML element with the ID 'bubble'.
 */
function infoBubble() {
    let info = document.getElementById('bubble');
    if (info.classList.contains('d-none')) {
        info.classList.remove('d-none');
    } else {
        info.classList.add('d-none');
    }
}


/**
 * The function toggles the visibility of an element with the ID "law" by adding or removing the
 * "d-none" class.
 */
function lawBubble() {
    let law = document.getElementById('law');
    if (law.classList.contains('d-none')) {
        law.classList.remove('d-none');
    } else {
        law.classList.add('d-none');
    }
}


// Fullscreen

/**
 * The function toggles between starting and exiting fullscreen mode.
 */
function toggleFullscreen() {
    fullscreenActive = !fullscreenActive;
    if (fullscreenActive) {
        startFullscreen();
    } else {
        exitFullscreen();
    }
}

/**
 * The function starts fullscreen mode for an element with the ID 'fullscreen'.
 */
function startFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


/**
 * This function requests to enter fullscreen mode for a given element.
 * @param element - The HTML element that you want to display in fullscreen mode. This can be any valid
 * HTML element such as a video player, image gallery, or even the entire webpage.
 */
function enterFullscreen(element) {
    fullscreenActive = true;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * The function exits full screen mode in a web browser.
 */
function exitFullscreen() {
    fullscreenActive = false;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

