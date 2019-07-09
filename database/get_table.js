const Sequelize = require('sequelize');
const db = require('./connect_db');

var users = db.sequelize.define(
    'users', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        }, 
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, 
    {
        timestamps: false
    }
);

users.sync().then(() => {
    console.log('New table <users> created');
}).catch(err => {
    console.log('Users sync error = ', err);
}).finally(() => {
    //db.sequelize.close();
});

module.exports = users;