module.exports = function(){
    const mongoose = require('mongoose');
    const env_url = {
        "test": "mongodb://localhost/ntalk_test",
        "development": "mongodb://localhost/ntalk"
    }
    const url = env_url[process.env.NODE_ENV || "development"];
    mongoose.Promise = global.Promise;
    return mongoose.connect(url);
}