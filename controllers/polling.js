'use strict';

var express = require('express'),
    router = express.Router();

router.route('/')
  .get(function(req, res) {
    //Fetching poll
  })
  .post(function(req, res) {
    //Add new poll
  })
  .post(function(req, res) {
    //Update poll
  });

module.exports = router;
