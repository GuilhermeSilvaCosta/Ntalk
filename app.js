const KEY = 'ntalk.sid', SECRET = 'ntalk';
const MAX_AGE = {maxAge: 3600000};
const GZIP_LVL = {level: 9, memLevel: 9};
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const load = require('express-load');
const app = express();
const methodOverride = require('method-override');
const error = require('./middleware/error');
const server = require('http').createServer(app);
const configSocket = {'browser client minification': true,
                      'browser client etag': true,
                      'browser client gzip': true,
                      'browser client cache': true
                      };
const io = require('socket.io').listen(server, configSocket);
const cookie = cookieParser(SECRET); 
const mongoose = require('mongoose');
const redis = require('./lib/redis_connect');
const ExpressStore = redis.getExpressStore();
const SocketStore = redis.getSocketStore();
const storeOpts = {client: redis.getClient(), prefix: KEY};
const store = new ExpressStore(storeOpts);
const logger = require('express-logger');
const compression = require('compression');

app.use(logger({path: "app.log"}));
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
app.use(express.static(__dirname + '/public', MAX_AGE));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(compression());

// io.set('store', SocketStore);
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
io.adapter(SocketStore({ host: 'localhost', port: 6379 }));

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