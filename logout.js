//  public/scripts/logout.js

function logout(){

    socket.deauthenticate(function(err){
        if (err) console.log(err);
        
        if ( !socket.getSignedAuthToken() ){
            location.pathname = "/";
        }
    });	

}
