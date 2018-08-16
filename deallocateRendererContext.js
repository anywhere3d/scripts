//  deallocateRendererContext.js


//  Deallocate renderer to avoid memory leaks. // VERY IMPORTANT //

    function deallocateRendererContext( renderer ){

    //  sources: "https://stackoverflow.com/questions/21548247/clean-up-threejs-webgl-contexts",
    //  "https://github.com/mrdoob/three.js/blob/r78/src/renderers/WebGLRenderer.js#L308".

        renderer.forceContextLoss();

    //  Removes the "webglcontextlost" event listener.
        renderer.dispose();          
        renderer.context = null;
        renderer.domElement = null;
        renderer = null;
    }

