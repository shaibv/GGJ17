/**
 * Created by shaibenvalid on 1/20/17.
 */

var bankFactory = {
    init: init
}


var draggableBankCounter = {};
var bankFactory  = this;

function init(game, gameBoard) {
    this.gameLevel = gameBoard;
    this.game = game;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    initDraggable(0, 500, 'synagogue', 5);

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
        bankFactory.game.physics.arcade.enable(draggable);
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
        //check legal drop here
        if (!bankFactory.game.physics.arcade.overlap(currentSprite, endSprite)&&checkDrop(currentSprite)) {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(endSprite.position);
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
            snapDrop(currentSprite);
            draggableBankCounter[type]--;
        }else{
            currentSprite.destroy()
        }
    }

    function checkDrop(sprite) {
        console.log('Cant Drop Here');
        var cell = Utils.locToTile(sprite.x, sprite.y);
        var cellContent = bankFactory.gameLevel[cell.row]? bankFactory.gameLevel[cell.row][ cell.col] : -1;
        return cellContent === 0;

    }

    function snapDrop(sprite) {
        var cell = Utils.locToTile(sprite.x, sprite.y);
        var fixedPosition = Utils.tileToLoc(cell.col, cell.row);
        sprite.x = fixedPosition.x;
        sprite.y = fixedPosition.y;

    }


}
