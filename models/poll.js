'use strict';
var rethinkdb = require('rethinkdb'),
    db = require('./db'),
    async = require('async'),
    CONFIG = require('../config/config');

class polls {
  //Helper function to add new poll data
  addNewPolls(pollData,callback) {
    async.waterfall([
      function(callback) {
        var pollObject = new db();
        pollObject.connectToDb(function(err,connection) {
          if(err) {
            return callback(true, 'Error connecting to database');
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table(CONFIG.TABLE_NAME).insert({
          'question': pollData.question, //question
          'polls': pollData.polls //question data
        }).run(connection,function(err,result) {
          connection.close();
          if(err) {
            return callback(true, 'Error happens while adding new polls');
          }
          callback(null,result);
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }

  votePollOption(pollData,callback) {
    async.waterfall([
      function(callback) {
        var pollObject = new db();
        pollObject.connectToDb(function(err,connection) {
          if(err) {
            return callback(true, 'Error connecting to database');
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table(CONFIG.TABLE_NAME).get(pollData.id).run(connection,function(err,result) {
          if(err) {
            return callback(true, 'Error fetching polls to database');
          }
          for(var pollCounter = 0; pollCounter < result.polls.length; pollCounter++) {
            if(result.polls[pollCounter].option === pollData.option) {
              result.polls[pollCounter].vote += 1;
              break;
            }
          }
          rethinkdb.table(CONFIG.TABLE_NAME).get(pollData.id).update(result).run(connection,function(err,result) {
            connection.close();
            if(err) {
              return callback(true, 'Error updating the vote');
            }
            callback(null,result);
          });
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }

  //Helper function to get all poll data
  getAllPolls(callback) {
    async.waterfall([
      function(callback) {
        var pollObject = new db();
        pollObject.connectToDb(function(err,connection) {
          if(err) {
            return callback(true, 'Error connecting to database');
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table(CONFIG.TABLE_NAME).run(connection,function(err,cursor) {
          connection.close();
          if(err) {
            return callback(true, 'Error fetching polls to database');
          }
          cursor.toArray(function(err, result) {
            if(err) {
              return callback(true, 'Error reading cursor');
            }
            callback(null,result)
          });
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }
}

module.exports = polls;
