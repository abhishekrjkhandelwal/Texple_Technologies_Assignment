//var config = require("nfig").config;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'abhishek',
    password: 'A889026a@123',
    database: 'user',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

let getDB = () => {
  return connection;
}

module.exports = {
    getDB: getDB
}
