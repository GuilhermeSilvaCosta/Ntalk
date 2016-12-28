const redis = require('redis'),
      express = require('express-session'),
      redisStore = require('connect-redis')(express),      
      socketio = require('socket.io-redis');
    
exports.getClient = function(){
    return redis.createClient();
}

exports.getExpressStore = function(){
    return redisStore;
}

exports.getSocketStore = function(){
    return socketio;
}