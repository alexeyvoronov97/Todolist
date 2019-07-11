const uid = require('get-uid');
const models = require('../models');

function createList(req, res) {
    
    models.lists.create( {
        id: uid(), 
        userId: req.user.id,
        name : req.body.listName
    }).then( listData => {
        res.send(listData);
    });

};

function deleteList(req, res) {

    models.lists.findOne( {
        where: {
            id: req.params.listId
        }
    }).then(listData => {
        if(!listData) {
            res.send('List does not exist!');
        } else {
            listData.destroy();
            res.send('Deleted');
        }
    })
}

function updateList(req, res) {

    models.lists.update( { 
        name: req.body.listName },  { 
        where: {
            id: req.params.listId }
        }
    ).then( rowsUpdated => {
        res.send(rowsUpdated);
    });
}

function getLists(req, res) {
    models.lists.findAll( {
        where: {
            userId: req.user.id
        }
    }).then( listArray => {
        res.send(listArray);
    });
}

module.exports = {
    createList, 
    deleteList, 
    updateList, 
    getLists
};