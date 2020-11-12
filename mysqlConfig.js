//var config = require("nfig").config;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'abhishek',
    password: 'A88902616a',
    database: 'user',
});


let getDB = () => {
  return connection;
}

module.exports = {
    getDB: getDB
}
