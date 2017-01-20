Building = function(game, x, y, resource) {
    Phaser.Sprite.call(this, game, x, y, resource);
    this.anchor.setTo(0.5, 0.5);

    this.lastWavesSentTime = 0;
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building;

Building.prototype.doTick = function(time) {
	var time = new Date();
	var delta = Math.round(Math.random()*11) + 1
	if ((time/1000 - this.lastWavesSentTime / 1000) > delta) {
		this.emit();
		this.lastWavesSentTime = time;
	}
};