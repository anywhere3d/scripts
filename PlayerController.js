//  Player.js

    var world;
    var debugMode;
    var AnimationPanelControls;


    var Player = function(){

        this.getdata = function(){
        //  Collect position, direction, nickname, and gender.
            var data = {};
            data.playerid  = socket.id;
            data.nickname  = this.nickname;
            data.gender    = this.outfit.getGender();
            data.direction = this.outfit.direction.rotation.y;
            data.position  = this.outfit.direction.position.toArray();

        //  Collect outfits data.
            var outfit = this.outfit;
            var outfits = this.outfit.outfits;
            outfits.forEach( function( name ){
                if (!!outfit[name]) 
                    data[name] = outfit.getdata(name);
            });
    
            debugMode && console.log("player data:", data);
            return data;
        };

    //  Remote player set data.
        this.setdata = function( data ){
            
            if (!data.playerid || data.playerid != this.playerid) return;
            this.playerid = data.playerid;
            this.nickname = data.nickname;
            this.outfit.setGender( data.gender );
            this.outfit.direction.rotation.y = data.direction;
            this.outfit.direction.position.fromArray(data.position);

            if (data.action != undefined) {
                this.outfit.AnimationsHandler.stop();
                this.outfit.AnimationsHandler.play( data.action );
            }
        };

    //  Create player outfit from dna data.
        this.fromDNA = function( dna ){
            var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
            this.controller.direction = frontAngle;
            this.outfit.fromDNA( dna );
            scene.add(this.outfit.direction);
            this.outfit.update();
        };

    };

//  PlayerHolder is a THREE.Object3D. 
//  Rotation of playerHolder do not rotate "outfit[name]".
//  At init time "outfit[name].geometry Y" has rotated Math.PI/2.

//        localPlayer.holder, 
//        localPlayer.holderHelper,
//        localPlayer.directionPointer,
//        localPlayer.sphere,
//        localPlayer.pointer,

    var localPlayer = new Player();
    
    localPlayer.holder = AW3D.PlayerHolder(); // IMPORTANT //
    localPlayer.holderHelper = AW3D.PlayerHolderHelper();
    scene.add( localPlayer.holder, localPlayer.holderHelper );

//  localPlayer.directionPointer = AW3D.DirectionPointer();
    localPlayer.sphere = AW3D.PlayerSphere();
    localPlayer.holder.add( localPlayer.sphere ); 

//    localPlayer.pointer = AW3D.PlayerPointer();
//    scene.add(localPlayer.pointer);

    localPlayer.outfit = AW3D.Outfit( localPlayer ); // IMPORTANT //
    debugMode && console.log( "localPlayer.outfit:", localPlayer.outfit );






/*
//  localPlayerFromDNA.js

    function localPlayerFromDNA( dna ){
        var frontAngle = Math.PI - cameraControls.getFrontAngle(); // face front.
        localPlayer.controller.direction = frontAngle;
        localPlayer.outfit.fromDNA( dna );
        scene.add(localPlayer.outfit.direction);
        localPlayer.outfit.update();
    }
*/







//  MW cameraControls.js

    var cameraControls;

//  Camera offsets.

    var hatOffset    = 30;
    var headOffset   = 25;
    var torsoOffset  = 20;
    var hipsOffset   = 15;
    var legsOffset   = 10;
    var socksOffset  =  5;
    var shoesOffset  =  0;
    var groundOffset =  0;

//  var radius = 36; 

//  MW TPS cameraControl.js

    cameraControls = new MW.TPSCameraControl(camera, localPlayer.holder, {
        el: renderer.domElement,               // html renderer element.
        offset: new THREE.Vector3( 0, 15, 0 ), // eye height.
        radius: 40,      // default: 37 // (distance of the character to the camera).
        minRadius: 6,    // default: 10 // (can take and negative values, yes!!!).
        maxRadius: 100,  // default: 64, runtime: 40.
        rigidObjects: [] // collition objects for the camera.
    });

    function cameraOffset(offset){
        if (!!cameraControls) cameraControls.offset.y = offset;
    }

//  The "updated" event is fired by "cameraControls.update()"
//  Used in "keyInputControls.js" and "joystickControls.js" event listeners.

//  If we want camera to have collision with any objects (e.g. ground), 
//  we add (push) the objects (e.g. ground) in cameraControls rigidObjects.
//  cameraControls.rigidObjects.push( ground );






//  AW3D PlayerController.js

    localPlayer.controller = new MW.CharacterController( localPlayer.holder, localPlayer.radius );
    localPlayer.controller.radius   = 1;  // VERY IMPORTANT //
    localPlayer.controller.center.set(-100, 1, 200);
    debugMode && console.log( "initial position:", localPlayer.controller.center );

    localPlayer.controller.getdata = function(action){

        var data = {};
        data.playerid = socket.id;
        data.radius = this.radius;
        data.isGrounded = this.isGrounded;
        data.isOnSlope = this.isOnSlope;
        data.isIdling  = this.isIdling;
        data.isJumping = this.isJumping;
        data.isRunning = this.isRunning;
        data.isWalking = this.isWalking;
        data.direction = this.direction;
        data.movementSpeed = this.movementSpeed;
        data.jumpStartTime = this.jumpStartTime;
        data.position = this.center.toArray();
        if (!!action) data.action = action;

        return data;
    };

    world.add( localPlayer.controller );

    debugMode && console.log( 
        "world.characterPool length:", world.characterPool.length, 
        "index:", world.characterPool.indexOf( localPlayer.controller )
    );

    localPlayer.controller.addEventListener("startIdling",  onStartIdling);
    localPlayer.controller.addEventListener("startRunning", onStartRunning);
    localPlayer.controller.addEventListener("startJumping", onStartJumping);
    localPlayer.controller.addEventListener("endJumping",   onEndJumping);
    localPlayer.controller.addEventListener("startSliding", onStartSliding);
    localPlayer.controller.addEventListener("startFalling", onStartFalling);

    function onStartIdling(){
    //  debugMode && console.log( "localPlayer.controller:", "startIdling:" );
    //  Send move player mesasge to server.
    }

    function onStartRunning(){
    //  debugMode && console.log( "localPlayer.controller:", "startRunning:" );
    //  Send move player mesasge to server.
    }

    function onStartJumping(){
        localPlayer.outfit.AnimationsHandler.weightOff("idle", "walk", "run");
    //  debugMode && console.log( "localPlayer.controller:", "startJumping:" );
    //  Send startJumping message to server.
    }

    function onEndJumping(){
        localPlayer.outfit.AnimationsHandler.weightOn("idle", "walk", "run");
    
    //  Hack: Overwriting player controller jump.
    //  Stoping automate walk on landing. 
    //  Handles outfit animation on end of jumping when 
    //  move key released and controller is on air (jump).

        if ( debugMode) {
        //  console.log("joystick 1 controls is not active:", !joystick1.isActive );
        //  console.log("keyInputControls is not keyholded:", !keyInputControls.isMoveKeyHolded );
        //  console.log("AnimationPanelControls not active:", !AnimationPanelControls.isActive );
        }

        if ( !!AnimationPanelControls ) {

            if ( !joystick1.isActive 
              && !keyInputControls.isMoveKeyHolded
              && !AnimationPanelControls.isActive ){

                localPlayer.outfit.AnimationsHandler.stop();        
                localPlayer.controller.isRunning = false;
                localPlayer.controller.isWalking = false;
                localPlayer.controller.isIdling  = true;
                localPlayer.controller.movementSpeed = 0;
                localPlayer.outfit.AnimationsHandler.play("idle");
                localPlayer.controller.dispatchEvent({type:"startIdling"});

            } else {

                localPlayer.outfit.AnimationsHandler.stop();
                localPlayer.controller.isRunning = true;
                localPlayer.controller.isWalking = true;
                localPlayer.controller.isIdling  = false;
                localPlayer.controller.movementSpeed = 28;
                localPlayer.outfit.AnimationsHandler.play("walk");
                localPlayer.controller.dispatchEvent({type:"startRunning"});
            }

        } else {

            if ( !joystick1.isActive && !keyInputControls.isMoveKeyHolded ){

                localPlayer.outfit.AnimationsHandler.stop();        
                localPlayer.controller.isRunning = false;
                localPlayer.controller.isWalking = false;
                localPlayer.controller.isIdling  = true;
                localPlayer.controller.movementSpeed = 0;
                localPlayer.outfit.AnimationsHandler.play("idle");
                localPlayer.controller.dispatchEvent({type:"startIdling"});

            } else {

                localPlayer.outfit.AnimationsHandler.stop();
                localPlayer.controller.isRunning = true;
                localPlayer.controller.isWalking = true;
                localPlayer.controller.isIdling  = false;
                localPlayer.controller.movementSpeed = 28;
                localPlayer.outfit.AnimationsHandler.play("walk");
                localPlayer.controller.dispatchEvent({type:"startRunning"});
            }

        }

    //  debugMode && console.log( "localPlayer.controller:", "endJumping:" );

    //  Player controller "endJumping" listener is the only that
    //  send socket control event to server. All other control events
    //  (move/jump/idle) send from input/joystick/action controllers.

    //  Send startJumping message to server.

        if ( !!AnimationPanelControls ) {

            if ( joystick1.isActive 
              || keyInputControls.isMoveKeyHolded 
              || AnimationPanelControls.isActive ){

                if (!!controlsChannel) controlsChannel.publish({ 
                    playerid : socket.id,
                    direction: localPlayer.outfit.direction.rotation.y,
                    position : localPlayer.outfit.direction.position.toArray(),
                    action   : "walk",
                });

            } else {

                if (!!controlsChannel) controlsChannel.publish({ 
                    playerid : socket.id,
                    direction: localPlayer.outfit.direction.rotation.y,
                    position : localPlayer.outfit.direction.position.toArray(),
                    action   : "idle",
                });
            }

        } else {

            if ( joystick1.isActive 
              || keyInputControls.isMoveKeyHolded ){

                if (!!controlsChannel) controlsChannel.publish({ 
                    playerid : socket.id,
                    direction: localPlayer.outfit.direction.rotation.y,
                    position : localPlayer.outfit.direction.position.toArray(),
                    action   : "walk",
                });

            } else {

                if (!!controlsChannel) controlsChannel.publish({ 
                    playerid : socket.id,
                    direction: localPlayer.outfit.direction.rotation.y,
                    position : localPlayer.outfit.direction.position.toArray(),
                    action   : "idle",
                });
            }

        }

    }
    
    function onStartSliding(){
    //  debugMode && console.log( "localPlayer.controller:", "startSliding:" );
    }
    
    function onStartFalling(){
    //  debugMode && console.log( "localPlayer.controller:", "startFalling:" );
    }
