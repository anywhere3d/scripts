//  localPlayerFromDNA.js

function localPlayerFromDNA( dna ){
    var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
    localPlayer.controller.direction = frontAngle;
    localPlayer.outfit.fromDNA( dna );
    scene.add(localPlayer.outfit.direction);
    localPlayer.outfit.update();
}

