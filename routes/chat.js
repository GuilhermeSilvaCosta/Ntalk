module.exports = function(app){
    const chat = app.controllers.chat;
    app.get('/chat/:email', chat.index);
};