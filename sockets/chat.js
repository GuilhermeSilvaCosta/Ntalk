module.exports = function(io) {
    const sockets = io.sockets,
          crypto = require('crypto'),
          md5 = crypto.createHash('md5');
    sockets.on('connection', function (client) {    
        const session = client.request.session,
              usuario = session.usuario;
        client.on('join', function(sala){
            if(sala){
                sala = sala.replace('?', '');
            }else{
                const timestamp = new Date().toString();
                sala = md5.update(timestamp).digest('hex');
            }
            session.sala = sala; 
            client.set('sala', sala);
            client.join(sala);
        });
        client.on('send-server', function (msg) {
            const sala = session.sala;
            msg = "<b>"+usuario.nome+":</b> "+msg+"<br>";
            if(sala){
                const data = {email: usuario.email,
                              sala: sala};
                client.broadcast.emit('new-message', data);
                sockets.in(sala).emit('send-client', msg);
            }
        });
        client.on('disconnect', function(){
            const sala = session.sala;
            // client.get('sala', function(erro, sala){
            if (sala){
                client.leave(sala);
            }
            // });
        });
    });
}