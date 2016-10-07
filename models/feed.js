'use strict';

var rethinkdb = require('rethinkdb'),
    db = require('./db'),
    pollObject = new db(),
    CONFIG = require('../config/config');

//Module to keep updated and notified about the changes in poll table
module.exports = function(socket) {
  pollObject.connectToDb(function(err,connection) {
  if(err) {
    return callback(true, 'Error connecting to database');
  }
  rethinkdb.table(CONFIG.TABLE_NAME).changes().run(connection,function(err,cursor) {
    if(err) {
      console.log(err);
    }
    cursor.each(function(err,row) {
      console.log(JSON.stringify(row));
      if(Object.keys(row).length > 0) {
        socket.broadcast.emit('changeFeed', {'id' : row.new_val.id, 'polls' : row.new_val.polls});
      }
    });
  });
  });
};
