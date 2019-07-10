const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const models = require('../models');


router.post('/login', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;


	if(email && password) {
		models.users.findOne({
			where: {
				email: email
			}
		})
		.then(user => {
			if(user) {
				//const userData = user.get({ plain: true });


				if(bcrypt.compareSync(password, user.password)) {
					let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
						expiresIn: 10000	//100s
					});
					console.log('Login succeed!');
					res.send(token);
				}
			} else {
				console.log(`User is NULL!`);
				res.status(400).json({error: 'User does not exist'});
			}
		})
		.catch(err => {
			console.log('Log in : Finding user error ', err);
			res.status(404).json({error: err});
		});
		
	} else {
		console.log('Enter correct email and password!');
		res.status(400).json({error: 'Please enter Email and Password!'});
	}
});

router.post('/register', (req, res) => {
	const userData = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	}

	models.users.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if(!user) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash;
				models.users.create(userData).
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



module.exports = router;