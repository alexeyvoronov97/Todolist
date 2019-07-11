const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uid = require('get-uid');
const models = require('../models');

function login(req, res) {
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
						expiresIn: '1d'	//1 day
					});
					console.log('Login succeed!');
					res.send(token);
				}
			} else {
				console.log(`User is NULL!`);
				res.send({error: 'User does not exist'});
			}
		})
		.catch(err => {
			console.log('Log in : Finding user error ', err);
			res.send(err);
		});
		
	} else {
		console.log('Enter correct email and password!');
		res.send({error: 'Please enter Email and Password!'});
	}
};

function register(req, res) {
	const userData = {
        id: uid(),
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
					res.send(userData);
				})
				.catch( err => {
					console.log('Registration Error!:', err);
					res.send(err);
				});
			})
		} else {
			console.log('User already exists!');
			res.send({error: 'User already exists'});
		}
	})
	.catch(err => {
		console.log('Finding error:',err);
		res.send(err);
	});
};

module.exports = {
    login, 
    register
}