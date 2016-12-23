'use strict';

const app = require('../app'),
      request = require('supertest')(app);

const validaEspectativa = (caminho, done) =>{
    return (err, res) => {
        res.headers.location.should.eql(caminho);
        done();
    }    
}
module.exports = (verbo, rota, espectativa) =>{
    it('deve ir para '+espectativa+' ao fazer o '+verbo+' ' + rota, function(done){
        switch(verbo){
            case 'GET':
                request.get(rota).end(validaEspectativa(espectativa, done));
                break;
            case 'POST':
                request.post(rota).end(validaEspectativa(espectativa, done));
                break;
            case 'DELETE':
                request.del(rota).end(validaEspectativa(espectativa, done));
                break;
            case 'PUT':
                request.put(rota).end(validaEspectativa(espectativa, done));
                break;
        }
    });
}