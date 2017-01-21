Timer = function(game, x, y, resource, totalTime) {
	this.type = "Timer";
	this.totalTime = totalTime;
	this.currentTime = totalTime;
	ImageEntity.call(this, game, x, y, resource);
};

Timer.prototype = Timer.create(ImageEntity.prototype);
Timer.prototype.constructor = Timer;