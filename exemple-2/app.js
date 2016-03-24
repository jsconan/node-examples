var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chatServer = require('./chat');
var serverPort = 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('home.ejs');
});

app.use(function(req, res) {
    res.status(404);
    res.render('404.ejs');
});

io.on('connection', chatServer);

server.listen(serverPort, function() {
    console.log('Server is listening on port ' + serverPort);
});
