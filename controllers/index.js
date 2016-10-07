'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Main routing
 **/
//HANDLE FOR SPA
router.use('/', require('./home'));
router.use('/create', require('./home'));
router.use('/view', require('./home'));


//HANDLE FOR AJAX POLLING
router.use('/polls', require('./polling'));

module.exports = router;
