Timer = function(game, x, y, resource, totalTime) {
	this.type = "Timer";
	ImageEntity.call(this, game, x, y, "timer_frame");
	
	this.totalTime = totalTime;
	this.currentTime = totalTime;
	
	var style = {font: "16pt Arial", fill: "#C0EAFF", align: "center"};
	var dotdot = game.add.text(0, -12, ":", style);
    this.minsText = game.add.text(-32, -12, "02", style);
    this.secText = game.add.text(13, -12, "13", style);

    this.addChild(dotdot);
    this.addChild(this.minsText);
    this.addChild(this.secText);
};

Timer.prototype = Object.create(ImageEntity.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.updateTime = function(time) {
	var minutes = time / 60;
	var seconds = time % 60;

}