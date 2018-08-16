//  generateSalt.js

function generateSalt(length, set){
    var length = length || 10;
    var set = set || "abcdefghijklmnopqurstuvwxyz0123456789ABCDEFGHIJKLMNOPQURSTUVWXYZ";
    var salt = "";
    for (var i = 0; i < length; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}
