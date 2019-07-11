const jwt = require('jsonwebtoken');
const moment = require('moment');
var secret = process.env.SECRET_KEY;

module.exports = function(req, res, next) {
    var auth = req.headers.authorization;

    if(!auth) {
        return res.send('No authorization');
    }

    var token = auth.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.send(err);
        }

        req.user = decoded;
        next();
    });
};