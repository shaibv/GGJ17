/**
 * Created by ariela.ben.shalom on 1/20/2017.
 */


////////////////// Mocks ///////////////////

function GetCurrentStrategy() {
    return [0, 1];
}


///////////////////////////////////////////



var Agent = function(game, x, y, resource, speed, directionX, directionY) {

    Phaser.Sprite.call(this, game, x, y, resource);
    //this.x = x;
    //this.y = y;
    this.speed = speed;  // measured in pixels per tick
    this.directionX = directionX;
    this.directionY = directionY;
    this.currCell = locToTile(this.x, this.y);
}

Agent.prototype = Object.create(Phaser.Sprite.prototype);

Agent.prototype.update = function() {

    // Calc the new position
    this.x = this.x + (this.speed * this.directionX);
    this.y = this.y + (this.speed * this.directionY);

    var cellAfterMove = locToTile(this.x, this.y);

    cellAfterMove[0] = Math.floor(cellAfterMove[0]);
    cellAfterMove[1] = Math.floor(cellAfterMove[1]);

    // I we reached a new cell
    if ((cellAfterMove[0] != this.currCell[0]/1) || (cellAfterMove[1] != this.currCell[1])) {
        // update cell
        this.currCell = cellAfterMove;

        // Change properties according to the forces of the new cell
        this.directionX = GetCurrentStrategy()[0];
        this.directionY = GetCurrentStrategy()[1];
    }
};

Agent.prototype.getCell = function() {
    return this.currCell
};


Agent.prototype.doTick = function (time) {
    this.update();
};


// TODO - reset method - pos to (-1)

