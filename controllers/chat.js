module.exports = function(app){
    const ChatController = {
        index: function(req, res){
            const params = {
                email: req.params.email
            };
            res.render('chat/index', params);
        }
    };
    return ChatController;
};