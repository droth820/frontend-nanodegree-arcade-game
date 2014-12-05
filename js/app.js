var enemyPosY = [60, 143, 226];
var enemySpeed = [25,100,125,135,150,250];

/** Enemies our player must avoid */
var Enemy = function() {
    /** Variables applied to each of our instances go here,
     * we've provided one for you to get started
     *The image/sprite for our enemies, this uses
     *a helper we've provided to easily load images
     */
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    this.speed = enemySpeed[Math.floor(Math.random() * 6)];
};

var reset = function(){
  player.x = 200;
  player.y = 392;
};
/**Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
  /**You should multiply any movement by the dt parameter
   * which will ensure the game runs at the same speed for
   * all computers.
    */
  this.x = this.x + (this.speed * dt);
  if (this.x > 550) {
    this.x = -100;
    this.y = this.y + 83;
    this.speed = enemySpeed[Math.floor(Math.random() * 6)];
    if (this.y > 226) {
      this.y = 60;
    }
  }
   if (this.x > -50 && this.x < 50) {
    this.tileX = 0;
  } else if (this.x > 50 && this.x < 150) {
    this.tileX = 101;
  } else if (this.x > 150 && this.x < 250) {
    this.tileX = 202;
  } else if (this.x > 250 && this.x < 350) {
    this.tileX = 303;
  } else if (this.x > 350 && this.x < 450) {
    this.tileX = 404;
  } else if (this.x > 450 && this.x < 550) {
    this.tileX = 505;
  } else if (this.x > 550 && this.x < 650) {
    this.tileX = 606;
  } else if (this.x > 650 && this.x < 750) {
    this.tileX = 707;
  } else if (this.x > 750 && this.x < 850) {
    this.tileX = 808;
  } else if (this.x > 850) {
    this.tileX = 1;
  }

  /**Check for collision.
   * Game will reset and dieSound will play if collision occurrs.
   */
  if (
    player.x <=(this.x + 75)
    && this.x <=(player.x + 75)
    && player.y <=(this.y + 75)
    && this.y <=(player.y + 75)
    ) {
    dieSound();
    reset();
  }
};

/** Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Now write your own player class
 *  This class requires an update(), render() and a handleInput() method.
 */  
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 392;
};

Player.prototype.update = function(){
  if (this.ctrlKey === 'left' && this.x != 0) {
    this.x = this.x - 100;
    moveSound();
  } else if (this.ctrlKey === 'right' && this.x != 400 ) {
    this.x = this.x + 100;
    moveSound();
  } else if (this.ctrlKey === 'up') {
    this.y = this.y - 83;
    moveSound();
  } else if (this.ctrlKey === 'down' && this.y != 392) {
    this.y = this.y + 83;
    moveSound();
  }
  this.ctrlKey = null;

  if (this.y < 60) {
    winSound();
    this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  this.ctrlKey = key;
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 392;
};

/** Sound plays when user sucessfully crosses the road */
function winSound (){
  var win = new Audio("audio/win.wav")
  win.play();
}

/** Sound plays when user collides with bug */
function dieSound () {
  var splat = new Audio("audio/splat.wav");
  splat.play();
}

/** Sound plays when directional arrows are clicked */
function moveSound () {
  var snd = new Audio("audio/move.wav");
    snd.play();
  }

/** Handles reset button for game */
function gameReset () {
  var btn = document.getElementById("resetGame");
  if(btn.onclick) {
    reset();
  }
}

/** Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */
var enemy01 = new Enemy();
var enemy02 = new Enemy();
var enemy03 = new Enemy();
var enemy04 = new Enemy();
var enemy05 = new Enemy();
var enemy06 = new Enemy();
var allEnemies = [enemy01, enemy02, enemy03, enemy04, enemy05, enemy06];
var player = new Player();



/** This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
