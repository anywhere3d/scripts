//  public/scripts/signup.js

function signupSC(fullname, username, email, password){
    
    var data = {

        fullname: fullname,
    	username: username,
    	email:    email,
    	password: password,

    };

    socket.emit("signup", data, function(err, resdata){

    	if (err) {
            console.error(err);
            return;
    	}

        if ( !!socket.getSignedAuthToken() && !!resdata.pathname){
            window.location.pathname = resdata.pathname;
        }

    });

}
