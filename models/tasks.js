'use strict';

module.exports = (sequelize, DataTypes) => {
    var tasks = sequelize.define(
    'task', 
    { 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        isDone: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false, 
            allowNull: false
        }, 
        isStarred: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false, 
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    tasks.associate = function(models) {
        models.tasks.belongsTo(models.lists, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return tasks;
};
/*
tasks.sync().then(() => {
    console.log('Get table <tasks> successfully or new table <tasks> created');
}).catch(err => {
    console.log('Tasks sync error = ', err);
}).finally(() => {

});*/
