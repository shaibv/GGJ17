/**
 * Created by shaibenvalid on 1/20/17.
 */

var ExitFactory = {
    init: init
}


var exists = [];


function init(game, gameBoard) {
   var entity = new Mosque(game, -50, 300, 'church');
    exists.push(entity);
    entity = new Mosque(game, 1010, 300, 'church');
    exists.push(entity);
    entity = new Mosque(game, 480, -50, 'church');
    exists.push(entity);
    entity = new Mosque(game, 480, 650, 'church');
    exists.push(entity);

}
