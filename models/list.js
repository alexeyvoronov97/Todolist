'use strict';

const mongoose = require('mongoose');

module.exports = {
    _userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }, 
    name: String
};