const KEY = 'ntalk.sid', SECRET = 'ntalk';
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const load = require('express-load');
const app = express();
const methodOverride = require('method-override');
const error = require('./middleware/error');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cookie = cookieParser(SECRET); 
const mongoose = require('mongoose');
const redis = require('./lib/redis_connect');
const ExpressStore = redis.getExpressStore();
const SocketStore = redis.getSocketStore();
const storeOpts = {client: redis.getClient(), prefix: KEY};
const store = new ExpressStore(storeOpts);


// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookie);
app.use(session({
                 secret: SECRET,
                 key: KEY,
                 store: store, 
                 resave: false, 
                 saveUninitialized: false
                }));
              
// uncomment after placing your favicon in /public
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// io.set('store', SocketStore);
// io.adapter(SocketStore({ host: 'localhost', port: 6379 }));
io.set('authorization', function(data, accept){  
  cookie(data, {}, function(err){
    const sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session){
      if(err || !session){
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      }
    });
  });
});

load('models')
  .then('controllers')
  .then('routes')
  .into(app);
load('sockets')
  .into(io);  

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, function(){
  console.log("Ntalk no ar.");
});

module.exports = app;