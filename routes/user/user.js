const express = require('express');
const router = express.Router();
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const users = require('../../database/get_table');


process.env.SECRET_KEY = 'secret';


router.use(cors());


router.get('/', (request, response) => {
	response.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/login', (request, response) => {
	var email = request.body.email;
	var password = request.body.password;


	if(email && password) {
		users.findOne({
			where: {
				email: email
			}
		})
		.then(user => {
			if(user) {
				const userData = user.get({ plain: true });

				if(bcrypt.compareSync(password, userData.password)) {
					let token = jwt.sign(userData, process.env.SECRET_KEY, {
						expiresIn: 1440
					})
					response.send(token);
				}
			} else {
				response.status(400).json({error: 'User does not exist'});
			}
		})
		.catch(err => {
			console.log('Log in : User find error =', err);
			response.status(404).json({error: err});
		});
		
	} else {
		response.status(400).json({error: 'Please enter Email and Password!'});
	}
});

router.post('/register', (req, res) => {
	
});

router.get('/home', (request, response) => {
	if(request.session.loggedin) {
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
})


module.exports = router;