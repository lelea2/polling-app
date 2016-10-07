'use strict';

var express = require('express'),
    path    = require('path'),
    router  = express.Router();

//Render index page for home page
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/../view/index.html'));
});

module.exports = router;
