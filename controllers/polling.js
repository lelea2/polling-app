'use strict';

var express = require('express'),
    router = express.Router(),
    //Poll Model
    pollModel = require('../models/polls');

router.route('/')
  .get(function(req, res) {
    //Fetching poll
    var pollObject = new pollModel();
    // Calling our model function.
    pollObject.getAllPolls(function(err, pollResponse) {
      if (err) {
        console.log(err);
        return res.json({
          'responseCode' : 1,
          'responseDesc' : pollResponse
        });
      }
      res.json({
        'responseCode' : 0,
        'responseDesc' : 'Success',
        'data' : pollResponse
      });
    });
  })
  .post(function(req, res) { //Adding new poll question
    //Add new poll
    var pollObject = new pollModel();
    // Calling our model function.
    // We nee to validate our payload here.
    pollObject.addNewPolls(req.body, function(err, pollResponse) {
      if(err) {
        return res.json({
          'responseCode' : 1,
          'responseDesc' : pollResponse
        });
      }
      res.json({
        'responseCode' : 0,
        'responseDesc' : 'Success',
        'data' : pollResponse
      });
    });
  })
  .put(function(req, res) {
    //Update poll answer
    var pollObject = new pollModel();
    // Calling our model function.
    // We need to validate our payload here.
    pollObject.votePollOption(req.body, function(err, pollResponse) {
      if(err) {
        return res.json({
          'responseCode' : 1,
          'responseDesc' : pollResponse
        });
      }
      res.json({
        'responseCode' : 0,
        'responseDesc' : 'Success',
        'data' : pollResponse
      });
    });
  });

module.exports = router;
