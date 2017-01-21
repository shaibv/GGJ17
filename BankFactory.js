/**
 * Created by shaibenvalid on 1/20/17.
 */

var BankFactory = {
    init: initBanks,


}

function initBanks(game, gameBoard) {
    var gameLevel = gameBoard;
    this.game = game;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    initDraggable(0, 480, 'mosque2', 1);
    initDraggable(140, 480, 'mosque1', 1);

    function dragStart(currentSprite, type) {
        if (draggableBankCounter[type]) {
            var sound = game.add.audio('drop');
            sound.play();
            initDraggable(currentSprite.x, currentSprite.y, type, draggableBankCounter[type]);
        } else {
            currentSprite.alpha = 0.5;
            currentSprite.inputEnabled = false;
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

    }

    function stopDrag(currentSprite, endSprite, type) {
        console.log('drag stop');
        //check legal drop here
        if (!bankFactoryContext.game.physics.arcade.overlap(currentSprite, endSprite)&&checkDrop(currentSprite)) {
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
        var xPos = Math.round(sprite.x/gameOptions.tileSize) * gameOptions.tileSize ;
        var yPos = Math.round(sprite.y/gameOptions.tileSize) * gameOptions.tileSize;
        var cell = Utils.locToTile(xPos, yPos + gameOptions.tileSize);
        var cellContent = gameLevel[cell.row]? gameLevel[cell.row][ cell.col] : -1;
        return cellContent === 0;

    }

    function snapDrop(sprite) {
        var xPos = Math.round(sprite.x/gameOptions.tileSize) * gameOptions.tileSize ;
        var yPos = Math.round(sprite.y/gameOptions.tileSize) * gameOptions.tileSize;
        var cell = Utils.locToTile(xPos, yPos +  2 * gameOptions.tileSize);
        var fixedPosition = Utils.tileToLoc(cell.col, cell.row);
        sprite.x = fixedPosition.x ;
        sprite.y = fixedPosition.y ;
        var mosque = new Mosque(this.game, fixedPosition.x, fixedPosition.y, sprite.key);
        mosque.anchor.set(0, 1);
        mosques.push(mosque);
        game.add.existing(mosque);
        var sound = game.add.audio('drop');
        sound.play();
        sprite.kill();

    }


}


var draggableBankCounter = {};
var bankFactoryContext  = this;

