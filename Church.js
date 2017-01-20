Church = function(game, x, y, resource) {
	this.lastWavesSentTime = 0;
};

Church.prototype = Object.create(Building.prototype);
Church.prototype.constructor = Mosque;

Church.prototype.sendWaves = function() {
	console.log("CHURCH SENDING WAVES");
};


Church.prototype.doTick = function(time) {
	var time = new Date();
	var delta = Math.round(Math.random()*3) + 1
	if ((time/1000 - this.lastWavesSentTime / 1000) > delta) {
		this.sendWaves();
		this.lastWavesSentTime = time;
	}
};
