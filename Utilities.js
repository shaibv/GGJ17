/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    tileToLoc : function(row , col) {
        if (row < 0)
            row = 0;
        if (row > gameOptions.gameWidth / gameOptions.tileSize)
            row = gameOptions.gameWidth;
        if (col < 0)
            col = 0;
        if (col > gameOptions.gameHeight / gameOptions.tileSize)
            col = gameOptions.gameHeight;
        var x = row* gameOptions.tileSize;
        var y = col* gameOptions.tileSize;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return {'x': x, 'y': y};
    },

    locToTile : function (x, y) {
        if (x < 0)
            x = 0;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y < 0)
            y = 0;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return {'row' : Math.floor( x / gameOptions.tileSize) , 'col': Math.floor( y / gameOptions.tileSize)};
    }
}