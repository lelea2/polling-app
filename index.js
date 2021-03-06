'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    router = express.Router(),
    port = process.env.PORT || 3001;

// Adding socket.io
var io = require('socket.io')(http),
    db = require('./models/db'),
    feed;

io.on('connection', function(socket) {
  feed = require('./models/feed')(socket);
});

var dbModel = new db();
dbModel.setupDb();

// router.get('/', function(req, res) {
//   res.send('<h1>HIIII</h1>');
// });

app.use(express.static(__dirname + '/view'));
app.use(bodyParser.json());
// app.use('/', router);
app.use(require('./controllers'));

http.listen(port, function() {
  console.log('listening on port ' + port);
});
