//  poseFromJSON.js

function poseFromJSON( text, skinned ){
    var pose = JSON.parse( text );
    pose.forEach(function ( key, i ) {
        skinned.skeleton.bones[i].position.fromArray( pose[i].pos );
        skinned.skeleton.bones[i].quaternion.fromArray( pose[i].rot );
        skinned.skeleton.bones[i].scale.fromArray( pose[i].scl );
    });
}

