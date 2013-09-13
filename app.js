var express = require('express')
  , fs = require('fs');

var app = express();

var port = process.env.PORT || 3000;
//configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('port',port);
  app.use(express.static(__dirname + '/public'));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
});

console.log("Listening on port "+port);
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

app.post('/getaudio',function(req,res) {
  console.log(typeof req.body.audio_file);
  // fs.readFile(req.body.audio_file,function(err,data) {
  //   var newPath = __dirname+'/uploads/audio';
  //   fs.writeFile(newPath, data, function(err) {
  //     if(err)
  //       console.log("error: "+err);
  //     if(!err)
  //       console.log("uploaded!");
  //   });
  // });
  res.send('request received');
});

app.get('*',function(req,res) {
	res.send('404 breh');
});