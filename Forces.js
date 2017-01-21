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
    var treshhold;
      var mosque  = findCloseMosque(agent);


    if(mosque) {
        if (mosque.key == "mosque1"){
            treshhold = 100;
        }
        if (mosque.key == "mosque2"){
            treshhold = 200;
        }

        var distance = Math.sqrt(Math.pow(mosque.x+(mosque.width/2) - agent.x, 2) + Math.pow(mosque.y-(mosque.height/2) - agent.y, 2));
        if (distance < treshhold) {
            return mosque;
        }
    }
    return null;

}


