Obsticle = function(game, x, y, resource) {
	this.type = "Obsticle";
	ImageEntity.call(this, game, x, y, resource);
};

Obsticle.prototype = Object.create(ImageEntity.prototype);
Obsticle.prototype.constructor = Obsticle;