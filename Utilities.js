/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    locToTile : function(j , i) {
        var x = j* gameOptions.tileSize;
        var y = i* gameOptions.tileSize;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return [x, y ];
    },

    tileToLoc : function (x, y) {
        return[Math.floor( x / gameOptions.tileSize) , Math.floor( y / gameOptions.tileSize)];
    }
}