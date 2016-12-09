module.exports = function(app){
    const home = app.controllers.home;
    app.get('/', home.index);
    app.post('/entrar', home.login);
    app.get('/sair', home.logout);
};