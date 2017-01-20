Mosque = function(game, x, y, resource) {
	this.type = "Mosque";
	Building.call(this, game, x, y, resource);
};

Mosque.prototype = Object.create(Building.prototype);
Mosque.prototype.constructor = Mosque;

Mosque.prototype.sendWaves = function() {
	console.log("MOSQUE SENDING WAVES");
	var smallWave = this.game.make.sprite(this.width/2, 0, "mosque_wave_small");
	var bigWave = this.game.make.sprite(this.width/2, 0, "mosque_wave_big");
    smallWave.anchor.setTo(0.5, 0.5);
    smallWave.scale.setTo(0.0, 0.0);
    this.addChild(smallWave);
    var tween = this.game.add.tween(smallWave.scale);
    tween.to({ x: 1.0, y: 1.0 }, 100);
    tween.start();
};



