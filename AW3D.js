//  AW3D.js

    var debugMode;

/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

    var AW3D = { VERSION: '0.2.2' };

//  Player Holder.
    AW3D.PlayerHolder = function ( name ){
        var holder = new THREE.Object3D();
        holder.position.set( 0, 1, 0 ); // startPoint.
        holder.name = name || "PLAYER HOLDER";
        return holder;
    }

//  Player Holder Helper.
    AW3D.PlayerHolderHelper = function ( name ){
        var helper = new THREE.BoxHelper();
        helper.name = name || "HOLDER HELPER";
        helper.visible = debugMode || false;
        return helper;
    }

//  Player Controller Direction pointer.
    AW3D.DirectionPointer = function ( name ){
        var geometry = new THREE.CylinderGeometry( 0, 1, 20, 12 );
        geometry.rotateX( Math.PI / 2 );  //  BE CAREFULL: is not "mesh.rotation.y = -Math.PI". //
        var material = new THREE.MeshStandardMaterial({color:0x00ff00});
        var pointer = new THREE.Mesh(geometry, material);
        pointer.position.set(0, 15, 0);
        pointer.name = name || "PLAYER DIRECTION";
        pointer.visible = debugMode || false;
        return pointer;
    }

//  Player Sphere.
    AW3D.PlayerSphere = function ( name ){
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry( 15, 8, 4 ),
            new THREE.MeshBasicMaterial( { color: 0xff0000,  wireframe: true} )
        ); 
        sphere.position.y = 12.5;
        sphere.name = name || "PLAYER SPHERE";
        sphere.visible = debugMode || false;
        return sphere;
    }

//  Player pointer.
    AW3D.PlayerPointer = function ( name ){
        var geometry = new THREE.CylinderGeometry( 0, 1, 20, 12 );
        geometry.rotateX( Math.PI / 2 );  //  BE CAREFULL: is not "mesh.rotation.y = -Math.PI". //
        var material = new THREE.MeshNormalMaterial();
        var pointer = new THREE.Mesh(geometry, material);
        pointer.position.set(0, 40, 0);
        pointer.name = name || "PLAYER POINTER";
        pointer.visible = debugMode || false;
        return pointer;
    }



//  AW3D.Outfit.js

/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

    AW3D.Outfit = function( player ){
        
        var player = player || localPlayer;

        var outfit = {
    
            direction: new THREE.Object3D(),
        
        //  If outfits are children of direction we do not need 
        //  updatePosition() or updateRotation(). Just use outfit.update() [direction].
        
            update: function(){
            
            //  var self = this;

            //  Update avatar rotation y.

                var direction = player.controller.direction - Math.PI;

                this.direction.rotation.y = direction;

            //  Update avatar position.

                var x = player.controller.center.x;
                var y = player.controller.center.y - player.controller.radius;
                var z = player.controller.center.z;
                
            //  var position = new THREE.Vector3(x, y, z);
            //  this.direction.position.copy( position );

                this.direction.position.set( x, y, z );
            },

            refresh: function(){
                this.AnimationsHandler.refresh();
            },

        //  Update avatar position.

            updatePosition: function(){
                
                console.warn("DEPRECATED:", 
                    "outfit.updatePosition() is deprecated.", 
                    "Use outfit.update() instead." );

                this.update();
            },


        //  Update avatar rotation.
        
            updateRotation: function( y ){

                console.warn("DEPRECATED:", 
                    "outfit.updateRotation(y) is deprecated.", 
                    "Use outfit.update() instead." );

                this.update();
            },


            addToScene: function(name, asset){

                console.warn("DEPRECATED", 
                    "outfit.addToScene(name, asset) is deprecated.", 
                    "Use outfit.direction.add(asset) instead." );

                if ( !name || name == null || !asset ) return;
                this[ name ] = asset.clone();
                this.direction.add( this[ name ] );
                this.AnimationsHandler.refresh();

            },


            addsToScene: function(){

                console.warn("DEPRECATED:", 
                    "outfit.addsToScene() is deprecated.", 
                    "Use native threejs add() function.",
                    "e.g. outfit.direction.add(arg1, arg2, ..., argN) instead." );

                for (var i in arguments){
                    var name = Object.keys(arguments[i])[0];
                    var asset = Object.values(arguments[i])[0];
                    if ( !name || name == null || !asset ) continue;
                    this[ name ] = asset.clone();
                    this.direction.add( this[ name ] );
                }

                this.AnimationsHandler.refresh();

            },


            set: function(){

            //  Object style argument: "{name: asset}".
            //  debugMode && console.log("outfit.set(arguments):", arguments);

            //  WARNING: This method used to clone assets from external source.
            //  For internal assets native threejs add() method is recommended:
            //  "player.outfit.direction.add( this.asset )".

            //  To import an array of arguments use:
            //  this.set.apply(this, [arg1, arg2, ..., argN]): 

            //  Example:
                //  player.outfit.set.apply( player.outfit, [
                //      {body  : Avatars.hmBody}, 
                //      {tshirt: Avatars.hmTshirt}, 
                //      {hair  :Avatars.hmHairs}, 
                //      ........................,
                //      {skeleton: Avatars.skeleton,
                //  ]);

                for (var i in arguments){

                    if (!arguments[i]) continue;

                    var name = Object.keys(arguments[i])[0];
                    var asset = Object.values(arguments[i])[0];
                //  debugMode && console.log(name + ":", asset);

                    if ( !name || name == null || !asset ) continue;
                    if (!!this[ name ]) this.remove( name );

                    this[ name ] = asset.clone();
                }

                this.AnimationsHandler.refresh();

            },

            add: function(){

            //  Object style argument: "{name: asset}".
            //  debugMode && console.log("outfit.add(arguments):", arguments);
            
            //  WARNING: This method used to clone assets from external source.
            //  For internal assets native threejs add() method is recommended:
            //  "player.outfit.direction.add( this.asset )".

            //  TODO: .outfit.add([]) to exept also an array of arguments???.
            //  To import an array of arguments use:
            //  this.add.apply(this, [arg1, arg2, ..., argN]): 

            //  Example:
                //  player.outfit.add.apply( player.outfit, [
                //      {body  : Avatars.hmBody}, 
                //      {tshirt: Avatars.hmTshirt}, 
                //      {hair  : Avatars.hmHairs}, 
                //      ........................,
                //      {skeleton: Avatars.skeleton,
                //  ]);

                for (var i in arguments) {
                    
                    if (!arguments[i]) continue;

                    var name = Object.keys(arguments[i])[0];
                    var asset = Object.values(arguments[i])[0];
                //  debugMode && console.log(name + ":", asset);

                    if ( !name || name == null || !asset ) continue;
                    if (!!this[ name ]) this.remove( name );

                    this[ name ] = asset.clone();
                    this.direction.add( this[ name ] );

                }

                this.AnimationsHandler.refresh(); 

            },

        //  scene.remove() always returns "undefined" (does not throw error).

            remove: function(){

            //  To import an array of arguments use:
            //  this.remove.apply(this, [arg1, arg2, ..., argN]): 

            //  Example:
                //  player.outfit.remove.apply( player.outfit, [
                //      "body", "tshirt", "hair", "skeleton", 
                //  ]);

                if ( arguments.length == 0 ) return;
                
                var self = this;

                for (var i in arguments){
                    var name = arguments[i];
                    self.direction.remove( self[ name ] );

                //  Dispose geometry.
                //      self[ name ].geometry.dispose();
                //  Dispose materials.
                //  if ( !!self[ name ].material.materials ){
                //      self[ name ].material.materials.forEach(function(material){
                //  TODO: Dispose textures.
                //          material.dispose();
                //      });
                //  } else {
                //      self[ name ].material.dispose();
                //  }

                    self[ name ] = null;
                    delete self[ name ];
                }

            //  this.AnimationsHandler.refresh();

            },

            removeFromScene: function(){

                var self = this;

                if ( arguments.length == 0 ) {

                //  "aparts" has renamed to "outfits".
                    self.outfits.forEach( function( name ){
                        self.remove( name );
                    });

                } else {

                    for (var i in arguments){
                        self.remove( name );
                    }
                }
    
            //  this.AnimationsHandler.refresh();

            },

            removeAll: function() { 
                this.removeFromScene();
            },

            removeTexture: function( outfit, map, index ){
            //  outfit: outfit name from outfits (e.g "body", "hair", "dress", etc.)
            //  map   : material map name (e.g. "map", "bumpMap", "normalMap", etc.)
            //  index : material index of multimaterial ("null" for simple material).

                if ( !this[ outfit ] ) return;
                if ( !this[ outfit ].material ) return;
            
            //  Material.
    
                if ( index == null || isNaN(index) || typeof(index) != "number" ) {
    
                    if ( !this[ outfit ].material[ map ] ) return;
    
                    this[ outfit ].material[ map ].dispose();
                    this[ outfit ].material[ map ] = null;
                    this[ outfit ].material.needsUpdate = true;
    
                    return;
                }
    
            //  MultiMaterial.
    
                if ( typeof(index) == "number" && index > -1 ) {
    
                    if ( !this[ outfit ].material.materials ) return;
                    if ( !this[ outfit ].material.materials[ index ] ) return;
                    if ( !this.body.material.materials[ index ][ map ] ) return;
    
                    this[ outfit ].material.materials[ index ][ map ].dispose();
                    this[ outfit ].material.materials[ index ][ map ] = null;
                    this[ outfit ].material.materials[ index ].needsUpdate = true;
                    
                    return;
                }
            },
    
            gender: {
                male    : false,
                female  : false,
                shemale : false,
                trans   : false,
            },
    
            genitals: { 
                vagina   : false,
                penis    : false,
                attached : false,
            },

        // "aparts" has renamed to "outfits".

            outfits: [
                "skeleton",
                "body", 
                "bodypaint",
                "makeup", 
                "hairs",
                "bra", 
                "panties", 
                "boxers", 
                "tshirt",
                "skirt",
                "trousers", 
                "dress", 
                "shoes",
                "coat", 
                "penis", 
                "vagina" 
            ],

            setGender: function( gender ){
                var self = this;
                Object.keys(this.gender).forEach( function( name ){
                    self.gender[ name ] = ( name == gender );
                });
                this.AnimationsHandler.refresh();
            },
    
            getGender: function(){
                var self = this;
                if (arguments.length > 0){
                    return self.gender[ arguments[0] ];
                } else {
                    return Object.keys(this.gender).find( function( name ){
                        return self.gender[ name ];
                    });
                }
            },
    
            resetGender: function(){
                var self = this;
                Object.keys(this.gender).forEach( function( name ){
                    self.gender[ name ] = false;
                });
                this.AnimationsHandler.refresh();
            },
    
            getdata: function( name ){

                if ( !name ) return;
                if ( !this[ name ] ) return;
                if ( !this.outfits.includes( name ) ) return;

                var data = {};

                data[ name ] = {};
                data[ name ].name      = name;
                data[ name ].visible   = this[ name ].visible;
                data[ name ].scale     = this[ name ].scale.toArray();
                data[ name ].geometry  = this[ name ].geometry.sourceFile;


            //  Materials.

                data[ name ].materials = [];

                if ( !!this[ name ].material.materials ){

                    this[ name ].material.materials.forEach( function(material, i){
                        data[ name ].materials.push( toJSON(material) );
                    });

                } else {

                    var material = this[ name ].material;
                    data[ name ].materials.push( toJSON(material) );

                }

                return data[ name ];

                function toJSON( material ){
                    var json = {};
                    
                    json.type = material.type;
                    if (!!material.map) json.map = material.map.sourceFile;
                    if (!!material.aoMap) json.aoMap = material.aoMap.sourceFile;
                    if (!!material.envMap) json.envMap = material.envMap.sourceFile;
                    if (!!material.bumpMap) json.bumpMap = material.bumpMap.sourceFile;
                    if (!!material.alphaMap) json.alphaMap = material.alphaMap.sourceFile;
                    if (!!material.lightMap) json.lightMap = material.lightMap.sourceFile;
                    if (!!material.normalMap) json.normalMap = material.normalMap.sourceFile;
                    if (!!material.emissiveMap) json.emissiveMap = material.emissiveMap.sourceFile;
                    if (!!material.specularMap) json.specularMap = material.specularMap.sourceFile;
                    if (!!material.roughnessMap) json.roughnessMap = material.roughnessMap.sourceFile;
                    if (!!material.metalnessMap) json.metalnessMap = material.metalnessMap.sourceFile;
                    if (!!material.displacementMap) json.displacementMap = material.displacementMap.sourceFile;

                    var options = {}

                    options.uuid = material.uuid;
                    options.name = material.name;
                    options.color = material.color.getHex();
                    options.side = material.side;
                    options.opacity = material.opacity;
                    options.shading = material.shading;
                    options.emissive = material.emissive.getHex();
                    options.skinning = material.skinning;
                    options.transparent = material.transparent;
                //  options.shininess = material.shininess; // TODO: to debug this.
                    options.roughness = material.roughness;
                    options.metalness = material.metalness;

                    if (!!material.roughnessMap) options.roughness = material.roughness;
                    if (!!material.metalnessMap) options.metalness = material.metalness;
                    if (!!material.specularMap) options.specular = material.specular.getHex();
                    if (!!material.uniforms) options.uniforms = material.uniforms;
                    if (!!material.vertexShader) options.vertexShader = material.vertexShader;
                    if (!!material.fragmentShader) options.fragmentShader = material.fragmentShader;
                    if (!!material.vertexColors) options.vertexColors = material.vertexColors;
                    if (!!material.bumpMap) options.bumpScale = material.bumpScale;
                    if (!!material.normalMap) options.normalScale = material.normalScale.toArray();
                    if (!!material.displacementMap) options.displacementScale = material.displacementScale;
                    if (!!material.displacementMap) options.displacementBias = material.displacementBias;
                    if (!!material.emissiveMap) options.emissiveIntensity = material.emissiveIntensity;
                    if (!!material.lightMap) options.lightMapIntensity = material.lightMapIntensity;
                    if (!!material.envMap) options.reflectivity = material.reflectivity;
                    if (!!material.aoMap) options.aoMapIntensity = material.aoMapIntensity;

                    json.options = options;
                    return json;
                }
            },


            toJSON: function(){

                var data = {};

                if ( arguments.length == 0 ) {

                    this.outfits.forEach( function( name, index ){
                        if ( !!player.outfit[ name ] ){
                            data[ name ] = player.outfit.getdata( name );
                        }
                    });

                } else {

                    for (var i = 0; i < arguments.length; i++){
                        var name = arguments[i];
                        if ( !!this[ name ] ) {
                            data[ name ] = this.getdata( name );
                        }
                    }

                }

                data.gender = this.getGender();

                var data = JSON.stringify( data );

            //  TODO: to change json verify with sha256() hash ???.
            //  if ( sha256( data ) ) === sha256( "{}" ) ) { ... };

                if ( data === "{}" ) return null;

                else return JSON.parse( data );

            },

        //  .fromJSON (v2).

            fromJSON: function( json ){

            //  Validation.

                if ( typeof(json) == "object" ) {

                    try {
                        
                        json = JSON.stringify( json );

                    } catch(err) {
                        
                        var err = "Error. Json is not valid."
                        console.error(err);
                        throw Error( err );
                        return;
                    }
                }

                if ( typeof(json) == "string" ) {

                    if ( !validator.isJSON( json ) ) {

                        var err = "Error. Json is not valid.";
                        console.error(err);
                        throw Error( err );
                        return;
                    }
                }

                var json = JSON.parse( json );
                debugMode && console.log( "json:", json );

                var self = this;

            //  Get gender first.

                var gender = json.gender;  // IMPORTANT //
                delete json.gender;        // IMPORTNAT //

            //  Regenaration.

                var promises = [];

                for ( var key in json ) {
                    promises.push( recoverfromJson( key ) );
                }

                Promise.all(promises).then(function( results ){

                //  Clean up results array.
                    results = results.filter(Boolean); // IMPORTANT //
                    debugMode && console.log( "results:", results );

                //  Restore outfit.
                    self.removeAll();
                    self.setGender( gender );
                    self.add.apply( self, results );   // WARNING: DO NOT MODIFY. //
                    self.AnimationsHandler.refresh();

                });

                function recoverfromJson( key ){
                //  Copy json properties, 
                //  to prevent overwritting.  //  IMPORTANT  //
                    var object = {};
                    object.name      = json[ key ].name;
                    object.visible   = json[ key ].visible;
                    object.materials = json[ key ].materials;
                    object.geometry  = json[ key ].geometry;  // url
                    object.scale = new THREE.Vector3().fromArray( json[ key ].scale );

                //  Copy key to prevent overwritting.
                    var url = object.geometry;
                    debugMode && console.log("%s: %s", key, url);

                    return new Promise( function( resolve, reject ){

                    //  Materials.
                        var materials = [];

                        object.materials.forEach(function( material, index ){
                            materials.push( new Promise( function(resolve, reject){
        
                            //  Restore normalScale vector.                  
                                if ( !!material.options.normalScale ){
                                    material.options.normalScale = new THREE.Vector2()
                                    .fromArray( material.options.normalScale ); // IMPORTANT //
                                }
        
                            //  Textures.
                                var textures = [];
                                
                                if (!!material.map) textures.push( loadMapTexture( "map" ) );
                                if (!!material.aoMap) textures.push( loadMapTexture( "aoMap" ) );
                                if (!!material.envMap) textures.push( loadMapTexture( "envMap" ) );
                                if (!!material.bumpMap) textures.push( loadMapTexture( "bumpMap" ) );
                                if (!!material.alphaMap) textures.push( loadMapTexture( "alphaMap" ) );
                                if (!!material.lightMap) textures.push( loadMapTexture( "lightMap" ) );
                                if (!!material.normalMap) textures.push( loadMapTexture( "normalMap" ) );
                                if (!!material.emissiveMap) textures.push( loadMapTexture( "emissiveMap" ) );
                                if (!!material.specularMap) textures.push( loadMapTexture( "specularMap" ) );
                                if (!!material.roughnessMap) textures.push( loadMapTexture( "roughnessMap" ) );
                                if (!!material.metalnessMap) textures.push( loadMapTexture( "metalnessMap" ) );
                                if (!!material.displacementMap) textures.push( loadMapTexture( "displacementMap" ) );
        
        
                            //  Materials.
    
                                promises.push( Promise.all(textures).then(function( result ){
        
                                    switch ( material.type ) {
                                        case "MeshBasicMaterial":
                                            resolve( new THREE.MeshBasicMaterial( material.options ) );    // multimaterialPromises.push resolve.
                                            break;
                                        case "MeshDepthMaterial":
                                            resolve( new THREE.MeshDepthMaterial( material.options ) );    // multimaterialPromises.push resolve.
                                            break;
                                        case "MeshLambertMaterial":
                                            resolve( new THREE.MeshLambertMaterial( material.options ) );  // multimaterialPromises.push resolve.
                                            break;
                                        case "MeshNormalMaterial":
                                            resolve( new THREE.MeshNormalMaterial( material.options ) );   // multimaterialPromises.push resolve.
                                            break;
                                        case "MeshPhongMaterial":
                                            resolve( new THREE.MeshPhongMaterial( material.options ) );    // multimaterialPromises.push resolve.
                                            break;
                                        case "MeshPhysicalMaterial":
                                            resolve( new THREE.MeshPhysicalMaterial( material.options ) ); // multimaterialPromises.push resolve.
                                            break;
                                        case "MeshStandardMaterial":
                                            resolve( new THREE.MeshStandardMaterial( material.options ) ); // multimaterialPromises.push resolve.
                                            break;
                                        default:
                                            resolve( new THREE.MeshStandardMaterial( material.options ));  // multimaterialPromises.push resolve.
                                    }
        
                                }));
    
                                function loadMapTexture( name ){
                                    return new Promise(function(resolve, reject){
                                        var src = material[ name ];
                                        var img = new Image();
                                        img.crossOrigin = "anonymous"; // IMPORTANT //
                                        $(img).one("load", function(){
                                            material.options[ name ] = new THREE.Texture( img );
                                            material.options[ name ].sourceFile = src;
                                            material.options[ name ].needsUpdate = true;
                                            $(img).remove();
                                            resolve( material.options[ name ] );
                                        });
                                        img.src = src;
                                    });
                                }
    
                            }));
    
                        });


                        promises.push( Promise.all(materials).then(function( result ){

                            var multimaterial = new THREE.MeshFaceMaterial( result ); // <-- MultiMaterial.
                            debugMode && console.log( "multimaterial:", multimaterial.materials );

                        //  Geometry.
        
                            $.getJSON( url ).then(function( obj ){
        
                                var loader = new THREE.JSONLoader();
                                var geometry = loader.parse( obj ).geometry;
                                geometry.sourceFile = url;       // IMPORTANT //
                                geometry.computeFaceNormals();
                                geometry.computeVertexNormals();
                                geometry.computeBoundingBox();
                                geometry.computeBoundingSphere();
                                geometry.name = obj.name;
        
                                var skinned = new THREE.SkinnedMesh( geometry, multimaterial );
                                skinned.renderDepth = 1;
                                skinned.frustumCulled = false;
                                skinned.position.set( 0, 0, 0 );
                                skinned.rotation.set( 0, 0, 0 );
                                skinned.scale.copy( object.scale );
                                skinned.visible = true; // overwrite object.visible.
    
                                resolve( {[key]: skinned} );

                            });

                        }));
    
                    });

                }

            },

/*
 *  Outfit DNA is an object that contains the outfit data that needed to
 *  re-create the player oufit anywhere remotly. It is player outfit assets
 *  in transfered structure ( aka like .toJSON() ).
 *
 *  .toDNA(); .fromDNA(dna); Usage:
 *      dna = localPlayer.outfit.toDNA();
 *      player = new Player();
 *      player.outfit = new AW3D.Outfit(player);
 *      player.outfit.fromDNA( dna );
*/

        //  .to DNA (v2).

            toDNA: function(){

                return encode( JSON.stringify( this.toJSON() ) );

                function encode( string ) {
                    if ( !!window.RawDeflate ) {
                        return window.btoa( RawDeflate.deflate( string ) );
                    } else {
                        return string;
                    }
                }
            },


        //  .from DNA (v2).

            fromDNA: function( dna ){

                debugMode && console.log( dna );

            //  Validation.

                if ( typeof(dna) == "string" ) {

                    if ( validator.isBase64( dna ) ) {

                        var json = JSON.parse( decode( dna ) );
                        this.fromJSON(json);
                        
                    } else if ( validator.isJSON( dna ) ) {

                        var json = JSON.parse( dna );
                        this.fromJSON(json);

                    } else {

                        var err = "Error. DNA is not valid.";
                        console.error( err );
                        throw Error( err );
                        return;
                    }

                } else {

                    console.error( "Unsupported DNA type: %s", typeof(dna) );
                    throw Error( "Error. Unsupported DNA type: " + typeof(dna) );
                    return;
                }
                
            //  this.fromJSON(json);

                function decode( string ) {
                    if ( !!window.RawDeflate ) {
                        return RawDeflate.inflate( window.atob( string ) );
                    } else {
                        return string;
                    }
                }

            },


            promise: function( fn ){
                return new Promise(function(resolve, reject){
                    if (!!fn) resolve( fn() );
                    else resolve();
                });
            },
    

            AnimationsHandler: [],
    
        };

    //  oufit.AnimationsHandler.

        outfit.AnimationsHandler.reset = function(){
            this.length = 0; // reset array.
        };

        outfit.AnimationsHandler.stop = function(){
            this.forEach( function( anim ){
                if (!!anim ) anim.stop();
            });
        };

        outfit.AnimationsHandler.jump = function(){
            this.forEach( function( anim ){
                if (!!anim ) anim.jump();
            });
        };

        outfit.AnimationsHandler.play = function(){
            for (var i in arguments){
                var name = arguments[i];
                this.forEach( function( anim ){
                    if (!!anim ) anim.play(name);
                });
            }
        };

        outfit.AnimationsHandler.weightOff = function(){
            for (var i in arguments){
                var name = arguments[i];
                this.forEach( function( anim ){
                    if (!!anim ) anim.weightOff(name);
                });
            }
        };

        outfit.AnimationsHandler.weightOn = function(){
            for (var i in arguments){
                var name = arguments[i];
                this.forEach( function( anim ){
                    if (!!anim ) anim.weightOn(name);
                });
            }
        };

        outfit.AnimationsHandler.refresh = function(){
        //  outfit.AnimationsHandler is an "OutfitAnimationHandler" (array).

            this.stop();
            this.fill(null);
            this.reset();
    
        //  "aparts" has renamed to "outfits".
            player.outfit.outfits.forEach( function(name, i){
                if ( !!player.outfit[ name ] ){
    
                    var handler = new AW3D.AnimationHandler( player.outfit[ name ], player.outfit.getGender() );
    
                //  debugMode && console.log( "new AW3D.AnimationHandler(" + name + ", " + player.outfit.getGender() + ")" );
    
                    player.outfit.AnimationsHandler.push( handler );
                }
            });
    
            player.outfit.AnimationsHandler.play("idle");
    
        };
        
        return outfit;
    
    };



//  AW3D AnimationHandler.js

    /*!
    * @author anywhere3d
    * http://anywhere3d.org
    * MIT License
    */


//  Reset THREE.AnimationHandler.animations array.
    THREE.AnimationHandler.animations.length = 0;
    AnimationManager = THREE.AnimationHandler;

    AW3D.AnimationHandler = function ( mesh, gender ) {

        this.mesh = mesh;
        this.gender = gender; // IMPORTANT //
        this.actions = {};

    //  This create the animations of skinned mesh. 
        this.reloadActions(); // IMPORTANT //

    };
    
    AW3D.AnimationHandler.prototype = {

        constructor: AW3D.AnimationHandler,

        findAction: function(action){
            return THREE.AnimationHandler.animations.filter( function(animation){
                return (animation == action); // boolean.
            }); // BE CAREFULL: returns new array with resutls.
        },

        findByUuid: function( name ){
            return THREE.AnimationHandler.animations.filter( function(animation){
                return (animation.uuid == this.actions[ name ].uuid); // boolean.
            }); // BE CAREFULL: returns new array with resutls.
        },

        findByName: function( name ){
            return THREE.AnimationHandler.animations.filter( function(animation){
                return (animation.data.name == name); // boolean.
            }); // BE CAREFULL: returns new array with resutls.
        },

    //  To stop an animation, find the animation in
    //  THREE.AnimationHandler.animations and stop it from there.

        stop: function stop(){
            var self = this;
            Object.keys( self.actions ).forEach(function(name, i){
                var action = self.actions[name];
                self.findAction(action).forEach(function(animation){
                    animation.stop();
                });
            });
        },

    //  To delete an action, stop the animation in 
    //  THREE.AnimationHandler.animations and then delete it from this.actions.

        delete: function( name ){
            var action = this.actions[ name ];
            this.findAction( action ).forEach(function(animation){
                animation.stop();
            });
            delete this.actions[ name ];
        },

        reset: function reset(){
            for (var i in arguments){
                var name = arguments[i];
                this.actions[ name ].weight = 1;
                this.actions[ name ].currentTime = 0;
                this.actions[ name ].timeScale = this.actions[name].data.length;
            }
        },

        resetAll: function(){
            var self = this;
            Object.keys( self.actions ).forEach(function(name, i){
                self.reset( name );
            });
        },

        deleteAll: function(){
            var self = this;
            Object.keys( self.actions ).forEach(function(name, i){
                self.delete[ name ]
            });
        },

        play: function play(){
            for (var i in arguments){
                var name = arguments[i];
                if ( !this.actions[ name ] ) return;
                this.actions[ name ].play(0);
            }
        },

    //  To pause an animation, find the animation 
    //  in THREE.AnimationHandler.animations and set timeScale to 0.
    
        pause: function pause(){
            for (var i in arguments){
                var name = arguments[i];
                var action = this.actions[ name ];
                this.findAction( action ).forEach(function(animation){
                    animation.timeScale = 0;
                });
            }
        },

    //  To unpause an animation, find the animation 
    //  in THREE.AnimationHandler.animations and set timeScale to animation.data.length.

        continue: function(){
            for (var i in arguments){
                var name = arguments[i];
                var action = this.actions[ name ];
                this.findAction( action ).forEach(function(animation){
                    animation.timeScale = animation.data.length;
                });
            }
        },

        weightOff: function(){
            for (var i in arguments){
                var name = arguments[i];
                var action = this.actions[ name ];
                this.findAction( action ).forEach(function(animation){
                    animation.weight = 0;
                });
            }
        },

        weightOn: function(){
            for (var i in arguments){
                var name = arguments[i];
                var action = this.actions[ name ];
                this.findAction( action ).forEach(function(animation){
                    animation.weight = 1;
                });
            }
        },

        idle: function idle(){
            this.actions.idle.play(0);
        },

        jump: function jump(){
            this.actions.jump.play(0);
        },

        run: function run(){
            this.actions.run.play(0);
        },

        walk: function walk(){
            this.actions.walk.play(0);
        },
    
    //  --------------------------------------------------------  //

    //  IMPORTANT: This create the animations of skinned mesh.

        loadAction: function(){

            for (var i in arguments){
                var name = arguments[i];
            //  var data = Animations[ name ];
                var data;
                switch(this.gender){
                    case "male":
                        data = MaleAnimations[ name ];
                        break;
                    case "female":
                        data = FemaleAnimations[ name ];
                        break;
                    case false:
                        data = Animations[ name ];
                        break;
                    default:
                        data = Animations[ name ];
                }
            
                var action = new THREE.Animation( this.mesh, data );
                action.uuid = THREE.Math.generateUUID();
                action.weight = 1;
                action.currentTime = 0;
                action.timeScale = 1;   // action.data.length;
                this.actions[ name ] = action;
            }
        },

    //  --------------------------------------------------------  //

        reloadActions: function(){
            var self = this;

            this.stop();
            this.deleteAll();
            this.actions = {};

            if (!!this.gender && this.gender == "male") {
                Object.keys( MaleAnimations ).forEach(function(name, i){
                    self.loadAction( name );
                });
            }
            
            if (!!this.gender && this.gender == "female") {
                Object.keys( FemaleAnimations ).forEach(function(name, i){
                    self.loadAction( name );
                });
            }

            if ( !this.gender ) {
                Object.keys( Animations ).forEach(function(name, i){
                    self.loadAction( name );
                });
            }

            if ( !!this.gender && this.gender != "male" && this.gender != "female" ){
                console.warn("AW3D.AnimationHandler:",
                    "reloadActions(" + this.gender + ")", 
                    "Gender exists but is not male or female."
                );
            }

            if (!!this.actions.jump) this.actions.jump.loop = false;
        },

    //  --------------------------------------------------------  //

        promise: function( fn ){
            return new Promise(function(resolve, reject){
                if ( !fn ) resolve();
                if ( fn instanceof Function ) resolve( fn() );
                else resolve();
            });
        },

    };
