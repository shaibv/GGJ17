var PreLoader = {
    preload: function() {

        var game = window.game;

        game.load.image('logo', 'phaser.png');
        
        game.load.image('mosque', 'assets/mosque.png');
        game.load.image('synagogue', 'assets/synagogue.png');
        game.load.image('church', 'assets/church.png');
        game.load.image('block', 'assets/blue_tile.png');
        game.load.image('mosque_wave_small', 'assets/mosque_wave_small.png');
        game.load.image('mosque_wave_big', 'assets/mosque_wave_big.png');
        
        game.load.audio('mosque_sound1', ['assets/mosque_sound1.mp3']);

        var assetsToLoad = gameLevelObj.getAssetsToLoad();
        for (var i=0; i<assetsToLoad.length; i++){
            game.load.image(assetsToLoad[i], "assets/"+assetsToLoad[i]+".png");
        }
    }
}