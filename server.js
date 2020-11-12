let app = require('express')(),

    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    path = require('path');
    const jwt = require('jsonwebtoken');
    app.use(cors());

    let userRoute = require('./routes');


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false }));


    app.use('/user', userRoute);

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
      next();
    });

    var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
    
});

