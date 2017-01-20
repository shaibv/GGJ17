/**
 * Created by ariela.ben.shalom on 1/20/2017.
 */


////////////////// Mocks ///////////////////

var mock_cell = {
    id: 1
};


function GetCurrentStrategy() {
    return 1;
}


function getCellByPos(x, y) {
    return mock_cell;
}

///////////////////////////////////////////



function Agent(game, x, y, speedX, speedY, direction) {
    Phaser.Sprite.call(this, game, x, y, "agent");
    this.x = x;
    this.y = y;
    this.speedX = speedX;  // measured in pixels per tick
    this.speedY = speedY;
    this.direction = direction;
    this.currCell = getCellByPos(this.x, this.y);

    this.anchor.setTo(0.5, 0.5);
}
Agent.prototype = Object.create(Phaser.Sprite.prototype);
Agent.prototype.constructor = Agent;



Agent.prototype.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    var cellAfterMove = getCellByPos(this.x, this.y);

    if (cellAfterMove.id != this.currCell.id) {
        // update cell
        this.currCell = cellAfterMove;

        // Change properties according to the forces of the new cell
        this.direction = GetCurrentStrategy();
    }
};





// TODO - reset method - pos to (-1)

