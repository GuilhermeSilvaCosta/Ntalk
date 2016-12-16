const express = require('express');
// const routes = require('./routes');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const load = require('express-load');
const app = express();
const methodOverride = require('method-override');
const error = require('./middleware/error');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('ntalk'));
app.use(session({
                 secret: 'homem avestruz', 
                 resave: true, 
                 saveUninitialized: true
                }));
              
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// app.use('/', routes.index);
// app.use('/usuarios', routes.user.index);

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