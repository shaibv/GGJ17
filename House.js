/**
 * Created by adi on 1/20/2017.
 */
House = function (game, x, y, resource, agents) {
    this.type = "House";
    this.game = game
    this.agents = agents;
    this.agentRate =  1;// Utils.randomInt(6,12);
    Building.call(this, game, x, y, resource);
}

House.prototype = Object.create(Building.prototype);
House.prototype.constructor = House;

House.prototype.setAgentNum = function (num) {   
    this.agentNum = num;    
}

House.prototype.emit = function(){
    this.game.levelState.emittedAgents++;
    var agent = new Agent(this.game, this.x +30 , this.y  , 0.3, 1, 0);
    this.game.add.existing(agent);
    agents.push(agent);
}

House.prototype.doTick = function(time) {
    var emittedAgents = this.game.levelState.emittedAgents;
    var totalAgentNumber = gameLevelParams.totalAgentNumber;
    if (emittedAgents >= totalAgentNumber) {
        return;
    }
    var leftToEmit = totalAgentNumber - emittedAgents;
    if (((time/1000 - this.lastWavesSentTime / 1000) > this.agentRate) && leftToEmit > 0) {
        this.emit();
        this.lastWavesSentTime = time;
    }
}

House.prototype.getRoad = function () {
    var roads = Utils.getAdjacentRoads(Utils.locToTile(this.x, this.y));
    return roads;
}


