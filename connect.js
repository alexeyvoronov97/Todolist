const mysql = require('mysql');

const connection = mysql.createConnection({
	host: '192.168.64.2',
	user: 'test',
	password: 'test',
	database: 'todolist-db'
});


connection.connect(function(err){
	(err) ? console.log(err) : console.log(connection);
});

module.exports = connection;