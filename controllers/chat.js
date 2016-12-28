module.exports = function(app){
    const ChatController = {
        index: function(req, res){
            // const params = {
            //     email: req.params.email
            // };
            var params = {sala: req.query.sala}; 
            res.render('chat/index', params);
        }
    };
    return ChatController;
};