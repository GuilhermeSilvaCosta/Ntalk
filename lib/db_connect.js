'use strict';

const mongoose = require('mongoose');
let single_connection;
const env_url = {
    "test": "mongodb://localhost/ntalk_test",
    "development": "mongodb://localhost/ntalk"
}

module.exports = function(){        
    const url = env_url[process.env.NODE_ENV || "development"];
    if (!single_connection){
        single_connection = mongoose.connect(url);
    }
    mongoose.Promise = global.Promise;
    return single_connection;
}