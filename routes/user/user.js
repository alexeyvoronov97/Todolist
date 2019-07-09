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
				//const userData = user.get({ plain: true });


				if(bcrypt.compareSync(password, user.password)) {
					let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
						expiresIn: 1440
					})
					console.log('Login succeed!');
					response.send(token);
				}
			} else {
				console.log(`User is NULL!`);
				response.status(400).json({error: 'User does not exist'});
			}
		})
		.catch(err => {
			console.log('Log in : Finding user error ', err);
			response.status(404).json({error: err});
		});
		
	} else {
		console.log('Enter correct emain and password!');
		response.status(400).json({error: 'Please enter Email and Password!'});
	}
});

router.post('/register', (req, res) => {
	const userData = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	}

	users.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if(!user) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash;
				users.create(userData).
				then(user => {
					console.log(userData, ' registered!');
				})
				.catch( err => {
					console.log('Registration Error!:', err);
				});
			})
		} else {
			console.log('User already exists!');
		}
	})
	.catch(err => {
		console.log('Finding error:',err);
	});
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