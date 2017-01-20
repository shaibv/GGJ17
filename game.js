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

    var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

    function preload() {
        var assets = gameLevelObj.getAssetsToLoad();
        for (var i=0; i<assets.length; i++){
            game.load.image(assets[i], "assets/"+assets[i]+".png");
        }

        game.load.image('logo', 'phaser.png');

        game.load.image('mosque', 'assets/mosque.png');

        game.load.image('synagogue', 'assets/synagogue.png');

        game.load.image('church', 'assets/church.png');

        game.load.image('block', 'assets/blue_tile.png');
    }


    function update() {
        
        updateBuldings();
        drawBoard(gameLevel);


    }

    function create() {

        createBuildings(); //temp function
        drawBoard(gameLevel);

    }

    function drawBoard(board) {
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            for (var j = 0; j < row.length; j++) {
                var tileType = row[j];
                var x = j* gameOptions.tileSize;
                var y = (i+1)* gameOptions.tileSize;
                var assetName;
                if (tileType == 0){
                    assetName = "block";
                }
                else {
                    tileType = tileType-1;
                    assetName = gameLevelObj.getAssetNameById(tileType.toString());
                    var sprite = game.add.sprite(x, y, assetName);
                    sprite.anchor.setTo(0, 1);

                }



            }

        }
    }

    function tileToLoc(j , i) {
        return [j* gameOptions.tileSize, i* gameOptions.tileSize ]
    }

    function locToTile(x, y) {
        return[x / gameOptions.tileSize, y / gameOptions.tileSize]
    }


    function createBuildings() {
        this.mosques = [];
        this.churches = [];
        this.synagogues = [];
        //this.mosques.push(new Mosque(game, 100, 100, "mosque"));
    }

    function updateBuldings() {
        var buildings = this.mosques.concat(this.churches).concat(synagogues);
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            building.doTick(new Date());
        }
    }

};
