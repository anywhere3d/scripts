//  public/scripts/getUser.js

function getUser(data){
    return new Promise( function(resolve, reject){
        socket.emit("getuser", data, function(err, response){
        	if (err) {
                reject(err);
        	} else {
                resolve(response);
            }
        });	
    });
}
