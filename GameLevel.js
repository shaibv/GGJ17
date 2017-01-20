var TILE_TYPE_TO_OBJECT = {
    3: "Obsitcle",
    4: "House",
    5: "Mosque",
    6: "Mosque",
    7: "Mosque",
    8: "Obsitcle",
    9: "Obsitcle",
    10: "Obsitcle"
}

var data = { "height":8,
    "layers":[
        {
            "data":[0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 21, 0, 8, 0, 0, 0, 4, 4, 0, 0, 10, 0, 0, 4, 4, 4, 21, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 4, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 11, 0, 0, 0, 21, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 18, 15, 15, 15, 9, 0, 0, 0, 0, 0, 0],
            "height":8,
            "name":"Tile Layer 1",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":16,
            "x":0,
            "y":0
        }],
    "nextobjectid":1,
    "orientation":"orthogonal",
    "renderorder":"right-down",
    "tileheight":60,
    "tilesets":[
        {
            "columns":0,
            "firstgid":1,
            "margin":0,
            "name":"buildings",
            "spacing":0,
            "tilecount":18,
            "tileheight":181,
            "tiles":
            {
                "10":
                {
                    "image":"..\/assets\/obsticle4.png"
                },
                "11":
                {
                    "image":"..\/assets\/road_corner_south_east.png"
                },
                "12":
                {
                    "image":"..\/assets\/road_corner_south_west.png"
                },
                "13":
                {
                    "image":"..\/assets\/road_corner_west_north.png"
                },
                "14":
                {
                    "image":"..\/assets\/road_east.png"
                },
                "15":
                {
                    "image":"..\/assets\/road_junction_cross.png"
                },
                "16":
                {
                    "image":"..\/assets\/road_junction_t_east.png"
                },
                "17":
                {
                    "image":"..\/assets\/road_junction_t_north.png"
                },
                "18":
                {
                    "image":"..\/assets\/road_junction_t_south.png"
                },
                "19":
                {
                    "image":"..\/assets\/road_junction_t_west.png"
                },
                "20":
                {
                    "image":"..\/assets\/road_north.png"
                },
                "3":
                {
                    "image":"..\/assets\/house.png"
                },
                "4":
                {
                    "image":"..\/assets\/mosque_small.png"
                },
                "5":
                {
                    "image":"..\/assets\/mosque1.png"
                },
                "6":
                {
                    "image":"..\/assets\/mosque2.png"
                },
                "7":
                {
                    "image":"..\/assets\/obsticle1.png"
                },
                "8":
                {
                    "image":"..\/assets\/obsticle2.png"
                },
                "9":
                {
                    "image":"..\/assets\/obsticle3.png"
                }
            },
            "tilewidth":181
        }],
    "tilewidth":60,
    "version":1,
    "width":16
};

GameLevel = function() {
};

GameLevel.prototype = Object.create(Phaser.Sprite.prototype);
GameLevel.prototype.constructor = GameLevel;

GameLevel.prototype.getData = function() {

    var gameData =  data.layers[0]["data"];

    var convertedData = [];
    for (var i =0; i<data.height; i++){
        var row = [];
        for (var j=0; j<data.width; j++){
            row.push(gameData[i*(data.width)+j]);
        }
        convertedData.push(row);
    }
    return convertedData;
};

GameLevel.prototype.getAssetName = function(assetName){
    return assetName.replace("../assets/", "");
};
GameLevel.prototype.getAssetNameNoExtension = function(assetName){
    var asseetNameWithExtension = assetName.replace("../assets/", "");
    return asseetNameWithExtension.replace(".png","");
};

GameLevel.prototype.getAssetNameById = function(id){
    var tilesets = data.tilesets[0];
    var specificTile = tilesets.tiles[id];
    if (!specificTile){
        console.log(id);
    }
    var image = specificTile.image;
    return this.getAssetNameNoExtension(image);
};

GameLevel.prototype.getObjectTypeByTileType = function(tileType) {
    return TILE_TYPE_TO_OBJECT[tileType];
};

GameLevel.prototype.getAssetsToLoad = function(){
    var assetsToLoad = [];
    var tilesets = data.tilesets[0];
    var tiles = tilesets.tiles;
    for (var tile in tiles) {
        if (tiles.hasOwnProperty(tile)) {
            assetsToLoad.push(this.getAssetNameNoExtension(tiles[tile].image));
        }
    }
    return assetsToLoad;
};


