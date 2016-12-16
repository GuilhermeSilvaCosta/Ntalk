module.exports = function(app){
    const ChatController = {
        index: function(req, res){
            const resultado = {
                email: req.params.email,
                usuario: req.session.usuario
            };
            res.render('chat/index', resultado);
        }
    };
    return ChatController;
};