'use strict';

module.exports = (sequelize, DataTypes) => {
    var lists = sequelize.define(
        'list', 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }, 
            name: {
                type: DataTypes.STRING,
                allowNull: false
            } 
        }, 
        {
            timestamps: false
        }
    );
    
    lists.associate = function(models) {
        models.lists.belongsTo(models.users);
        models.lists.hasMany(models.tasks, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return lists;
};