'use strict';

module.exports = function(app){
    const ContatoController = {
        index: function(req, res){
            const usuario = req.session.usuario;
            const contatos = usuario.contatos;
            const params = {usuario: usuario, contatos: contatos};
            res.render('contatos/index', params);
        },
        create: function(req, res){
            const contato = req.body.contato;
            const usuario = req.session.usuario;
            usuario.contatos.push(contato);
            res.redirect('/contatos');
        },
        show: function(req, res){
            const id = req.params.id;
            const contato = req.session.usuario.contatos[id];
            const params = {contato: contato, id: id};
            res.render('contatos/show', params);
        },
        edit: function(req, res){
            const id = req.params.id;
            const usuario = req.session.usuario;
            const contato = usuario.contatos[id];
            const params = {usuario: usuario,
                            contato: contato,
                            id: id};            
            res.render('contatos/edit', params);
        },
        update: function(req, res){    
            console.log('aki sim');                    
            const contato = req.body.contato;
            let usuario = req.session.usuario;
            usuario.contatos[req.params.id] = contato;
            res.redirect('/contatos');
        },
        destroy: function(req, res){
            let usuario = req.session.usuario;
            const id = req.params.id;
            usuario.contatos.splice(id, 1);
            res.redirect('/contatos');
        }
    }
    return ContatoController;
};