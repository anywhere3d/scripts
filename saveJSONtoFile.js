//  saveJSONtoFile.js

function saveJSONtoFile( json, name ){
    if ( !!json ){
        var blob = new Blob([ json ], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.download = name + ".json";
        a.href = url;
        $(a).one("click", function(){
            URL.revokeObjectURL( url );
            $(a).remove();
        });
        a.click();
    }
}
