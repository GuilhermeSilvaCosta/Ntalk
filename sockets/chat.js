module.exports = function(io) {
    const sockets = io.sockets;
    sockets.on('connection', function (client) {
        client.on('send-server', function (data) {
            const msg = "<b>"+data.nome+":</b> "+data.msg+"<br>";
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });
    });
}
/*module.exports = function(io){        
    const sockets = io.sockets;    
    const crypto = require('crypto');
    const md5 = crypto.createHash('md5');
    sockets.on('connection', function(client){
        const session = client.handshake.session;        
        const usuario = session.usuario;
        client.on('send-server', function(msg){
            client.emit('send-client', msg);
            msg = "<b>"+usuario.nome+":</b> "+msg+"<br>";
            client.get('sala', function(erro, sala){
                const data = {email: usuario.email, sala: sala};
                client.broadcast.emit('new-message', data);
                client.in(sala).emit('send-client', msg);                
            });                        
        });
        client.on('join', function(sala){
            if(sala){
                sala = sala.replace('?','');
            }else{
                const timestamp = new Date().toString();
                sala = md5.update(timestamp).digest('hex');
            }
            client.set('sala', sala);
            client.join(sala);
        });
        client.on('disconnect', function(){
            client.get('sala', function(erro, sala){
                client.leave(sala);
            });
        });
    });
};*/