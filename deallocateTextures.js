//  deallocateTextures.js

    function deallocateTextures(){
        var deallocate = {};

        for (var arg in arguments){
            deallocate[arg] = arguments[arg];
            arguments[arg] = null;
        }

        debugMode && console.log( "deallocate:", deallocate );

        for (var name in deallocate){
            if (!deallocate[name]) continue;
            deallocate[name].dispose();
            deallocate[name] = null;
            delete deallocate[name];
        }

    }
