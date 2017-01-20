/**
 * Created by shaibenvalid on 1/20/17.
 */

var gameOptions = {
    gameWidth: 960,    // game width, in pixels
    gameHeight: 600,   // game height, in pixels
    tileSize: 60,     // tile size, in pixels
    colors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00] // tile colors
}

var gameLevelObj = new GameLevel();

var gameLevel = gameLevelObj.getData();

window.onload = function () {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    this.game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: PreLoader.preload, create: create, update: update});

    function update() {

        updateBuldings();
        //drawBoard(gameLevel);


    }

    function create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        createBuildings(); //temp function
        drawBoard(gameLevel);
        bankFactory.init(this.game);
    }


    function drawBoard(board) {
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            for (var j = 0; j < row.length; j++) {
                var tileType = row[j];
                var x = j * gameOptions.tileSize;
                var y = (i+1) * gameOptions.tileSize;
                if (tileType == 0) {
                    var assetName = 'block';
                }
                else {
                    tileType = tileType -1;
                    var assetName = gameLevelObj.getAssetNameById(tileType);
                    var sprite = this.game.add.sprite(x, y, assetName);
                    sprite.anchor.set(0,1);
                }


            }
        }

    }

    function createBuildings() {
        this.mosques = [];
        this.churches = [];
        this.synagogues = [];
        this.mosques.push(new Mosque(game, 100, 100, "mosque"));
    }

    function updateBuldings() {
        var buildings = this.mosques.concat(this.churches).concat(this.synagogues);
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            building.doTick(new Date());
        }
    }
    

};
