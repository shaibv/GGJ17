/**
 * Created by shaibenvalid on 1/20/17.
 */

var BankFactory = {
    init: initBanks,


}

function kill() {
    for(var draggable in draggables) {
         draggables[draggable].destroy();
    }
}

function initBanks(game, gameBoard) {
    var gameLevel = gameBoard;
    this.game = game;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    initDraggable(10, 500, 'button_big', 1);
    initDraggable(100, 500, 'button_small', 1);

    function dragStart(currentSprite, type) {
        if (draggableBankCounter[type]) {
            var sound = game.add.audio('drop');
            sound.play();
            var res = type == "button_big" ? "mosque2" : "mosque1";
            currentSprite.loadTexture(res, 0);
            initDraggable(currentSprite.x, currentSprite.y, type, draggableBankCounter[type]);
            currentSprite.bringToTop();
            currentSprite.anchor.setTo()
        } else {

        }
    }

    function initDraggable(x, y, type, quantity) {
        console.log('quantity:' + quantity);
        draggableBankCounter[type] = quantity;
        var draggable = game.add.sprite(x, y, type);
        bankFactoryContext.game.physics.arcade.enable(draggable);
        draggable.inputEnabled = true;
        draggable.input.enableDrag();
        draggable.originalPosition = draggable.position.clone();
        draggable.events.onDragStop.add(function (currentSprite) {
            stopDrag(currentSprite, draggable, type);
        }, this);
        draggable.events.onDragStart.add(function (currentSprite) {

            dragStart(currentSprite, type);
        }, this);
        draggables[type] = draggable;



    }

    function stopDrag(currentSprite, endSprite, type) {
        console.log('drag stop');
        //check legal drop here
        if (!bankFactoryContext.game.physics.arcade.overlap(currentSprite, endSprite) && checkDrop(currentSprite)) {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(endSprite.position);
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
            snapDrop(currentSprite);
            draggableBankCounter[type]--;
            if(!draggableBankCounter[type]){
                draggables[type].alpha = 0.5;
                draggables[type].inputEnabled = false;
                draggables[type].input.disableDrag();
            }
        } else {

            currentSprite.destroy()
        }
    }

    function checkDrop(sprite) {
        console.log('Cant Drop Here');
        var xPos = Math.round(sprite.x / gameOptions.tileSize) * gameOptions.tileSize;
        var yPos = Math.round(sprite.y / gameOptions.tileSize) * gameOptions.tileSize;
        var cell = Utils.locToTile(xPos, yPos + gameOptions.tileSize);
        var cellContent = gameLevel[cell.row] ? gameLevel[cell.row][cell.col] : -1;
        return cellContent === 0;

    }

    function snapDrop(sprite) {
        var xPos = Math.round(sprite.x / gameOptions.tileSize) * gameOptions.tileSize;
        var yPos = Math.round(sprite.y / gameOptions.tileSize) * gameOptions.tileSize;
        var cell = Utils.locToTile(xPos, yPos + 2 * gameOptions.tileSize);
        var fixedPosition = Utils.tileToLoc(cell.col, cell.row);
        sprite.x = fixedPosition.x;
        sprite.y = fixedPosition.y;
        var mosque = new Mosque(this.game, fixedPosition.x, fixedPosition.y, sprite.key);
        mosque.anchor.set(0, 1);
        mosques.push(mosque);
        game.add.existing(mosque);
        var sound = game.add.audio('drop');
        sound.play();
        sprite.kill();

    }


}


var draggables = {};
var draggableBankCounter = {};
var bankFactoryContext = this;

