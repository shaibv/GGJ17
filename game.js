/**
 * Created by shaibenvalid on 1/20/17.
 */

var gameOptions = {
    gameWidth: 960,    // game width, in pixels
    gameHeight: 480,   // game height, in pixels
    tileSize: 60,     // tile size, in pixels
    colors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00] // tile colors
};

var gameLevelObj = new GameLevel();

var gameLevelData = gameLevelObj.getData();
var gameLevelParams = gameLevelObj.getParams();
var CompletedData;

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
    var gameContext = this;
    this.game.getEntityFromTile = getEntityFromTile;
    
    this.game.waitingToStart = true;
    this.game.gameStarted = false;
    this.game.gameEnded = false;

    this.game.levelState = {
        emittedAgents: 0,
        lostAgents: 0,
        convertedAgents: 0
    };

    function resetGame() {
        if (!this.game.gameStarted) {
            return;
        }
        this.game.gameEnded = true;
        this.game.timer.currentTime = {
            minutes: gameLevelParams.time.minutes,
            seconds: gameLevelParams.time.seconds
        }
        this.game.levelState = {
            emittedAgents: 0,
            lostAgents: 0,
            convertedAgents: 0
        };
        var buildings = mosques;
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            building.died = true;
            building.destroy();
        }
        for (var i = 0; i < agents.length; i++) {
            agents[i].died = true;
            agents[i].destroy();
        }

        agents = [];
        mosques = [];

        bankFactoryContext.kill();
        bankFactoryContext.initBanks(this.game, CompletedData);

        if (this.game.endSprite) {
            this.game.endSprite.alpha = 0;
            this.game.endSprite.destroy();
        }
        if (this.game.endMusic) {
            this.game.endMusic.stop();
        }
        this.game.gameEnded = false;

    }

    function update() {
        if (this.game.waitingToStart) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.music.stop();
                this.game.initialDialog.kill();
                this.game.waitingToStart = false;
                this.game.gameStarted = true;
                this.game.timer.start();
            }
        } else {
            if (!this.game.gameEnded) {
                updateBuldings();
                updateAgents();
                updateCounters();
                checkIfGameEnded();
            }
        }
    }

    function checkIfGameEnded() {
        var totalAgentNumber = gameLevelParams.totalAgentNumber;
        var convertTarget = gameLevelParams.convertTarget;
        var lostAgents = this.game.levelState.lostAgents;
        var convertedAgents = this.game.levelState.convertedAgents;
        if (this.game.timer.isTimeOver() || lostAgents > totalAgentNumber - convertTarget) {
            endGameAsLose();
        }
        if (convertedAgents > convertTarget) {
            endGameAsWin();
        }
    }
    ;

    function endGameAsLose() {
        this.game.gameEnded = true;
        this.game.endSprite = this.game.add.sprite(240, 150, 'you_lost');
        this.game.endMusic = this.game.add.audio('end_sound',1,true);
        this.game.endMusic.play('',0,1,true);
    };

    function endGameAsWin() {
        this.game.gameEnded = true;
        this.game.endSprite = this.game.add.sprite(240, 150, 'you_won');
        this.game.endMusic = this.game.add.audio('end_sound',1,true);
        this.game.endMusic.play('',0,1,true);
    };

    function create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.sprite(0, 0, 'background');


        this.music = this.add.audio('intro_sound',1,true);
        this.music.play('',0,1,true);


        CompletedData = gameLevelObj.getCompleteData();
        drawBoard(CompletedData);
        BankFactory.init(this.game, CompletedData);
        ExitFactory.init(this.game);
        createAgents();

        this.game.initialDialog = new ImageEntity(this.game, 480, 300, "initial_dialog");
        this.game.add.existing(this.game.initialDialog);

        this.game.timer = new Timer(this.game, 892, 578, {
            minutes: gameLevelParams.time.minutes,
            seconds: gameLevelParams.time.seconds
        });
        this.game.add.existing(this.game.timer);

        var style = {font: "16pt Arial", fill: "#C0EAFF", align: "center"};
        game.add.text(440, 565, "Emitted", style);
        game.add.text(320, 565, "Converted", style);
        game.add.text(250, 565, "Lost", style);

        this.game.emittedAgentsText = game.add.text(470, 540, String(this.game.levelState.emittedAgents), style);
        this.game.convertedAgentsText = game.add.text(370, 540, String(this.game.levelState.convertedAgents), style);
        this.game.lostAgentsText = game.add.text(270, 540, String(this.game.levelState.lostAgents), style);

        game.add.button(game.world.centerX + 385, 470, 'reset', resetGame, this, 2, 1, 0);
    }


    function drawBoard(board) {
        for (var i = 0; i < board.length; i++) {
            var row = board[i];
            for (var j = 0; j < row.length; j++) {
                var tileType = row[j];
                var x = j * gameOptions.tileSize;
                var y = (i + 1) * gameOptions.tileSize;
                if (tileType == 0 || tileType ==-1) {
                    if (tileType ==0){
                        var assetName = 'block';
                        var sprite = this.game.add.sprite(x, y, assetName);
                        sprite.anchor.set(0, 1);
                    }
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
                                entity = new Road(this.game, x, y, assetName, i, j);
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
        // var agent = new Agent(this.game, 300 + 30, 10, 2, 0, 1);
        // this.game.add.existing(agent);
        // agents.push(agent);
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
            agents[i].doTick();
        }

    }

    function updateCounters() {
        this.game.emittedAgentsText.setText(String(this.game.levelState.emittedAgents));
        this.game.convertedAgentsText.setText(String(this.game.levelState.convertedAgents));   
        this.game.lostAgentsText.setText(String(this.game.levelState.lostAgents));   
    }

};

function getEntityFromTile(type, row, col) {
    var collection = [];
    if (type == 'road') {
        collection = roads;
    }
    if (type == 'mosque') {
        collection = mosques;
    }
    if (type == 'agent') {
        collection = agents;
    }
    for (var i = 0; i < collection.length; i++) {
        var entity = collection[i];
        if (entity.row == row && entity.col == col) {
            return entity;
        }
    }
    return null;
}
