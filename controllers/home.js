'use strict';

module.exports = function(app){
    const Usuario = app.models.usuario;
    const HomeController = {
        index: function(req, res){
            res.render('home/index');
        },
        login: function(req, res){            
            const cbInclusaoUsuario = (erro, usuario) =>{
                if(erro){
                    res.redirect('/');
                }else{
                    req.session.usuario = usuario;
                    res.redirect('/contatos');
                }
            }
            const cbConsultaUsuario = (erro, usuario) => {
                if(usuario){
                    req.session.usuario = usuario;
                    res.redirect('/contatos');
                }else{
                    Usuario.create(req.body.usuario, cbInclusaoUsuario)
                }
            }
            const query = {email: req.body.usuario.email};
            Usuario.findOne(query).select('nome email').exec(cbConsultaUsuario);
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};