Building = function(game, x, y, resource, scale) {
    Phaser.Sprite.call(this, game, x, y, resource);
    this.anchor.setTo(0.5, 0.5);
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building;

Building.prototype.doTick = function() {

};