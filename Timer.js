Timer = function(game, x, y, resource, totalTime) {
	this.type = "Timer";
	ImageEntity.call(this, game, x, y, "timer_frame");
	
	this.totalTime = totalTime;
	this.currentTime = totalTime;
	
	var style = {font: "16pt Arial", fill: "#C0EAFF", align: "center"};
	game.add.text(0, 0, ":", style);
    var minsText = game.add.text(-25, 0, "02", style);
    var secText = game.add.text(25, 0, "13", style);
};

Timer.prototype = Object.create(ImageEntity.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.updateTime = function(time) {
	var minutes = time / 60;
	var seconds = time % 60;

}