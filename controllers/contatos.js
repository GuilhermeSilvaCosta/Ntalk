'use strict';

const showEdit = (req, res, acao) =>{
    const _id = req.session.usuario._id;
    Usuario.findById(_id, function(err, usuario){
        const contatoID = req.params.id;
        const contato = usuario.contatos.id(contatoID);
        const resultado = {contato: contato};
        res.render('contatos/'+acao, resultado);
    });
}

module.exports = function(app){
    const Usuario = app.models.usuario;
    const ContatoController = {
        index: function(req, res){
            const _id = req.session.usuario._id;
            Usuario.findById(_id, function(erro, usuario){
                const contatos = usuario.contatos;
                const resultado = {contatos: contatos};
                res.render('contatos/index', resultado);
            });
        },
        create: function(req, res){
            const _id = req.session.usuario._id;
            Usuario.findById(_id, function(erro, usuario){
                const contato = req.body.contato;
                const contatos = usuario.contatos;
                contatos.push(contato);
                usuario.save(function(){
                    res.redirect('/contatos');
                });
            });
        },
        show: function(req, res){
            showEdit(req, res, 'show');
        },
        edit: function(req, res){
            showEdit(req, res, 'edit');
        },
        update: function(req, res){
            const _id = req.session.usuario._id;
            Usuario.findById(_id, function(erro, usuario){
                const contatoID = req.params.id;
                const contato = usuarios.contatos.id(contatoID);
                contato.nome = req.body.contato.nome;
                contato.email = req.body.contato.email;
                usuario.save(function(){
                    res.redirect('/contatos');
                })
            });
        },
        destroy: function(req, res){
            const _id = req.session.usuario._id;
            Usuario.findById(_id, function(erro, usuario){
                const contatoID = req.params.id;
                usuario.contatos.id(contatoID).remove();
                usuarios.save(function(){
                    res.redirect('/contatos');
                });
            });
        }
    }
    return ContatoController;
};