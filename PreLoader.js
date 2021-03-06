var PreLoader = {
    preload: function() {

        var game = window.game;

        game.load.image('background', 'assets/background.png');
        game.load.image('reset', 'assets/reset.png');
        game.load.image('aura', 'assets/person_aura.png');

        game.load.image('initial_dialog', 'assets/initial_dialog.png');
        game.load.image('timer_frame', 'assets/timer_frame.png');
        game.load.image('you_won', 'assets/you_won.png');
        game.load.image('you_lost', 'assets/you_lost.png');
        
        game.load.image('mosque', 'assets/mosque.png');
        game.load.image('button_big', 'assets/button_big.png');
        game.load.image('button_small', 'assets/button_small.png');
        game.load.image('synagogue', 'assets/synagogue.png');
        game.load.image('church', 'assets/church.png');
        game.load.image('block', 'assets/black_tile.png');
        game.load.image('mosque_wave_small', 'assets/mosque_wave_small.png');
        game.load.image('mosque_wave_big', 'assets/mosque_wave_big.png');
        game.load.image('agent_front', 'assets/person_20_front.png');
        game.load.image('agent_back', 'assets/person_20_back.png');
        game.load.image('agent_left', 'assets/person_20_left.png');
        game.load.image('agent_right', 'assets/person_20_right.png');

        game.load.audio('mosque_sound1', ['assets/Moazin.mp3']);
        game.load.audio('intro_sound', ['assets/intro_sound.mp3']);
        game.load.audio('end_sound', ['assets/endscreen.mp3']);
        game.load.audio('drop', ['assets/drop.mp3']);
        game.load.audio('click', ['assets/click.mp3']);
        game.load.audio('giggle', ['assets/giggle1.mp3']);
        game.load.audio('holy_sound', ['assets/holy_sound.mp3']);

        var assetsToLoad = gameLevelObj.getAssetsToLoad();
        for (var i=0; i<assetsToLoad.length; i++){
            game.load.image(assetsToLoad[i], "assets/"+assetsToLoad[i]+".png");
        }
    }
}