'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    router = express.Router(),
    port = process.env.PORT || 3000;

// router.get('/', function(req, res) {
//   res.send('<h1>HIIII</h1>');
// });


app.use(bodyParser.json());
// app.use('/', router);
app.use(require('./controllers'));

http.listen(port, function() {
  console.log('listening on port ' + port);
});
