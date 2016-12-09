module.exports = function(app){
    const contatos = app.controllers.contatos;
    app.get('/contatos', contatos.index);
};