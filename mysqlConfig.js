//var config = require("nfig").config;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'abhishek',
    password: 'A889026a@123',
    database: 'user',
});


let getDB = () => {
  return connection;
}

module.exports = {
    getDB: getDB
}
