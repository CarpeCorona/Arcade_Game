`strict mode`;

// Sets the variable to be used for the keeping track of the score
const scoreBoard = document.getElementById('scoreBoard');

class GamePieces {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // Creates the images on site for the game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends GamePieces {
    constructor(x, y, speed){
        super(x, y, speed);
        this.sprite = 'images/enemy-bug.png';
    }

    // Uses dt as the set standard to make sure all computers run at the same speed
    update(dt) {
        this.x += this.speed * dt;

        // This resets the enemy bug when reaches a little bit outside of game canvas
        if (this.x > 525) {
            this.x = -150;
            this.speed = speedMovement();
        }

        // Checks for collision between player and enemies and resets if needed
        if (player.x < this.x + 58 && player.x + 58 > this.x && player.y < this.y + 40 && 40 + player.y > this.y) {
            player.reset();

            // Lowers player score if they get hit by a bug
            if (player.score >= 1) {
                player.score -= 1;
                scoreBoard.innerHTML = `Points: ${player.score}`;
          }
        }
    }
}

class Player extends GamePieces {
    constructor(x, y, score){
        super(x, y);
        this.sprite = 'images/char-boy.png';
        this.score = 0;
    }

    update() {
        // Resets the player to start position if they wonder off the game canvas
        if (this.y > 375 || this.x > 400 || this.x < 0) {
            this.reset();
        }

        // Winning position for player at top of the game
        if (this.y < 0) {
            this.reset();

            // Adds points to score if they make it to the top
            this.score += 1;
            scoreBoard.innerHTML = `Points: ${this.score}`;
        }
    }

    // Sets method to allow character to move using the WASD buttons or the arrow keys
    handleInput(keyPress) {
        let buttonPressed = keyPress;

        if (buttonPressed === "left") {
            this.x -= 100;
        }
        else if (buttonPressed === "right") {
            this.x += 100;
        }
        else if (buttonPressed === "up") {
            this.y -= 85;
        }
        else if (buttonPressed === "down") {
            this.y += 85;
        }
    }

    reset() {
      this.x = 200;
      this.y = 375;
    }
}

// Setting variables for the game
var player = new Player(200, 375);
var enemies = [60, 145, 225];
var allEnemies  = [];

// After each enemy reset their speed will increase by 10% per point on scoreboard
function speedMovement() {
    return 250 + Math.floor(Math.random() * 400 + (400 * (player.score / 10)));
}

// Takes the enemies array and creates the Enemy objects for game
enemies.forEach(y => {
    enemy = new Enemy(-150, y, speedMovement());
    allEnemies.push(enemy);
});

// Added the option to use WASD as movement keys
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {

        // Adds the basic arrow keys to game
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        // Adds the WASD keycodes to game
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
