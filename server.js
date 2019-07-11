const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
var models = require('./models');

var app = express();

app.use(cors());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


var routes = require('./routes/index');
var user = require('./routes/user');
var list = require('./routes/list');
var task = require('./routes/task');


app.use('/', routes);
app.use('/user', user);
app.use('/list', list);
app.use('/task', task);


//require('./routes/html-routes')(app);
//to => require('./routes/html-routes')(app, connection);

models.sequelize.sync().then(() => {

	models.users.sync();
	models.lists.sync();
	models.tasks.sync();

	console.log('Sequelize Sync Succeed');

	const port = process.env.PORT || 3000;
	
	app.listen(port, () => {
		console.log(`App running on port ${port}`);
	});
	app.on('error', onError);
	app.on('listening', onListening);
}).catch(err => {
	console.log('Sequelize sync error:', err);
});

function onError(err) {
	if (err.syscall !== 'listen') {
		throw err;
	}

	var bind = typeof port === 'string'
		? 'Pipe' + port
		: 'Port' + port;

	switch (err.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw err;
	};
}

function onListening() {
	var addr = app.address();
	var bind = typeof addr === 'string'
    	? 'pipe ' + addr
    	: 'port ' + addr.port;
  	debug('Listening on ' + bind);
}

