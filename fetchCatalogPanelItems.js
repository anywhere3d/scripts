//  fetchCatalogPanelItems.js

function fetchCatalogPanelItems( domElement_id ){

    var endpoint = editorHolderButton.fetchOptions.endpoint;

    var data = {
        selectors: JSON.stringify( editorHolderButton.fetchOptions.selectors ),
        options:   JSON.stringify( editorHolderButton.fetchOptions.options ),
    };

    debugMode && console.log("data:", data);

    var jqxhr = $.post( endpoint, data, function(data, status, xhr){
        debugMode && console.log("post %s: %s", endpoint, status);
    }).then( function( data ){
        debugMode && console.log("data:", data);
        w3.displayObject( domElement_id, data );
    //  pager initial values.
        var page_index = parseInt( options.skip / options.limit );
        $("span#page").text( page_index + 1 );
        $("span#from").text( options.skip + 1 );
        $("span#to").text(options.skip + data.success.length);
    });

    jqxhr.done( function(){
        $EditorPanel.dialog("open");
    });

    jqxhr.fail( function( err ){
    //  console.error(err);
        throw err;
    });

}
