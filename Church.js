Church = function(game, x, y, resource) {
	this.type = "Church";
	Building.call(this, game, x, y, resource);
};

Church.prototype = Object.create(Building.prototype);
Church.prototype.constructor = Mosque;

Church.prototype.sendWaves = function() {
	console.log("CHURCH SENDING WAVES");
};

