var express = require('express');

var app = express();

//configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
});

app.listen(process.env.PORT || 3000);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'),function() {
    io.configure(function () { 
      io.set("transports", ["xhr-polling"]); 
      io.set("polling duration", 10); 
    });
});

//start routing
app.get('/', function(req,res) {
	res.render('index');
});

app.get('*',function(req,res) {
	res.send('404 breh');
});