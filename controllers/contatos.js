module.exports = function(app){
    const ContatoController = {
        index: function(req, res){
            const usuario = req.session.usuario;
            const params = {usuario: usuario};
            res.render('contatos/index', params);
        }
    }
    return ContatoController;
};