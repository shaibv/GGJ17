/**
 * Created by adi on 1/20/2017.
 */
House = function (game, x, y, resource) {
    this.type = "House";
    this.agentNum = 0;
    this.agentRate = 5;
    Building.call(this, game, x, y, resource);
}

House.prototype = Object.create(Building.prototype);
House.prototype.constructor = House;

House.prototype.setAgentNum = function (num) {   
    this.agentNum = num;    
}

House.prototype.emit = function(){
    var agent = new Agent(this.x + 30, this.y, 3, 0, 1);
}

House.prototype.doTick = function(time) {
    var time = new Date();
    if (((time/1000 - this.lastWavesSentTime / 1000) > this.agentRate) && (this.agentNum >0)) {
        this.emit();
        this.lastWavesSentTime = time;
        this.agentNum --;
    }
}


