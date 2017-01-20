/**
 * Created by adi on 1/20/2017.
 */
var Utils = {
    locToTile : function(j , i) {
        return [j* gameOptions.tileSize, i* gameOptions.tileSize ];
    },

    tileToLoc : function (x, y) {
        return[x / gameOptions.tileSize, y / gameOptions.tileSize];
    }
}