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

Home.prototype.sendWaves(){
    var agent = new Agent(this.x, this.y, 3);
}

Home.prototype.doTick = function(time) {
    var time = new Date();
    if (((time/1000 - this.lastWavesSentTime / 1000) > this.agentRate)) && this.agentNum >0) {
        this.sendWaves();
        this.lastWavesSentTime = time;
        this.agentNum --;
    }
}
