const app = require('../app'),
      request = require('supertest')(app),
      testarRota = require('./testarRota');;

describe('No controller home', function(){
    it('deve retornar status 200 ao fezer GET /', function(done){
        request.get('/').end(function(err, res){
            res.status.should.eql(200);
            done();
        });
    });

    testarRota('GET','/sair', '/');

    it('deve ir para rota /contatos ao fazer o POST /entrar', function(done){
        const login = {usuario: {nome: 'Teste', email: 'teste@teste'}};
        request.post('/entrar')
               .send(login)
               .end(function(err, res){
                   res.headers.location.should.eql('/contatos');
                   done();
               })
    });

    it('deve ir para rota / ao fazer o POST /entrar com um usuário inválido', function(done){
        const login = {usuario: {nome: '', email: ''}};
        request.post('/entrar')
               .send(login)
               .end(function(err, res){
                   res.headers.location.should.eql('/');
                   done();
               })
    });    
});