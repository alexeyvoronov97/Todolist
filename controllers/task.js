const moment = require('moment');
const models = require('../models');


function createTask(req, res) {
    let time = moment.utc();
    
    models.tasks.create( {
        _listId: req.body.listId,
        name: req.body.taskName, 
        createdAt: time, 
        dueDate: time
    }, (err, taskData) => {
        if(err) {
            res.send(err);
        } else {
            res.send(taskData);
        }
    });
};

function deleteTask(req, res) {

    models.tasks.deleteOne( { _id: req.params.taskId }, 
        err => {
            res.send(err);
        }
    );
}

function updateTask(req, res) {
    models.tasks.updateOne( { _id: req.params.taskId }, req.body, 
        (err, result) => {
            if(err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
}

function getStarredTasks(req, res) {
    models.tasks.find( { isStarred: true }, 
        (err, starredData) => {
            if(err) {
                res.send(err);
            } else {
                res.send(starredData);
            }
        }
    );
}

function getTodayTasks(req, res) {
    
    let today = moment.utc().startOf('day');
    let tomorrow = moment(today).add(1, 'days');
    
    var query = {
        dueDate: {
            $gte: today,
            $lt: tomorrow
        }
    };

    models.tasks.find( query, 
        (err, todayData) => {
            if(err) {
                res.send(err);
            } else {
                res.send(todayData);
            }
        }
    );
}

function getWeekTasks(req, res) {
  
    var startOfWeek = moment.utc().startOf('week');
    var endOfWeek = moment.utc().endOf('week');

    var query = {
        dueDate: {
            $gte: startOfWeek,
            $lte: endOfWeek
        }
    };

    models.tasks.find( query, 
        (err, todayData) => {
            if(err) {
                res.send(err);
            } else {
                res.send(todayData);
            }
        }
    );
}

function getTasksOfList(req, res) {
    models.tasks.find( { _listId: req.params.listId }, 
        (err, taskArray) => {
            if(err) {
                res.send(err);
            } else {
                res.send(taskArray);
            }
        }
    );
}

function getDoneTasks(req, res) {
    models.tasks.find( { isDone: true }, 
        (err, doneData) => {
            if(err) {
                res.send(err);
            } else {
                res.send(doneData);
            }
        }
    );
}

module.exports = {
    createTask, 
    deleteTask, 
    updateTask, 
    getStarredTasks, 
    getTodayTasks,
    getWeekTasks, 
    getTasksOfList, 
    getDoneTasks
};