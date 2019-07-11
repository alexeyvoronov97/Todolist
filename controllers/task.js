const moment = require('moment');
const Sequelize = require('sequelize');
const uid = require('get-uid');
const models = require('../models');


function createTask(req, res) {

    models.tasks.create( {
        id: uid(), 
        listId: req.body.listId,
        name: req.body.taskName, 
        isDone: false, 
        isStarred: false
    }).then( taskData => {
        res.send(taskData);
    });
};

function deleteTask(req, res) {

    models.tasks.findOne( {
        where: {
            id: req.params.taskId
        }
    }).then(taskData => {
        if(!taskData) {
            res.send('Task does not exist!');
        } else {
            taskData.destroy();
            res.send('Deleted');
        }
    })
}

function moveToOtherList(req, res) {

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
                    id: req.params.taskId }
                }
            ).then( rowsUpdated => {
                res.send(rowsUpdated);
            });
        }
    })
    
}

function updateTask(req, res) {
    models.tasks.update(req.body, {
        where: {
            id: req.params.taskId
        }
    }).then( rowsUpdated => {
        res.send(rowsUpdated);
    });
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

function getTasksOfList(req, res) {
    models.tasks.findAll( {
        where: {
            listId: req.params.listId
        }
    }).then( taskArray => {
        res.send(taskArray);
    });
}

function getDoneTasks(req, res) {
    models.tasks.findAll( {
        where: {
            isDone: true
        }
    }).then( doneData => {
        res.send(doneData);
    });
}

module.exports = {
    createTask, 
    deleteTask, 
    moveToOtherList, 
    updateTask, 
    getStarredTasks, 
    getTodayTasks,
    getWeekTasks, 
    getTasksOfList, 
    getDoneTasks
};