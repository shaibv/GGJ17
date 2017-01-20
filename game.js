/**
 * Created by shaibenvalid on 1/20/17.
 */

var gameOptions = {
    gameWidth: 960,    // game width, in pixels
    gameHeight: 600,   // game height, in pixels
    tileSize: 60,     // tile size, in pixels
    colors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00] // tile colors
}

var gameLevel = [
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0]
]

window.onload = function () {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    this.game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

    function preload() {

        this.game.load.image('logo', 'phaser.png');

        this.game.load.image('mosque', 'assets/mosque.png');

        this.game.load.image('synagogue', 'assets/synagogue.png');

        this.game.load.image('church', 'assets/church.png');

        game.load.image('block', 'assets/blue_tile.png');

        game.load.image('mosque_wave_small', 'assets/mosque_wave_small.png');

        game.load.image('mosque_wave_big', 'assets/mosque_wave_big.png');
    }


    function update() {

        updateBuldings();
        //drawBoard(gameLevel);


    }

    function create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        createBuildings(); //temp function
        drawBoard(gameLevel);
        var draggable = game.add.sprite(0, 0, 'synagogue');
        this.game.physics.arcade.enable(draggable);
        draggable.inputEnabled = true;
        draggable.input.enableDrag();
        draggable.originalPosition = draggable.position.clone();
        draggable.events.onDragStop.add(function (currentSprite) {
            stopDrag(currentSprite, draggable);
        }, this);
        draggable.events.onDragStart.add(function (currentSprite) {

        }, this);

    }

    function drawBoard(board) {
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            for (var j = 0; j < row.length; j++) {
                var tileType = row[j];
                var x = j * gameOptions.tileSize;
                var y = i * gameOptions.tileSize;
                var assetName = 'block';
                if (tileType == 1) {
                    assetName = 'mosque';

                }
                var sprite = this.game.add.sprite(x, y, assetName);

            }
        }


    }

    function stopDrag(currentSprite, endSprite) {
        console.log('drag stop');
        debugger;
        if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function () {
                currentSprite.input.draggable = false;
                currentSprite.position.copyFrom(endSprite.position);
                currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
            })) {

            //currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
    }


    function createBuildings() {
        this.mosques = [];
        this.churches = [];
        this.synagogues = [];
        this.mosques.push(new Mosque(game, 100, 100, "mosque"));
    }

    function updateBuldings() {
        var buildings = this.mosques.concat(this.churches).concat(synagogues);
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            building.doTick(new Date());
        }
    }

};
