const jwt = require('jsonwebtoken');
const q = require('q');

function generateToken(id, name, email, client_id, role, secret = process.env.JWT_CLIENT_SECRET) {
    let promise = q.defer();

    let payload = {
        id: id,
        email: email,
        name: name,
        client_id: client_id,
        role: role
    };
    let options = {
        expiresIn: '1y',
        audience: process.env.JWT_CLIENT_AUDIENCE,
        algorithm: process.env.JWT_ALGO
    }

    jwt.sign(payload, new Buffer(secret, 'base64'), options, function (err, token) {
        return promise.resolve(token);
    })

    return promise.promise;
}

module.exports = {
    generateToken
}