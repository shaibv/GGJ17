/**
 * Created by adi on 1/20/2017.
 */
function locToTile(j , i) {
    return [j* gameOptions.tileSize, i* gameOptions.tileSize ];
}

function tileToLoc(x, y) {
    return[x / gameOptions.tileSize, y / gameOptions.tileSize];
}