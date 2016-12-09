const express = require('express');
// const routes = require('./routes');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const load = require('express-load');
const app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('ntalk'));
app.use(session());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));

// app.use('/', routes.index);
// app.use('/usuarios', routes.user.index);

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(3000, function(){
  console.log("Ntalk no ar.");
});