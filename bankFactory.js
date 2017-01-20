/**
 * Created by shaibenvalid on 1/20/17.
 */

var bankFactory = {
    init: init
}


var draggableBankCounter = {};

function init(game) {
    this.game = game;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    initDraggable(0, 500, 'synagogue', 2);


    function dragStart(currentSprite, type) {
        if (draggableBankCounter[type]) {
            initDraggable(currentSprite.x, currentSprite.y, type, draggableBankCounter[type]);
        } else {
            currentSprite.inputEnabled = false;
        }
    }

    function initDraggable(x, y, type, quantity) {
        console.log('quantity:' + quantity);
        draggableBankCounter[type] = quantity;
        var draggable = game.add.sprite(x, y, type);
        this.game.physics.arcade.enable(draggable);
        draggable.inputEnabled = true;
        draggable.input.enableDrag();
        draggable.originalPosition = draggable.position.clone();
        draggable.events.onDragStop.add(function (currentSprite) {
            stopDrag(currentSprite, draggable, type);
        }, this);
        draggable.events.onDragStart.add(function (currentSprite) {

            dragStart(currentSprite, type);
        }, this);

    }

    function stopDrag(currentSprite, endSprite, type) {
        console.log('drag stop');
        //if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function () {
        currentSprite.input.draggable = false;
        currentSprite.position.copyFrom(endSprite.position);
        currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
        draggableBankCounter[type]--;


        //})) {
        //check legal drop here


    }

};
