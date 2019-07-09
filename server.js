const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var connection = require('./connect');
var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app = require('./login');


//require('./routes/html-routes')(app);
//to => require('./routes/html-routes')(app, connection);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});

