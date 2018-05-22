//  imgurQualityUrl.js


    function imgurQualityUrl(id, ext, quality){

        if (!id) return "https://i.imgur.com/ODeftia.jpg";
        var ext    = ext || "jpg";
        var map_id = id || "ODeftia";
        var q      = quality || "original";
        var imgur  = "https://i.imgur.com/";
    
        switch (q) {

            case null:
            case undefined:
            case "original":
                break;
    
            case "small":
                map_id += "s";
                break;
    
            case "big":
                map_id += "b";
                break;
    
            case "thumb":
                map_id += "t";
                break;
    
            case "medium":
                map_id += "m";
                break;
    
            case "large":
                map_id += "l";
                break;

            case "huge":
                map_id += "h";
                break;

            default:
                map_id;
        }

        return imgur + map_id + "." + ext;
    }
