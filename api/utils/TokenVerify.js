const jwt = require('jsonwebtoken');

function verifyToken (auth) {
    let token = '';
    if(auth && auth.toLowerCase().startsWith('bearer')) {
        token = auth.substring(7);
    }

    let decodeToken = {}

    try {
        decodeToken = jwt.verify(token, '123123123');
    } catch (error) {
        console.log("Token invalido");
        return false;
    }
    
    if (!token || !decodeToken._id) {
        return false;
    }

    return true;
}

module.exports = verifyToken