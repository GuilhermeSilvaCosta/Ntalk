module.exports = function(app){
    // const Usuario = app.models.usuario;
    const HomeController = {
        index: function(req, res){
            res.render('home/index');
        },
        login: function(req, res){
            const email = req.body.usuario.email;
            const nome = req.body.usuario.nome;
            if (email && nome){
                var usuario = req.body.usuario;
                usuario['contatos'] = [];
                console.log('1 ',req.session.usuario);                
                req.session.usuario = usuario;                
                console.log('2 ',req.session.usuario);
                res.redirect('/contatos');
            }else{
                res.redirect('/');
            }
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/');
        }
    };
    return HomeController;
};