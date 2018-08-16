//  socketclusterConnect.js

    function socketclusterConnect(){

    //  Initiate the connection to the server.
        socket = socketCluster.connect();

        socket.on("error", function (err) {
            throw "Socket error - " + err;
        });

        socket.on("connect", function () {
            console.log("CONNECTED to WEBSPACES");
            console.log("socket.id:", this.id);

    //  Players Channel.

            var webspacesPlayersChannel = socket.subscribe( "players" );
        //  On subscribe success.
            webspacesPlayersChannel.on("subscribe", function (name) {
                console.log("Subscribed to", name, "channel.");
            });
        //  On Subscribe error.
            webspacesPlayersChannel.on("subscribeFail", function (err) {
                console.log("Failed to subscribe to the players channel due to error:", err);
            });
        //  On unsubscribe.
            webspacesPlayersChannel.on("unsubscribe", function (name) {
                console.log("Unsubscribed from players channel:", name);
            });
        //  Watch channel.
            webspacesPlayersChannel.watch( function(data){ 
    
                if ( !data.playerid ) return;
                if ( !data.nickname ) return;
                if ( data.playerid == socket.id ) return;
        
                switch (data.eventType) {
                //  Add player eventType:
                    case "add player": 
                        addPlayerEvent(data); 
                        break;
                //  Remove player eventType:
                    case "remove player": 
                        removePlayerEvent(data);  
                        break;
                //  Unhandled eventType:
                    default: console.log( "Receiving unhadled event type:", data.eventType, "data:", data );
                }
            });


    //  Personal Channel.

            myChannelName = this.id
                            .toString()
                            .toUpperCase()
                            .replace(/[\W\d_]/g, "")
                            .slice(0, 6);
        
            myPersonalChannel = this.subscribe( myChannelName );
        //  On subscribe success.
            myPersonalChannel.on("subscribe", function ( name ) {
                console.log("Subscribed to my presonal channel:", name );
            });
        //  On subscribe error.
            myPersonalChannel.on("subscribeFail", function (err) {
                console.log("Failed to subscribe to my personal channel due to error:", err);
            });
        //  On unsubscribe.
            myPersonalChannel.on("unsubscribe", function (name) {
                console.log("Unsubscribed from my personal channel:", name);
            });
        //  Watch channel.
            myPersonalChannel.watch( function(data){ 
                if ( !data.playerid ) return;
                if ( !data.nickname ) return;
                if ( data.playerid == socket.id ) return;

                switch (data.eventType) {
                //  Add player eventType:
                    case "add player": 
                        addPlayerEvent(data); 
                        break;
        
                //  Remove player eventType:
                    case "remove player": 
                        removePlayerEvent(data);  
                        break;
                //  Unhandled eventType:
                    default: console.log( "Receiving unhadled event type:", data.eventType, "data:", data );
                }
            });


    //  Controls Channel.

            controlsChannel = socket.subscribe( "controls", {
            //  waitForAuth: true,
            //  data: somedata,
                batch:true
            });
        //  On subscribe success.
            controlsChannel.on("subscribe", function (name) {
                console.log("Subscribed to", name, "channel.");
            });
        //  On Subscribe error.
            controlsChannel.on("subscribeFail", function (err) {
                console.log("Failed to subscribe to the controls channel due to error:", err);
            });
        //  On unsubscribe.
            controlsChannel.on("unsubscribe", function (name) {
                console.log("Unsubscribed from chat channel:", name);
            });
        //  Watch channel.
            controlsChannel.watch( function (data) {
            //  debugMode && console.log( data.playerid );
                if ( data.playerid == socket.id ) return;

            //  data format:
            //     data.playerid  = socket.id;
            //     data.direction = localPlayer.outfit.direction.rotation.y;
            //     data.position  = localPlayer.outfit.direction.position.toArray();
            //     data.action    = "action";

                if ( !RemotePlayersManager[ data.playerid ] ) return;
                var remotePlayer = RemotePlayersManager[ data.playerid ];
                if ( data.direction != undefined ) remotePlayer.outfit.direction.rotation.y = data.direction;
                if ( data.position  != undefined ) remotePlayer.outfit.direction.position.fromArray( data.position );
                if ( data.action    != undefined ) {
                    remotePlayer.outfit.AnimationsHandler.stop();
                    remotePlayer.outfit.AnimationsHandler.play( data.action );
                }
            });
            
            window.sendControlData = function _send_control_data(){
           //  Send move player mesasge to server.
                if ( !!controlsChannel ) controlsChannel.publish({ 
                    playerid : socket.id,
                    direction: localPlayer.outfit.direction.rotation.y,
                    position : localPlayer.outfit.direction.position.toArray(),
                });
            };

    //  Chat Channel.

            chatChannel = socket.subscribe( "chat", {
            //  waitForAuth: true,
            //  data: "any data",
                batch: true
            });
        //  On subscribe success.
            chatChannel.on("subscribe", function (name) {
                console.log("Subscribed to", name, "channel.");
            });
        //  On Subscribe error.
            chatChannel.on("subscribeFail", function (err) {
                console.log("Failed to subscribe to the chat channel due to error:", err);
            });
        //  On unsubscribe.
            chatChannel.on("unsubscribe", function (name) {
                console.log("Unsubscribed from chat channel:", name);
            });
        //  On watch channel.
            chatChannel.watch( function (data) {

                if ( !!data.options ) {
                    displayChatMessage(data, data.options);
                    return;
                } 
                
                if ( !data.options && data.playerid == socket.id ) {
                    var options = {};
                    if ( localPlayer.outfit.getGender("female") ){
                        options.color = "white";
                        options.backgroundColor = "hotpink";
                    } else if ( localPlayer.outfit.getGender("male") ){
                        options.color = "white";
                        options.backgroundColor = "cornflowerblue";
                    } else if ( !localPlayer.outfit.getGender() ){
                        options.color = "yellow";
                        options.backgroundColor = "saddlebrown";
                    } else {
                        options.color  = "black";
                        options.weight = "bold";
                        options.backgroundColor = "aliceblue";
                    }
                    displayChatMessage(data, options);
                    return;
                }
                displayChatMessage(data);
            });

        //  Send your self to connected players in webspace and
        //  get back each remote player from "myPersonalChannel".

            if ( !!localPlayer ){
                try {
                //  Add local player data to server socket.
                    var data = localPlayer.getdata();
                    socket.emit("LocalPlayerData", data, function(err, resData){
                        console.log("response data:", resData);
                    });
                //  Send your outfit to existed players.
                    data.eventType = "add player";
                    data.channel = myChannelName;
                    socket.publish( "players", data );
                } catch(err) {
                    debugMode && console.error(err);
                }
            }

            try { 
                $(chatboardSelector).html("");
                displayChatMessage({
                    playerid: null,
                    nickname: "SYSTEM",
                    message: "You are connected."
                }, { 
                    color: "azure",
                    typeClass: "system",
                    backgroundColor: "#000099", 
                });

            } catch(err) {
                console.error(err);
            }

        }); // END socket.connect.

        socket.on("disconnect", function(){

        //  Remove all remote players in RemotePlayersManager.
            for ( var name in RemotePlayersManager ){
                removeRemotePlayer( name );
            }
            debugMode && console.log(
                "RemotePlayersManager:", RemotePlayersManager
            );

        //  Unsubscribe, unwatch, destory all channels.
            for ( var name in this.channels ){
                this.channels[ name ].destroy();
            }
            debugMode && console.log("channels:", this.channels);

            console.log("DISCONNECTED from WEBSPACE");

        //  Disconnected chat message.
            displayChatMessage({
                playerid: null,
                nickname: "SYSTEM",
                message: "You disconnected."
            }, { 
                color: "azure",
                typeClass: "system",
                backgroundColor: "#cc0000" ,
            });
        });

    //  Connection Helper.
        socket.on("connect", function(){
            $(connectHelperSelector).text("Disonnect from server");
        });
    
        socket.on("disconnect", function(){
            $(connectHelperSelector).text("Connect to server");
        });

    }
