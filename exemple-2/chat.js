var ent = require('ent');

function chatServer(socket) {
    var client = {};

    socket.broadcast.emit('system', 'Another client is joining...');
    socket.emit('system', 'You are connected!');

    socket.on('login', function(login) {
        client.login = ent.encode(login);
        socket.broadcast.emit('system', client.login + ' has joined the chat');
    });

    socket.on('message', function(message) {
        socket.broadcast.emit('message', {
            login: client.login,
            message: ent.encode(message)
        });
    });

    socket.on('disconnect', function() {
        var login = client.login || 'A client';
        socket.broadcast.emit('system', login + ' has left the chat');
    });
}

module.exports = chatServer;
