const models = require('../models');

function createList(req, res) {
    
    models.lists.create( {
        _userId: req.user._id,
        name : req.body.listName }, 
        (err, listData) => {
            if(err) {
                res.send(err);
            } else {
                res.send(listData);
            }
        }
    );

};

function deleteList(req, res) {

    let errArray = {};

    models.lists.deleteOne( {
        _id: req.params.listId }, 
        err => {
            errArray[0] = err;
            //res.send(err);
        }
    );

    models.tasks.deleteMany( {
        _listId: req.params.listId }, 
        err => {
            errArray[1] = err;
            res.send(errArray);
        }
    );
}

function updateList(req, res) {

    models.lists.updateOne( { _id: req.params.listId }, { name: req.body.listName },  
        (err, result) => {
            if(err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
}

function getLists(req, res) {
    models.lists.find( { userId: req.user._id }, 
        (err, listArray) => {
            if(err) {
                res.send(err);
            } else {
                res.send(listArray);
            }
    });
}

module.exports = {
    createList, 
    deleteList, 
    updateList, 
    getLists
};