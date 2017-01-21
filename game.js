/**
 * Created by shaibenvalid on 1/20/17.
 */

var gameOptions = {
    gameWidth: 960,    // game width, in pixels
    gameHeight: 600,   // game height, in pixels
    tileSize: 60,     // tile size, in pixels
    colors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00] // tile colors
};

var gameLevelObj = new GameLevel();

var gameLevelData = gameLevelObj.getData();
var gameLevelParams = gameLevelObj.getParams();

var agents = [];

var obsticles = [];
var houses = [];
var mosques = [];
var roads = [];

window.onload = function () {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    this.game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
        preload: PreLoader.preload,
        create: create,
        update: update
    });

    this.game.waitingToStart = true;

    this.game.levelState = {
        emittedAgents: 0, 
        lostAgents: 0, 
        convertedAgents: 0
    };


    function update() {
        if (this.game.waitingToStart) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.initialDialog.kill();
                this.game.waitingToStart = false;
                this.game.timer.start();
            }
        } else {
            updateBuldings();
            updateAgents();
        }
    }


    function create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        drawBoard(gameLevelData);
        this.gameData = gameLevelObj.getCompleteData();
        bankFactory.init(this.game,this.gameData);
        createAgents();

        this.game.initialDialog = new ImageEntity(this.game, 480, 300, "initial_dialog");
        this.game.add.existing(this.game.initialDialog);

        this.game.timer = new Timer(this.game, 870, 570, {
            minutes: gameLevelParams.time.minutes, 
            seconds: gameLevelParams.time.seconds
        });
        this.game.add.existing(this.game.timer);
    }


    function drawBoard(board) {
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            for (var j = 0; j < row.length; j++) {
                var tileType = row[j];
                var x = j * gameOptions.tileSize;
                var y = (i + 1) * gameOptions.tileSize;
                if (tileType == 0) {
                    var assetName = 'block';
                }
                else {
                    var assetName = gameLevelObj.getAssetNameById(tileType - 1);
                    var tileObject = gameLevelObj.getObjectTypeByTileType(tileType);
                    var entity = null;
                    if (tileObject) { //TODO: fix this
                        switch (tileObject) {
                            case "Obsticle":
                                entity = new Obsticle(this.game, x, y, assetName);
                                obsticles.push(entity);
                                break;
                            case "House":
                                entity = new House(this.game, x, y, assetName, agents);
                                houses.push(entity);
                                break;
                            case "Mosque":
                                entity = new Mosque(this.game, x, y, assetName);
                                mosques.push(entity);
                                break;
                            case "Road":
                                entity = new Road(this.game, x, y, assetName, tileType);
                                roads.push(entity);
                                break;
                        }
                    }
                    if (entity) {
                        entity.anchor.set(0, 1);
                        this.game.add.existing(entity);
                    } else {
                        var sprite = this.game.add.sprite(x, y, assetName);
                        sprite.anchor.set(0, 1);
                    }
                }
            }
        }
    }

    /*
     TODO: will move to emitter
     */
    function createAgents() {
        var agent = new Agent(this.game, 300 + 30, 10, 2, 0, 1);
        this.game.add.existing(agent);
        agents.push(agent);
    }

    function updateBuldings() {
        var buildings = mosques.concat(houses);
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            building.doTick(new Date());
        }
    }

    function updateAgents() {
        for (var i = 0; i < agents.length; i++) {
            agents[i].update();
        }

    }

    function getEntityFromTile(type, row, col) {
        var collection = [];
        if (type == 'road') {
            collection = this.roads;
        }
        if (type == 'mosque') {
            collection = this.mosques;
        }
        if (type == 'agent') {
            collection = this.agents;
        }
        for (var i = 0; i < collection.length; i++) {
            var entity = collection[i];
            if (entity.row == row && entity.col == col) {
                return entity;
            }
        }
        return null;
    }


};
