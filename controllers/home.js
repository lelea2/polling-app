'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1>Polling App</h1>');
});

module.exports = router;
