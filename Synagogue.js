Synagogue = function(game, x, y, resource) {
	this.type = "Synagogue";
	Building.call(this, game, x, y, resource);
};

Synagogue.prototype = Object.create(Building.prototype);
Synagogue.prototype.constructor = Mosque;

Synagogue.prototype.sendWaves = function() {
	console.log("SYNAGOGUE SENDING WAVES");
};
