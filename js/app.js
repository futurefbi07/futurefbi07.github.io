/*This code was implemented with the assistance
of Matthew Cranford's Arcade Game Walkthrough, see
https://matthewcranford.com/arcade-game-walkthrough-part-1-starter
-code-breakdown/*/
// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.boundary = this.step * 5;
    //Set speed of the enemy
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.boundary){
      // move forward
      // calcularte speed of the enemy
      // by multiplying any movement by the dt parameter
      // which will give the enemy a constant speed across the gameboar
      this.x = this.x + this.speed * dt;
    }
    else {
      // move to start position
      this.x = -1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(){
    this.x = 202;
    this.y = 387;
    this.finish = false
    this.sprite = 'images/char-boy.png';
}

  update() {
    //Did the player get hit
      for(let enemy of allEnemies) {

        if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + 202/2)) {
          this.reset();
        }

        //Did the player reach the last tile
        if(this.y === -28){
          this.finish = true;
        }
      }
  }
  reset() {
    this.x = 202;
    this.y = 387;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
// Update the players's position, required method for game

// Parameter: dt, a time delta between ticks

/*@param {string} input -- Direction to Travel According to Input*/

handleInput(input){
  switch(input){
      case 'left':
        if(this.x > 0){
          this.x = this.x - 101;
        }
          break;
      case 'right':
        if(this.x < 400){
          this.x = this.x + 101;
        }
          break;
      case 'up':
        if(this.y > 0){
          this.y = this.y - 83;
        }
          break;
      case 'down':
        if(this.y < 332){
          this.y = this.y + 83;
        }
          break;
  }
}
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const allEnemies =[];

// Place the enemy object in a variable

const bug1 = new Enemy(-101, 0, 310);
const bug2 = new Enemy((-101 * 3), (83 * 2), 400);
const bug3 = new Enemy((-101), (83 * 3), 230);
const bug4 = new Enemy((-101 * 4), (83 * 3), 230);

allEnemies.push(bug1, bug2, bug3, bug4);
// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
