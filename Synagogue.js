Synagogue = function(game, x, y, resource) {
	this.lastWavesSentTime = 0;
};

Synagogue.prototype = Object.create(Building.prototype);
Synagogue.prototype.constructor = Mosque;

Synagogue.prototype.sendWaves = function() {
	console.log("SYNAGOGUE SENDING WAVES");
};


Synagogue.prototype.doTick = function(time) {
	var time = new Date();
	var delta = Math.round(Math.random()*3) + 1
	if ((time/1000 - this.lastWavesSentTime / 1000) > delta) {
		this.sendWaves();
		this.lastWavesSentTime = time;
	}
};
