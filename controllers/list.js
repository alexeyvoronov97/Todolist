const models = require('../models');

function addList(req, res) {
    
    var listName = req.body.listName;
    
    
    models.lists.findOrCreate({
        where: {
            name: listName
        }, 
        defaults: {
            name : listName
        }
    }).then( (match, created) => {
        console.log(created);
    });

};

// function removeList(req, res) {
//     var listName = req.body.listName;

// }

module.exports = {
    addList
};