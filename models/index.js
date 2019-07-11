const Sequelize = require('sequelize');
const sequelize = new Sequelize('todolist', 'test', 'test', {
	host: '192.168.64.2',
	dialect: 'mysql',
	// operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

var db = {};

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');

	db.users = sequelize.import('./users');
	db.lists = sequelize.import('./lists');
	db.tasks = sequelize.import('./tasks');


	db.users.associate(db);
	db.lists.associate(db);
	db.tasks.associate(db);
}).catch(err => {
	console.log('Unable to connect to the database:',err);
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;