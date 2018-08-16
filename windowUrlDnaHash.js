//  windowUrlDnaHash.js (v1.0)

window.URL = window.URL || window.webkitURL;

if ( window.location.hash ) {
    var hash = window.location.hash.substr( 1 );
    debugMode && console.log( "hash:", hash );
    localPlayer.outfit.fromDNA( hash );
    scene.add( localPlayer.outfit.direction );
}
