/**
 * Created by ariela.ben.shalom on 1/20/2017.
 */




///////////////////////////////////////////


var Agent = function (game, x, y, speed, directionX, directionY) {

    ImageEntity.call(this, game, x, y, "agent_front");
    this.speed = speed;  // measured in pixels per tick
    this.directionX = directionX;
    this.directionY = directionY;
    this.currCell = Utils.locToTile(this.x, this.y);
    this.updateCounter = 0;
    this.converted = false;
}

Agent.prototype = Object.create(ImageEntity.prototype);
Agent.prototype.constructor = Agent;


////////////////// Mocks ///////////////////

Agent.prototype.GetCurrentStrategy = function(x, y, mosque) {
    var roads = Utils.getAdjacentRoads(Utils.locToTile(x, y));
    var directionX = 0;
    var directionY = 0;
    var target;
    if (roads.length) {

        target = roads[roads.length - 1];

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

};

Agent.prototype.getNextCell = function(){
    if (this.directionY == 1){
       return {row: this.currCell.row+1, col:this.currCell.col}
    }

    if (this.directionY == -1){
        return {row: this.currCell.row-1, col:this.currCell.col}
    }
};

Agent.prototype.getCell = function () {
    return this.currCell
};


Agent.prototype.doTick = function (time) {
    this.updateCounter++;
    if (this.startedAnimation) {
        return;
    }

    if (this.died) {
        return;
    }
    var target;
    if (isInRange(this)) {
        target = isInRange(this);

        if (!this.added){
            this.added = true;
            this.addChild(game.make.sprite(-17, -28, "aura"));
        }
        this.converted = true;
        this.walkingTarget = target;
    }



    if (this.updateCounter % 17 == 0){

    }
    else {
        //console.log("zerrrro: "+dirX + " "+dirY);
    }




    // Calc the new position


    var cellAfterMove = Utils.locToTile(this.x, this.y, true);

    if (cellAfterMove == null) {
        this.alpha = 0;
        this.died = true;
        this.game.levelState.lostAgents++;
        var sound = game.add.audio('giggle');
        sound.play();
        return;
    }

    cellAfterMove.row = Math.floor(cellAfterMove.row);
    cellAfterMove.col = Math.floor(cellAfterMove.col);


    if (((cellAfterMove.row != this.currCell.row) || (cellAfterMove.col != this.currCell.col) || this.updateCounter==1) && !this.converted) {
        // update cell
        var a = Utils.getRoadPossibilities({row:cellAfterMove.row, col:cellAfterMove.col});
        var b = this.getRealPossibilities(a, this.directionX, this.directionY);
        var dir = this.possibilitiesToDirection(b);
        if (dir){
            this.directionX = dir[0];
            this.directionY = dir[1];
        }



        this.currCell = cellAfterMove;

        // Change properties according to the forces of the new cell

    }
    if (this.converted){
        this.directionX = this.GetCurrentStrategy(this.x, this.y,target)[0];
        this.directionY = this.GetCurrentStrategy(this.x, this.y,target)[1];
    }

    this.x = this.x + (this.speed * this.directionX);
    this.y = this.y + (this.speed * this.directionY);

    if (this.converted && this.walkingTarget && this.getDistance(this.walkingTarget) < 30) {
        this.game.levelState.convertedAgents++;
        this.alpha = 0;
        var sound = game.add.audio('holy_sound');
        sound.play();
        this.died = true;
        // this.kill();
    }
};

Agent.prototype.getDistance = function(otherEntity) {
    return Math.sqrt(Math.pow(otherEntity.x - this.x, 2) + Math.pow(otherEntity.y - this.y, 2));
}

Agent.prototype.getRealPossibilities = function(myArray, directionX, directionY) {
    var possibilities = myArray.slice(0);
    if (directionX == -1){
        possibilities[1] = 7;
    }
    if (directionX == 1){
        possibilities[3] = 7;

    }

    if (directionY == -1){
        possibilities[2] = 7;
    }
    if (directionY == 1){
        possibilities[0] = 7;

    }
    return possibilities;
};

Agent.prototype.possibilitiesToDirection = function(possibilities){
    var allPossibilities = [];
    for (var i=0; i<possibilities.length; i++){
        if (possibilities[i]==7 || possibilities[i]==0){
            continue;
        }
        allPossibilities.push(i);
    }
    var i = allPossibilities[Math.floor(Math.random()*allPossibilities.length)];
    if (i==0){
        return [0,-1];
    }
    if (i==1){
        return [1,0];
    }
    if (i==2){
        return [0,1]
    }
    if (i==3){
        return [-1,0];
    }
};


