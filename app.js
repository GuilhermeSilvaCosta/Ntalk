var express = require('express');
var routes = require('./routes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/usuarios', routes.user.index);

app.listen(3000, function(){
  console.log("Ntalk no ar.");
});