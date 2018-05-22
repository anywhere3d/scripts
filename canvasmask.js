
//  canvasmask.js

    function canvasmask(img, maskUrl){
    //  sample mskUrl = "https://s20.postimg.org/rt9hih625/mask_dress3_DD.png";

        var imagecanvas = document.createElement("canvas");
        var imagecontext = imagecanvas.getContext("2d");
        
    //  uncomment do see the canvas to debug.
    //  document.body.appendChild(imagecanvas);

        var newImg = document.createElement("img");
        newImg.crossOrigin = "anonymous";
        newImg.src = img.src;
        
        newImg.onload = function() {
            var width  = newImg.width;
            var height = newImg.height;
            
            var mask = document.createElement("img");
            mask.crossOrigin = "anonymous";
            mask.src = maskUrl;  // IMPORTANT //
            mask.onload = function() {
                imagecanvas.width  = width;
                imagecanvas.height = height;
                
                imagecontext.drawImage(mask, 0, 0, width, height);
                imagecontext.globalCompositeOperation = "source-atop"; // IMPORTANT //
                imagecontext.drawImage(img, 0, 0);
                
                img.src = imagecanvas.toDataURL();

            }
        }
    }

    function canvasmaskPromise(img, mskUrl){
    //  sample mskUrl = "https://s20.postimg.org/rt9hih625/mask_dress3_DD.png";
        return new Promise(function(resolve, reject){
            var imagecanvas = document.createElement("canvas");
            var imagecontext = imagecanvas.getContext("2d");

        //  uncomment do see the canvas to debug.
        //  document.body.appendChild(imagecanvas);
    
            var newImg = document.createElement("img");
            newImg.crossOrigin = "anonymous";
            newImg.src = img.src;
            
            newImg.onload = function() {
                var width  = newImg.width;
                var height = newImg.height;
                
                var mask = document.createElement("img");
                mask.crossOrigin = "anonymous";
                mask.src = mskUrl;  // IMPORTANT //
                mask.onload = function() {
                    imagecanvas.width  = width;
                    imagecanvas.height = height;
                    
                    imagecontext.drawImage(mask, 0, 0, width, height);
                    imagecontext.globalCompositeOperation = "source-atop"; // IMPORTANT //
                    imagecontext.drawImage(img, 0, 0);
                    
                    img.src = imagecanvas.toDataURL();
                    resolve(img);
                }
            }
        });
    }

