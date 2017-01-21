/**
 * Created by ariela.ben.shalom on 1/20/2017.
 */


////////////////// Mocks ///////////////////

function GetCurrentStrategy() {
    return [0, 1];
}


///////////////////////////////////////////



var Agent = function(game, x, y, speed, directionX, directionY) {

    ImageEntity.call(this, game, x, y, "agent_front");
    this.speed = speed;  // measured in pixels per tick
    this.directionX = directionX;
    this.directionY = directionY;
    this.currCell = Utils.locToTile(this.x, this.y);
}

Agent.prototype = Object.create(ImageEntity.prototype);
Agent.prototype.constructor = Agent;

Agent.prototype.update = function() {

    // Calc the new position
    this.x = this.x + (this.speed * this.directionX);
    this.y = this.y + (this.speed * this.directionY);

    var cellAfterMove = Utils.locToTile(this.x, this.y);

    cellAfterMove.row = Math.floor(cellAfterMove.row);
    cellAfterMove.col = Math.floor(cellAfterMove.col);

    // I we reached a new cell
    if ((cellAfterMove.row != this.currCell.row) || (cellAfterMove.col != this.currCell.col)) {
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

