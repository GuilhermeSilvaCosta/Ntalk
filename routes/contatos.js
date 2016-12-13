module.exports = function(app){
    const contatos = app.controllers.contatos;
    const autenticar = require('./../middleware/autenticador');
    app.get('/contatos', autenticar, contatos.index);
    app.get('/contato/:id', autenticar, contatos.show);
    app.post('/contato', autenticar, contatos.create);
    app.get('/contato/:id/editar', autenticar, contatos.edit);
    app.put('/contato/:id', contatos.update);
    app.delete('/contato/:id', autenticar, contatos.destroy);
};