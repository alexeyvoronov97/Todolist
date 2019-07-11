const models = require('../models');

function addTask(req, res) {
    
    models.lists.findOne( {
        where: {
            id: req.body.listId
        }
    }).then(list => {
        if(!list) {
            res.send('listId is not valid');
        }
        else {
            models.tasks.findOrCreate({
                where: {
                    name: req.body.taskName
                }, 
                defaults: {
                    listId: req.body.listId,
                    name: req.body.taskName, 
                    isDone: false, 
                    isStarred: false
                }
            }).then( ([taskData, created]) => {
                console.log(taskData.get({
                    plain: true
                }));
                res.send(taskData);
            });
        }
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
            id: req.body.id
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
                id: req.body.id
            }
        }).then( rowsUpdated => {
            res.send(rowsUpdated);
        });
    })
}

module.exports = {
    addTask, 
    removeTask, 
    moveTaskToOtherList, 
    setOrRemoveStarred
};