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

var agents = [];

window.onload = function () {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    this.game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: PreLoader.preload, create: create, update: update});

    function update() {
        updateBuldings();
        updateAgents();
    }

    function create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        createBuildings(); //temp function
        drawBoard(gameLevel);
        gameLevelObj.completeData();
        bankFactory.init(this.game);
        createAgents();

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
                    var tileObject = gameLevelObj.getObjectTypeByTileType(tileType+1);
                    var entity =null;
                    if (tileObject) { //TODO: fix this
                        switch (tileObject) {
                            case "Obsticle":
                                entity = new Obsticle(this.game, x, y, assetName, agents);
                                break;
                            case "House":
                                entity = new House(this.game, x, y, assetName, agents);
                                break;
                            case "Mosque":
                                entity = new Mosque(this.game, x, y, assetName);
                                break;
                        }
                    }
                    if (entity) {
                        entity.anchor.set(0,1);
                        this.game.add.existing(entity);
                    } else {
                        var sprite = this.game.add.sprite(x, y, assetName);
                        sprite.anchor.set(0,1);
                    }
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

    /*
        TODO: will move to emitter
     */
    function createAgents(){
        var agent = new Agent(this.game, 300 + 30, 10, 0, 2, 1);
        this.game.add.existing(agent);
        agents.push(agent);
    }

    function updateBuldings() {
        var buildings = this.mosques.concat(this.churches).concat(this.synagogues);
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            building.doTick(new Date());
        }
    }

    function updateAgents(){
        for (var i = 0; i<agents.length; i++){
            agents[i].move();
        }

    }
    

};
