const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


var users = require('./routes/user/user');

app.use('', users);


//require('./routes/html-routes')(app);
//to => require('./routes/html-routes')(app, connection);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});

