/**
 * Created by shaibenvalid on 1/20/17.
 */

var ExitFactory = {
    init: init
}


var exists = {};
var ExitFactory  = this;

function init(game, gameBoard) {
   var entity = new Mosque(game, -50, 300, 'blue_tile');
    exists.push(entity);
    entity = new Mosque(game, 1010, 300, 'blue_tile');
    exists.push(entity);
    entity = new Mosque(game, 480, -50, 'blue_tile');
    exists.push(entity);
    entity = new Mosque(game, 480, 650, 'blue_tile');
    exists.push(entity);

}
