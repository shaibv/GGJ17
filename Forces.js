/**
 * Created by  on 1/20/2017.
 */




function findCloseMosque(agent) {
    var minDistance = 99999;
    var closeMosque;
    for (var i = 0; i < mosques.length; i++) {
        var mosque = mosques[i];
        var distance  = Math.sqrt(Math.pow(mosque.x-agent.x,2) +  Math.pow(mosque.y-agent.y,2));
        if (distance < minDistance){
            minDistance = distance;
            closeMosque = mosque
        }
    }
    //for (var i = 0; i < exists.length; i++) {
    //    var exist = exists[i];
    //    var distance  = Math.sqrt(Math.pow(exist.x-agent.x,2) +  Math.pow(exist.y-agent.y,2));
    //    if (distance < minDistance){
    //        minDistance = distance;
    //        closeMosque = exist
    //    }
    //}
    return closeMosque;

}

function isInRange(agent){
    var treshhold =300;
      var mosque  = findCloseMosque(agent);
    if(mosque) {
        var distance = Math.sqrt(Math.pow(mosque.x - agent.x, 2) + Math.pow(mosque.y - agent.y, 2));
        if (distance < treshhold) {
            return mosque;
        }
    }
    return null;

}


