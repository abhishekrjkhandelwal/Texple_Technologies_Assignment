//var config = require("nfig").config;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b7e2437887xxxa',
    password: '0200xxx6',
    database: 'heroku_7643ec736354xxx',
});


let getDB = () => {
  return connection;
}

module.exports = {
    getDB: getDB
}
