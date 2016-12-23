'use strict';

const app = require('../app'),
      request = require('supertest')(app),
      testarRota = require('./testarRota');

describe('No controller contatos', function(){
    describe('o usuário não logado', function(){
        testarRota('GET', '/contatos', '/');
        testarRota('GET', '/contato/1', '/');
        testarRota('GET', '/contato/1/editar', '/');
        testarRota('POST', '/contato', '/');
        testarRota('DELETE', '/contato/1', '/');
        testarRota('PUT', '/contato/1', '/');        
    });
    describe('o usuário logado', function(){
        const login = {usuario: {nome: 'Teste', email: 'teste@teste'}},
              contato = {conato: {nome: 'Teste', email: 'teste@teste'}};
        let cookie = {};      

        beforeEach(function(done) {
            request.post('/entrar')
                   .send(login)
                   .end(function(err, res) {
                       cookie = res.headers['set-cookie'];
                       done();
                   });
        });

        it('deve retornar status 200 em GET /contatos', function(done){
            const req = request.get('/contatos');
            req.cookies = cookie;
            req.end(function(err, res){
                res.status.should.eql(200);
                done();
            });
        });

        it('deve ir para rota /contatos em POST /contato', function(done){
            const contato = {contato: {nome: 'Teste', email: 'teste@teste'}};
            const req = request.post('/contato');
            req.cookies = cookie;
            req.send(contato).end(function(err, res){
                res.headers.location.should.eql('/contatos');
                done();
            });
        });
    });
});