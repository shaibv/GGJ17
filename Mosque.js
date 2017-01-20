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
	bigWave.anchor.setTo(0.5, 0.5);
	smallWave.anchor.setTo(0.5, 0.5);

    var bigWaveAnim = this.createWaveAnimation(bigWave);
    var smallWaveAnim = this.createWaveAnimation(smallWave);
    bigWaveAnim.start();
    setInterval(function() {
    	smallWaveAnim.start();
    }, 160);
    var sound = game.add.audio('mosque_sound1');
    sound.play();
};

Mosque.prototype.createWaveAnimation = function(waveEntity) {
	waveEntity.scale.setTo(0.0, 0.0);
	this.addChild(waveEntity);
	var anim = this.game.add.tween(waveEntity.scale);
	anim.to({ x: 1.0, y: 1.0 }, 1000);
	var loopCount = 3;
	var mosque = this;

	var animationStarted = function() {
    	waveEntity.scale.setTo(0.0, 0.0);
    };
	var animationStopped = function() {
    	mosque.removeChild(waveEntity);
    };
    var animationLooped = function() {
    	loopCount = Math.max(0, loopCount - 1);
    	if (loopCount == 0) {
    		anim.loop = false;
    	}
    }
    anim.onStart.add(animationStarted, this);
    anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);
    anim.loop = true;
    return anim;


}



