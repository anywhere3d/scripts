//  makePowerOfTwo.js

/*
 * image : <img>,
 * nature: boolean true|false| (optional),
 * size  : number (power of two - optional),
 */

    function makePowerOfTwo( image, natural ) {
        var canvas = document.createElement( "canvas" );
        if ( natural ){
            canvas.width = THREE.Math.nearestPowerOfTwo( image.naturalWidth );
            canvas.height = THREE.Math.nearestPowerOfTwo( image.naturalHeight );
        } else {
            canvas.width = THREE.Math.nearestPowerOfTwo( image.width );
            canvas.height = THREE.Math.nearestPowerOfTwo( image.height );
        }
        var context = canvas.getContext( "2d" );
        context.drawImage( image, 0, 0, canvas.width, canvas.height );

        debugMode && console.warn( "makePowerOfTwo:", 
            "Image resized to:", canvas.width, "x", canvas.height, 
        );

        return canvas;
    }

    function makeFixedPowerOfTwo( image, size ) {
        var canvas = document.createElement( "canvas" );

        if ( size != undefined && !isNaN(size) && size > 0 ) {
            canvas.width = THREE.Math.nearestPowerOfTwo( size );
            canvas.height = THREE.Math.nearestPowerOfTwo( size );

        } else if ( size != undefined && size instanceof Array && size.length == 2 
            && !isNaN(size[0]) && !isNaN(size[1]) && size[0] > 0 && size[1] > 0 ) {

            canvas.width = THREE.Math.nearestPowerOfTwo( size[0] );
            canvas.height = THREE.Math.nearestPowerOfTwo( size[1] );

        } else if ( size != undefined 
            && !(size instanceof Array) 
            && size instanceof Object 
            && !!size.x && !!size.y 
            && !isNaN(size.x) && !isNaN(size.y) 
            && size.x > 0 && size.y > 0 ) {

            canvas.width = THREE.Math.nearestPowerOfTwo( size.x );
            canvas.height = THREE.Math.nearestPowerOfTwo( size.y );

        } else {
            canvas.width = THREE.Math.nearestPowerOfTwo( image.width );
            canvas.height = THREE.Math.nearestPowerOfTwo( image.height );
        }

        var context = canvas.getContext( "2d" );
        context.drawImage( image, 0, 0, canvas.width, canvas.height );

        debugMode && console.warn( "makeFixedPowerOfTwo:", 
            "Image resized to:", canvas.width, "x", canvas.height, 
        );

        return canvas;
    }

    function toImageSize( image, natural ) {
        var canvas = document.createElement( "canvas" );
        if ( natural ){
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
        } else {
            canvas.width = image.width;
            canvas.height = image.height;
        }
        var context = canvas.getContext( "2d" );
        context.drawImage( image, 0, 0, canvas.width, canvas.height );

        debugMode && console.warn( "makePowerOfTwo:", 
            "Image resized to:", canvas.width, "x", canvas.height, 
        );

        return canvas;
    }
