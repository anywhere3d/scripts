//  createLabel.js


    function createLabel(text, position, size, color, backgroundMargin) {

        debugMode && console.log(
            "createLabel(versionfication):", 
            "This is the latest version (v3)",
            "of createLabel functions",
            "that used in PlayerLabel.js."
        );

        if (!size ) size = 100;
        if (!color) color = "#ffffff";
        if (!position) position = new THREE.Vector3(0,0,0);
        if (!backgroundMargin) backgroundMargin = 50;

        var canvas = document.createElement("canvas");

        var context = canvas.getContext("2d");
        context.font = "bold " + size + "pt Arial";

        var textWidth = context.measureText(text).width;
        debugMode && console.log(text, "textWidth:", textWidth );

        canvas.width  = textWidth + backgroundMargin;
        canvas.height = size + backgroundMargin;
        debugMode && console.log("canvas:", canvas );

        context = canvas.getContext("2d");
        context.font = "bold " + size + "pt Arial";

    //  fill text.
        context.shadowColor = "rgba(0, 0, 0, 1)";
        context.shadowOffsetX = 8;
        context.shadowOffsetY = 8;
        context.shadowBlur = 4;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.fillText(text, canvas.width / 2, canvas.height / 2);

    //  stroke text.
        context.shadowColor = "rgba(0, 0, 0, 1)";
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 10;
        context.lineWidth = 5;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeStyle = color;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);

        debugMode && console.log("context:", context );

    //  Create sprite.
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var material = new THREE.SpriteMaterial({
            map: texture
        });

        var sprite = new THREE.Sprite(material);
    //  sprite.overdraw = true;
        sprite.doubleSided = true;
        sprite.position.copy(position);
        sprite.scale.x = canvas.width / 150;
        sprite.name = "PLAYER_LABEL";
        
        return sprite;
    }



/*
    function createLabel_v2(text, position, size, color, backgroundColor, backgroundMargin) {
    
        console.warn("!!!DEPRECATED:", 
            "This createLabel(v2) function is deprecated.",
            "Use the latest createLabel() function",
            "located in PlayerLabel.js instead." 
        ); return;
    
        if (!size) size = 100;
        if (!color) color = "#ffffff";
        if (!position) position = new THREE.Vector3(0,0,0);
        if (!backgroundColor) backgroundColor  = "rgba(0,0,0,0)";
        if (!backgroundMargin) backgroundMargin = 50;
    
        var canvas = document.createElement("canvas");
    
        var context = canvas.getContext("2d");
        context.font = "bold " + size + "pt Arial";
    
        var textWidth = context.measureText(text).width;
        debugMode && console.log(text, "textWidth:", textWidth );
    
        canvas.width  = textWidth + backgroundMargin;
        canvas.height = size + backgroundMargin;
        debugMode && console.log("canvas:", canvas );
    
        context = canvas.getContext("2d");
        context.font = "bold " + size + "pt Arial";
    
    //  canvas background.
    //    if ( backgroundColor &&  backgroundColor != "rgba(0,0,0,0)") {
    //        context.fillStyle = backgroundColor;
    //        context.fillRect(
    //            (canvas.width / 2) - (textWidth / 2) - (backgroundMargin / 2), 
    //            (canvas.height / 2) - (size / 2) - (backgroundMargin / 2), 
    //            textWidth + backgroundMargin, 
    //            size + backgroundMargin
    //        );
    //    }
    
    //  fill text.
        context.shadowColor = "rgba(0, 0, 0, 1)";
        context.shadowOffsetX = 8;
        context.shadowOffsetY = 8;
        context.shadowBlur = 4;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    //  stroke text.
        context.shadowColor = "rgba(0, 0, 0, 1)";
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 10;
        context.lineWidth = 5;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeStyle = color;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);
    
    //  canvas border.
    //    context.strokeStyle = "black";
    //    context.strokeRect(0, 0, canvas.width, canvas.height);
    
        debugMode && console.log("context:", context );
    
    //  return canvas;  //
    
    //  Create sprite.
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
    
        var material = new THREE.SpriteMaterial({
            map: texture
        });
    
        var sprite = new THREE.Sprite(material);
    //  sprite.overdraw = true;
        sprite.doubleSided = true;
        sprite.position.copy(position);
        sprite.scale.x = canvas.width / 150;
        
        return sprite;
    }
*/

/*
    function createLabel_v1(text, position, size, color, backgroundMargin) {

        console.warn("!!!DEPRECATED:", 
            "This createLabel(v1) function is deprecated.",
            "Use the latest createLabel() function",
            "located in PlayerLabel.js instead." 
        ); return;

        if (!size ) size = 100;
        if (!color) color = "#ffffff";
        if (!position) position = new THREE.Vector3(0,0,0);
        if (!backgroundMargin) backgroundMargin = 50;

        var canvas = document.createElement("canvas");

        var context = canvas.getContext("2d");
        context.font = "bold " + size + "pt Arial";

        var textWidth = context.measureText(text).width;
        debugMode && console.log(text, "textWidth:", textWidth );

        canvas.width  = textWidth + backgroundMargin;
        canvas.height = size + backgroundMargin;
        debugMode && console.log("canvas:", canvas );

        context = canvas.getContext("2d");
        context.font = "bold " + size + "pt Arial";

    //  fill text.
        context.shadowColor = "rgba(0, 0, 0, 1)";
        context.shadowOffsetX = 8;
        context.shadowOffsetY = 8;
        context.shadowBlur = 4;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.fillText(text, canvas.width / 2, canvas.height / 2);

    //  stroke text.
        context.shadowColor = "rgba(0, 0, 0, 1)";
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 10;
        context.lineWidth = 5;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeStyle = color;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);

        debugMode && console.log("context:", context );

    //  Create sprite.
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var material = new THREE.SpriteMaterial({
            map: texture
        });

        var sprite = new THREE.Sprite(material);
    //  sprite.overdraw = true;
        sprite.doubleSided = true;
        sprite.position.copy(position);
        sprite.scale.x = canvas.width / 150;
        sprite.name = "PLAYER_LABEL";
        
        return sprite;
    }
*/
