//Common function handler to connect to rethink db

'use strict';

var rethinkdb = require('rethinkdb'),
    async = require('async'),
    CONFIG = require('../config/config');

class db {
  setupDb() {
    var self = this;
    async.waterfall([
      function(callback) { //Connect to DB server
        self.connectToRethinkDbServer(function(err,connection) {
          if(err) {
            return callback(true, 'Error in connecting RethinkDB');
          }
          callback(null,connection);
        });
      },
      function(connection,callback) { //Create database
        rethinkdb.dbCreate(CONFIG.DB_NAME).run(connection,function(err, result) {
          if(err) {
            console.log('Database already created');
          } else {
            console.log('Created new database');
          }
          callback(null,connection);
        });
      },
      function(connection,callback) { //Create table
        rethinkdb.db(CONFIG.DB_NAME).tableCreate(CONFIG.TABLE_NAME).run(connection,function(err,result) {
          connection.close();
          if(err) {
            console.log('table already created');
          } else {
            console.log('Created new table');
          }
          callback(null,'Database is setup successfully');
        });
      }
    ],function(err,data) {
      console.log(data);
    });
  }

  connectToRethinkDbServer(callback) {
    rethinkdb.connect({
      host : 'localhost',
      port : 28015
    }, function(err,connection) {
      callback(err,connection);
    });
  }

  connectToDb(callback) {
    rethinkdb.connect({
      host : 'localhost',
      port : 28015,
      db : CONFIG.DB_NAME
    }, function(err,connection) {
      callback(err,connection);
    });
  }
}

module.exports = db;
