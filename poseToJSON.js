//  poseToJSON.js

function poseToJSON( skinned ){
    var pose = [];

    for (var i in skinned.skeleton.bones) {
        var key = {}; // {"pos":[], "rot":[], "scl":[]};
        key.pos = skinned.skeleton.bones[i].position.toArray();
        key.rot = skinned.skeleton.bones[i].quaternion.toArray();
        key.scl = skinned.skeleton.bones[i].scale.toArray();
        pose.push(key);
    }

    debugMode && console.log("pose:", pose);
    return pose;
}

//  var json = JSON.stringify(pose);
//  debugMode && console.log("json:", json);
//  return json;

