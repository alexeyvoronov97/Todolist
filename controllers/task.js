const moment = require('moment');
const Sequelize = require('sequelize');

const models = require('../models');


function addTask(req, res) {

    models.tasks.findOrCreate({
        where: {
            listId: req.params.listId, 
            name: req.body.taskName
        }, 
        defaults: {
            listId: req.params.listId,
            name: req.body.taskName, 
            isDone: false, 
            isStarred: false
        }
    }).then( ([taskData, created]) => {
        res.send(taskData);
    });
};

function removeTask(req, res) {

    models.tasks.findOne( {
        where: {
            id: req.body.taskId
        }
    }).then(taskData => {
        if(!taskData) {
            console.log('Task does not exist!');
        } else {
            taskData.destroy();
            res.send('Deleted');
        }
    })
}

function moveTaskToOtherList(req, res) {

    models.lists.findOne( {
        where: { 
            name: req.body.listName
        }
    }).then(listData => {
        if(!listData) {
            res.send('List does not exist');
        } else {
            models.tasks.update( { 
                listId: listData.dataValues.id },  { 
                where: {
                    id: req.body.taskId }
                }
            ).then( rowsUpdated => {
                res.send(rowsUpdated);
            });
        }
    })
    
}

function setOrRemoveStarred(req, res) {
    models.tasks.findOne( {
        where: {
            id: req.body.taskId
        }
    }).then( taskData => {
        var status;

        if(taskData.dataValues.isStarred == true) {
            status = false;
        } else {
            status = true;
        }

        models.tasks.update( {
            isStarred: status }, {
            where: {
                id: req.body.taskId
            }
        }).then( rowsUpdated => {
            res.send(rowsUpdated);
        });
    })
}

function getStarredTasks(req, res) {
    models.tasks.findAll( {
        where: {
            isStarred: true
        }
    }).then( starredData => {
        res.send(starredData);
    });
}

function changeComment(req, res) {
    models.tasks.update( {
        comment: req.body.comment }, {
        where: {
            id: req.body.taskId 
        }
    } ).then( rowsUpdated => {
        res.send(rowsUpdated);
    });
}

function setDueDate(req, res) {
    models.tasks.update( {
        dueAt: req.body.dueDate }, {
        where: {
            id: req.body.taskId
        }
    }).then( rowsUpdated => {
        res.send(rowsUpdated);
    });
}

function getTodayTasks(req, res) {
    models.tasks.findAll( {
        where: {
            dueAt: new Date()
        }
    }).then( taskArray => {
        res.send(taskArray);
    });
}

function getWeekTasks(req, res) {
  
    var startOfWeek = moment().startOf('week');
    var endOfWeek = moment().endOf('week');

    console.log(startOfWeek, endOfWeek);

    const {or, and, gte, lte} = Sequelize.Op;

    models.tasks.findAll( {
        where: {
            [and]: [
                {dueAt: {[gte]: startOfWeek}}, 
                {dueAt: {[lte]: endOfWeek}}
            ]
        }
    }).then( taskArray => {
        res.send(taskArray);
    });
}

function getAllTasksFromListId(req, res) {
    models.tasks.findAll( {
        where: {
            listId: req.params.listId
        }
    }).then( taskArray => {
        res.send(taskArray);
    });
}

module.exports = {
    addTask, 
    removeTask, 
    moveTaskToOtherList, 
    setOrRemoveStarred, 
    getStarredTasks, 
    changeComment, 
    setDueDate, 
    getTodayTasks,
    getWeekTasks, 
    getAllTasksFromListId
};