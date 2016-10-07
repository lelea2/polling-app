'use strict';

var express = require('express'),
    router = express.Router();

/**
 * Main routing
 **/

router.use('/', require('./home'));
router.use('/polls', require('./polling'));

module.exports = router;
