/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    tileToLoc : function(i , j) {
        if (i < 0)
            i = 0;
        if (i > gameOptions.gameWidth / gameOptions.tileSize)
            i = gameOptions.gameWidth;
        if (j < 0)
            j = 0;
        if (j > gameOptions.gameHeight / gameOptions.tileSize)
            j = gameOptions.gameHeight;
        var x = i* gameOptions.tileSize;
        var y = j* gameOptions.tileSize;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return {'x': x, 'y': y};
    },

    locToTile : function (x, y) {
        return {'i' : Math.floor( x / gameOptions.tileSize) , 'j': Math.floor( y / gameOptions.tileSize)};
    }
}