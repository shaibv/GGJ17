Mosque = function(game, x, y, resource) {
	this.type = "Mosque";
	Building.call(this, game, x, y, resource);
};

Mosque.prototype = Object.create(Building.prototype);
Mosque.prototype.constructor = Mosque;

Mosque.prototype.sendWaves = function() {
	console.log("MOSQUE SENDING WAVES");
};



