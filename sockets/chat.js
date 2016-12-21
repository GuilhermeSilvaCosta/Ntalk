'use strict';

module.exports = function(io) {
    const sockets = io.sockets;
    let crypto = require('crypto')          
    sockets.on('connection', function (client) {    
        const session = client.request.session,
              usuario = session.usuario;
        client.email = usuario.email;

        const onlines = Object.keys(sockets.connected);        
        onlines.forEach(function(online){
            let on = sockets.sockets[online];            
            client.emit('notify-onlines', on.email);
            client.broadcast.emit('notify-onlines', on.email);
        });

        client.on('join', function(sala){
            if(!sala){
                let timestamp = new Date().toString(),
                    md5 = crypto.createHash('md5');;
                sala = md5.update(timestamp).digest('hex');
            } 
            client.sala = sala;
            client.join(sala);
        });
        client.on('send-server', function (msg) {            
            const sala = client.sala;
            msg = "<b>"+usuario.nome+":</b> "+msg+"<br>";
            if(sala){
                const data = {email: usuario.email,
                              sala: sala};
                client.broadcast.emit('new-message', data);
                sockets.in(sala).emit('send-client', msg);
            }
        });
        client.on('disconnect', function(){
            client.broadcast.emit('notify-offline', usuario.email);
            const sala = client.sala;            
            if (sala){
                const msg = "<b>" + usuario.nome + "</b> saiu.<br>";                
                sockets.in(sala).emit('send-client', msg);
                client.leave(sala);
            }            
        });
    });
}