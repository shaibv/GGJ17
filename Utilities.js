/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    tileToLoc: function (col, row) {
        if (col < 0)
            col = 0;
        if (col > gameOptions.gameWidth / gameOptions.tileSize)
            col = gameOptions.gameWidth;
        if (row < 0)
            row = 0;
        if (row > gameOptions.gameHeight / gameOptions.tileSize)
            row = gameOptions.gameHeight;
        var x = col * gameOptions.tileSize;
        var y = row * gameOptions.tileSize;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return {'x': x, 'y': y};
    },

    locToTile: function (x, y) {
        if (x < 0)
            x = 0;
        if (x > gameOptions.gameWidth)
            x = gameOptions.gameWidth;
        if (y < 0)
            y = 0;
        if (y > gameOptions.gameHeight)
            y = gameOptions.gameHeight;
        return {'col': Math.floor(x / gameOptions.tileSize), 'row': Math.floor(y / gameOptions.tileSize)};
    }
}