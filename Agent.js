/**
 * Created by ariela.ben.shalom on 1/20/2017.
 */


////////////////// Mocks ///////////////////

function GetCurrentStrategy(x, y, mosque) {
    var roads = Utils.getAdjacentRoads(Utils.locToTile(x, y));
    var directionX = Math.round(Math.random() * 2 - 1);
    var directionY = Math.round(Math.random() * 2 - 1);

    if (roads.length) {
        var target = roads[roads.length - 1];
    }
    if (mosque) {
        target = mosque;
    }


    if (target.x > x) {
        directionX = 1;
    }
    if (target.x < x) {
        directionX = -1;
    }
    if (target.y < y) {
        directionY = -1;
    }
    if (target.y > y) {
        directionY = 1;
    }

    return [directionX, directionY];

}


///////////////////////////////////////////


var Agent = function (game, x, y, speed, directionX, directionY) {

    ImageEntity.call(this, game, x, y, "agent_front");
    this.speed = speed;  // measured in pixels per tick
    this.directionX = directionX;
    this.directionY = directionY;
    this.currCell = Utils.locToTile(this.x, this.y);
}

Agent.prototype = Object.create(ImageEntity.prototype);
Agent.prototype.constructor = Agent;

Agent.prototype.update = function () {
    if (this.startedAnimation) {
        return;
    }

    if (isInRange(this)) {
        var target = isInRange(this);
        this.converted = true;



    }
    this.directionX = GetCurrentStrategy(this.x, this.y,target)[0];
    this.directionY = GetCurrentStrategy(this.x, this.y,target)[1];
    // Calc the new position
    this.x = this.x + (this.speed * this.directionX || 0 );
    this.y = this.y + (this.speed * this.directionY || 0);

    var cellAfterMove = Utils.locToTile(this.x, this.y);

    cellAfterMove.row = Math.floor(cellAfterMove.row);
    cellAfterMove.col = Math.floor(cellAfterMove.col);


    if ((cellAfterMove.row != this.currCell.row) || (cellAfterMove.col != this.currCell.col)) {
        // update cell
        this.currCell = cellAfterMove;

        // Change properties according to the forces of the new cell

    }



};

Agent.prototype.getCell = function () {
    return this.currCell
};


Agent.prototype.doTick = function (time) {
    this.update();
};

