//  img2matrix.js

//  @author yomotsu
//  MIT License
//  src="img2matrix.js"

    function img2matrix() {
    
      'use strict';
    
      return {
        fromImage: fromImage,
        fromUrl  : fromUrl
      }
    
      function fromImage ( image, width, depth, minHeight, maxHeight ) {
    
        width = width|0;
        depth = depth|0;
    
        var i, j;
        var matrix = [];
        var canvas = document.createElement( 'canvas' ),
            ctx = canvas.getContext( '2d' );
        var imgData, pixel, channels = 4;
        var heightRange = maxHeight - minHeight;
        var heightData;
    
        canvas.width  = width;
        canvas.height = depth;
    
        // document.body.appendChild( canvas );
    
        ctx.drawImage( image, 0, 0, width, depth );
        imgData = ctx.getImageData( 0, 0, width, depth ).data;
    
        for ( i = 0|0; i < depth; i = ( i + 1 )|0 ) { //row
    
          matrix.push( [] );
    
          for ( j = 0|0; j < width; j = ( j + 1 )|0 ) { //col
    
            pixel = i * depth + j;
            heightData = imgData[ pixel * channels ] / 255 * heightRange + minHeight;
    
            matrix[ i ].push( heightData );
    
          }
    
        }
    
        return matrix;
      
      }
    
      function fromUrl ( url, width, depth, minHeight, maxHeight ) {
    
        return function () {
    
          return new Promise( function( onFulfilled, onRejected ) {
    
            var image = new Image();
    
            image.onload = function () {
    
              var matrix = fromImage( image, width, depth, minHeight, maxHeight );
              onFulfilled( matrix );
    
            };
    
            image.src = url;
    
          } );
    
        }
    
      }
    
    }


//  materialtoGeometry.js
//  @author anywhere3d.com
//  MIT License

    function materialtoGeometry ( matrix, width, depth ) {
      
        var sizeX = matrix[0].length;
        var sizeZ = matrix.length;
        
        var halfWidth = width * 0.5;
        var halfDepth = depth * 0.5;
        var geometry = new THREE.PlaneGeometry( width, depth, sizeX - 1, sizeZ - 1 );
        
        var z90deg = new THREE.Matrix4().makeRotationZ( -Math.PI/2 );
        geometry.applyMatrix( z90deg );
        
        geometry.vertices.forEach( function ( vertex, i ) {
        
            var row = ( i / sizeX )|0;
            var col = i % sizeX;
            
            vertex.x = halfWidth + vertex.x;
            vertex.y = halfDepth + vertex.y;
            vertex.z = matrix[ row ][ col ];
        
        });
        
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        
        return geometry;
    
    }
