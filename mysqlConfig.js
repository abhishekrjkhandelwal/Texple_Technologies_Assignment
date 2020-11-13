//var config = require("nfig").config;
var mysql = require('mysql');
var dbConfig = require('./db');

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});


let getDB = () => {
  return connection;
}

module.exports = {
    getDB: getDB
}
