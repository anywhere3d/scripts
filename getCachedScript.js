//  getCachedScript.js

/*  Usage:
 *  $.getCachedScript( "ajax/test.js" )
 *  .done(function( script, textStatus, jqxhr ) {
 *      console.log( textStatus );
 *  }).fail(function(err){
 *      console.error( err );
 *  }).always(function() {
 *      console.log( "complete" );
 *  });
 */
 
// Define a $.getCachedScript() method 
// that allows fetching a cached script;

jQuery.getCachedScript = function( url, options ) {

//  Allow user to set any option
//  except for dataType, cache, and url.
    options = $.extend( options || {}, {
        url: url,
        cache: true,
        dataType: "script"
    });
 
//  Use $.ajax() since it is more flexible than $.getScript
//  Return the jqXHR object so we can chain callbacks
    return jQuery.ajax( options );
};
     
jQuery.getFunction = function( url, options ) {
//  Allow user to set any option
//  except for dataType, cache, and url.
    options = $.extend( options || {}, {
        url: url,
        cache: false,
        dataType: "script"
    });
 
//  Use $.ajax() since it is more flexible than $.getScript
//  Return the jqXHR object so we can chain callbacks
    return jQuery.ajax( options );
};

jQuery.getCachedFunction = function( url, options ) {
//  Allow user to set any option
//  except for dataType, cache, and url.
    options = $.extend( options || {}, {
        url: url,
        cache: true,
        dataType: "script"
    });
 
//  Use $.ajax() since it is more flexible than $.getScript
//  Return the jqXHR object so we can chain callbacks
    return jQuery.ajax( options );
};
