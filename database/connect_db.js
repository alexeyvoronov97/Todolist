const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize('todolist', 'test', 'test', {
	host: '192.168.64.2',
	dialect: 'mysql',
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

sequelize.authenticate().then(() => {
	console.log("Successful!");
}).catch(err => {
	console.log("Error!",err);
}).finally(() => {
//	sequelize.close();
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;