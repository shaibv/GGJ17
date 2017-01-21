Timer = function(game, x, y, totalTime) {
	this.type = "Timer";
	this.innerTimer = game.time.create(false);
	ImageEntity.call(this, game, x, y, "timer_frame");
	
	this.totalTime = totalTime;
	this.currentTime = {
		minutes: totalTime.minutes,
		seconds: totalTime.seconds,
	}
	
	var style = {font: "16pt Arial", fill: "#C0EAFF", align: "center"};
	var dotdot = game.add.text(0, -12, ":", style);
    this.minsText = game.add.text(-32, -12, String(this.currentTime.minutes), style);
    this.secText = game.add.text(13, -12, String(this.currentTime.seconds), style);

    this.addChild(dotdot);
    this.addChild(this.minsText);
    this.addChild(this.secText);
};

Timer.prototype = Object.create(ImageEntity.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.getCurrentTime = function() {
	return this.currentTime;
};

Timer.prototype.isTimeOver = function() {
	return this.currentTime.minutes <= 0 && this.currentTime.seconds <= 0;
};

Timer.prototype.updateTime = function(time) {
	this.currentTime.minutes = Math.max(0, time.minutes);
	this.currentTime.seconds = Math.max(0, time.seconds);
};

Timer.prototype.start = function() {
	var timer = this;
	setInterval(function() {
		if (timer.currentTime.minutes > 0 && timer.currentTime.seconds > 0) {
			timer.currentTime.seconds--;
			if (timer.currentTime.seconds == 0) {
				timer.currentTime.minutes--;
				if (timer.currentTime.minutes >= 0) {
					timer.currentTime.seconds = 59;
				}
			}
		}
		timer.update();

	}, 1000);
};

Timer.prototype.update = function() {
	this.minsText.setText(String(this.currentTime.minutes));
	this.secText.setText(String(this.currentTime.seconds));
};