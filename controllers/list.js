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

// function removeList(req, res) {
//     var listName = req.body.listName;

// }

module.exports = {
    addList
};