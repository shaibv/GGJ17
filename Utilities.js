/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    maxRoad: 21,
    minRoad: 12,

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

    locToTile: function (x, y, returnNullIfOut) {
        if (x < 0){
            if (returnNullIfOut) {
                return null;
            }
            x = 0;
        }
        if (x > gameOptions.gameWidth) {
            if (returnNullIfOut) {
                return null;
            }
            x = gameOptions.gameWidth;
        }
        if (y < 0) {
            if (returnNullIfOut) {
                return null;
            }
            y = 0;
        }
        if (y > gameOptions.gameHeight) {
            if (returnNullIfOut) {
                return null;
            }
            y = gameOptions.gameHeight;
        }
        return {'col': Math.floor(x / gameOptions.tileSize), 'row': Math.floor(y / gameOptions.tileSize)};
    },

    getAdjacentRoads: function (road) {
        var adjacentTiles = [
            [road.col, road.row - 1],
            [road.col, road.row + 1],
            [road.col - 1, road.row],
            [road.col + 1, road.row]
        ];
        var roadsTiles = adjacentTiles.filter(function (roadTile) {
            var col = roadTile[0];
            var row = roadTile[1];
            var value =  CompletedData[row] ? CompletedData[row][col] : 0;
            return value >= Utils.minRoad && value <= Utils.maxRoad;
        });

        var roads = roadsTiles.map(function(tile){
            return this.game.getEntityFromTile('road',tile[1],tile[0]);
        });

        return roads;

    },

    randomInt: function(from, to) {
        return Math.random() * (to - from) + from;
    },

    getRoadPossibilities: function(tile){
        var entity = getEntityFromTile('road',tile.row,tile.col);
        if (!entity){
            return [1,1,1,1];
        }
        return entity.getDirection();
    }


}