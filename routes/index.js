const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

router.get('/', (req, res) => {
	res.send('This is a todo-list web app.');
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