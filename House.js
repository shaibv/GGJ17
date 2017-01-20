/**
 * Created by adi on 1/20/2017.
 */
Home = function (game, x, y, resource) {
    this.prototype = Building(game, x, y, resource)
    this.agentNum = 0;
    this.agentRate = 5;
}

Home.prototype.setAgentNum = function (num) {   
    this.agentNum = num;    
}

Home.prototype.emit = function(){
    var agent = new Agent(this.x + 30, this.y, 3, 0, 1);
}

Home.prototype.doTick = function(time) {
    var time = new Date();
    if (((time/1000 - this.lastWavesSentTime / 1000) > this.agentRate) && (this.agentNum >0)) {
        this.emit();
        this.lastWavesSentTime = time;
        this.agentNum --;
    }
}


