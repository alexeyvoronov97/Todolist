const Sequelize = require('sequelize');
const model = require('./connect_db');

var users = model.sequelize.define(
    'user',     // 's' attaches at the end automatically 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        firstName: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    }
);

users.sync().then(() => {
    console.log('Get table <users> successfully or new table <users> created');
}).catch(err => {
    console.log('Users sync error = ', err);
}).finally(() => {
    //model.sequelize.close();
});
/*
var tasks = model.sequelize.define(
    'task', 
    {
        userId: {
            type: Sequelize.INTEGER
        }, 
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        }, 
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

tasks.sync().then(() => {

})
*/
module.exports = users;