//  public/scripts/login.js

function loginSC(username, password){

    var data = {

        username: username,
        password: password

    };

    socket.emit("login", data, function(err, resdata){

        if (err) {
            console.error(err);
            return;
        } 

        if ( !!socket.getSignedAuthToken() && !!resdata.pathname){
            window.location.pathname = resdata.pathname;
        }

    });	
}
