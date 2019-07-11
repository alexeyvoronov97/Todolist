const models = require('../models');

function addList(req, res) {
    
    
    models.lists.findOrCreate({
        where: {
            name: req.body.listName
        }, 
        defaults: {
            userId: req.user.id,
            name : req.body.listName
        }
    }).then( ([listData, created]) => {
        console.log(listData.get( {
            plain: true
        }));
        res.send(listData);
    });

};

function removeList(req, res) {

    models.lists.findOne( {
        where: {
            id: req.body.listId
        }
    }).then(listData => {
        if(!listData) {
            console.log('List does not exist!');
        } else {
            listData.destroy();
            res.send('Delected');
        }
    })
}

function editList(req, res) {

    models.lists.update( { 
        name: req.body.name },  { 
        where: {
            id: req.body.listId }
        }
    ).then( rowsUpdated => {
        res.send(rowsUpdated);
    }).catch( err => {
        res.send(err);
    });
}

function getAllLists(req, res) {
    models.lists.findAll().then( listArray => {
        res.send(listArray);
    });
}

module.exports = {
    addList, 
    removeList, 
    editList, 
    getAllLists
};