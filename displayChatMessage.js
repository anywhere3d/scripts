//  displayChatMessage.js


    function displayChatMessage(data, options){

        var chatboard = $(chatboardSelector)[0];
        var $chatboard = $(chatboardSelector);

    //  Color.

        var backgroundColor;
        if (!!options && !!options.backgroundColor){
             backgroundColor = options.backgroundColor;
        } else {
            backgroundColor = "#333";
        }

        var color;
        if (!!options && !!options.color){
            color = options.color;
        } else {
            color = "azure";
        }
        
    //  Font.

        var fontWeight;
        if (!!options && !!options.weight){
            fontWeight = options.weight;
        } else {
            fontWeight = "normal";
        }
        
    //  Message.

        var name;
        if (!data.playerid) data.playerid = "Unknown";
        if (data.nickname == null || data.nickname == ""){
            name = data.playerid
                .toString()
                .toUpperCase()
                .replace(/[\W\d_]/g, "")
                .slice(0, 6);
        } else {
            name = data.nickname.toString();
        }

        var message = [name, data.message].join(": ");

    //  HTML.

        var style = [
            "font-weight:" + fontWeight + ";",
            "color:" + color + ";",
            "background-color:" + backgroundColor + ";"
        ].join(" ");

        var li = document.createElement("li");
        $(li).attr("style", style);
        if (!!options && !!options.typeClass){
            $(li).addClass( options.typeClass );
        }
        var div = document.createElement("div");
        $(div).addClass("messg-text");
        $(div).text( message );
        $(chatboardSelector).append( $(li).append(div) );
    
    //  Scroll.

        li.scrollIntoView({
            behavior: 'smooth'
        });

    }
