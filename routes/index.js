const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

process.env.SECRET_KEY = 'secret';

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/login.html'));
});

router.get('/home', (req, res) => {
	if(req.session.loggedIn) {
		res.send('Welcome back, ' + req.session.email + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
})


module.exports = router;