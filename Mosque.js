
Mosque = function(game, x, y, resource) {
	this.lastWavesSentTime = 0;
};

Mosque.prototype = Object.create(Building.prototype);
Mosque.prototype.constructor = Mosque;

Mosque.prototype.sendWaves = function() {
	console.log("SENDING WAVES");
};


Mosque.prototype.doTick = function(time) {
	var time = new Date();
	var delta = Math.round(Math.random()*3) + 1
	if ((time/1000 - this.lastWavesSentTime / 1000) > delta) {
		this.sendWaves();
		this.lastWavesSentTime = time;
	}
};



