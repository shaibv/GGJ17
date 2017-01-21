Mosque = function(game, x, y, resource) {
	this.type = "Mosque";
    this.soundPlayed = false;
	Building.call(this, game, x, y, resource);
};

Mosque.prototype = Object.create(Building.prototype);
Mosque.prototype.constructor = Mosque;

Building.prototype.doTick = function(time) {
    var time = new Date();
    var delta = 1.6;
    if ((time/1000 - this.lastWavesSentTime / 1000) > delta) {
        this.emit();
        this.lastWavesSentTime = time;
    }
};

Mosque.prototype.emit = function() {
	var smallWave = this.game.make.sprite(this.width/2, -this.height/2, "mosque_wave_small");
	var bigWave = this.game.make.sprite(this.width/2, -this.height/2, "mosque_wave_big");
	bigWave.anchor.setTo(0.5, 0.5);
	smallWave.anchor.setTo(0.5, 0.5);

    var bigWaveAnim = this.createWaveAnimation(bigWave);
    var smallWaveAnim = this.createWaveAnimation(smallWave, true);
    bigWaveAnim.start();
    setInterval(function() {
    	smallWaveAnim.start();
    }, 160);
    if (!this.soundPlayed) {
        var sound = game.add.audio('mosque_sound1');
        sound.play();
        this.soundPlayed = true;
    }

};

Mosque.prototype.createWaveAnimation = function(waveEntity, shorter) {
	waveEntity.scale.setTo(0.0, 0.0);
	this.addChild(waveEntity);
	var anim = this.game.add.tween(waveEntity.scale);
    // anim.loop = true;
    var scaleTarget = this.key == "mosque1" ? 0.5 : 1.0;
	anim.to({ x: scaleTarget, y: scaleTarget }, shorter ? 840 : 1000);
	// var loopCount = 1;
	var mosque = this;

	var animationStarted = function() {
    	waveEntity.scale.setTo(0.0, 0.0);
    };
	var animationStopped = function() {
        waveEntity.scale.setTo(0.0, 0.0);
    	mosque.removeChild(waveEntity);
    };
    var animationLooped = function() {
    	loopCount = Math.max(0, loopCount - 1);
    }
    anim.onStart.add(animationStarted, this);
    // anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);
    return anim;


}



