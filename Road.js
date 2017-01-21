var TYPE_TO_DIRECTION = {
	"road_corner_east_north" : [1, 1, 0, 0],
	"road_corner_south_east" : [0, 1, 1, 0],
	"road_corner_south_west" : [0, 0, 1, 1],
	"road_corner_west_north" : [1, 0, 0, 1],
	"road_east" : [0, 1, 0, 1],
	"road_junction_cross" : [1, 1, 1, 1],
	"road_junction_t_east": [1, 0, 1, 1],
	"road_junction_t_north" : [1, 1, 0, 1],
	"road_junction_t_south" : [0, 1, 1, 0],
	"road_junction_t_west" : [1, 1, 1, 0],
	"road_north" : [1, 0, 1, 0]

}
Road = function(game, x, y, resource) {
	this.type = "Road";
	this.resource = resource;
	Building.call(this, game, x, y, resource);
};


Road.prototype = Object.create(Building.prototype);
Road.prototype.constructor = Road;

Road.prototype.getResource = function () {
	return this.resource;
}

Road.prototype.getDirection = function () {
	return TYPE_TO_DIRECTION[this.resource];
}






