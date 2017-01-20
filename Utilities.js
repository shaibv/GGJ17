/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    locToTile : function(i , j) {
        var x = i* gameOptions.tileSize;
        var y = j* gameOptions.tileSize;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return {'x': x, 'y': y};
    },

    tileToLoc : function (x, y) {
        return {'i' : Math.floor( x / gameOptions.tileSize) , 'j': Math.floor( y / gameOptions.tileSize)};
    }
} 