ImageEntity = function(game, x, y, resource) {
    Phaser.Sprite.call(this, game, x, y, resource);
    this.anchor.setTo(0.5, 0.5);
};

ImageEntity.prototype = Object.create(Phaser.Sprite.prototype);
ImageEntity.prototype.constructor = ImageEntity;