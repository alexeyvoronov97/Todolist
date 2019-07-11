'use strict';

module.exports = (sequelize, DataTypes) => {
    var users = sequelize.define(
    'user',     // 's' attaches at the end automatically 
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true
        }, 
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
