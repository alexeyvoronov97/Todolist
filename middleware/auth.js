const jwt = require('jsonwebtoken');
const moment = require('moment');
var secret = process.env.SECRET_KEY;

exports.ensureAuth = function(req, res, next) {
    var auth = req.headers.authorization;

    if(!auth) {
        return res.status(403).send(err);
    }

    var token = auth.split(' ')[1];
    console.log(token);

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            console.log('Token verify error!', err);
            return res.status(404).send(err);
        }

        req.user = decoded;
        next();
    });
};