'use strict';

module.exports = (sequelize, DataTypes) => {
    var users = sequelize.define(
    'user',     // 's' attaches at the end automatically 
    {
        firstName: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    });

    users.associate = function(models) {
        models.users.hasMany(models.lists, {
            onDelete: "CASCADE", 
            foreignKey: {
                allowNull: false
            }
        });
    };


    return users;
};
/*
users.sync().then(() => {
    console.log('Get table <users> successfully or new table <users> created');
}).catch(err => {
    console.log('Users sync error = ', err);
}).finally(() => {
    //model.sequelize.close();
});



module.exports = users;*/