//  sceneBackground.js

function sceneBackground( urls ){
    if (!scene || Number(THREE.REVISION) < 78) return;
    var loader = new THREE.CubeTextureLoader();
    loader.load( urls, function(texture){
        scene.background = texture;
        scene.background.needsUpdate = true;
    });
}
