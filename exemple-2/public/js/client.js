define(['socket.io', 'gui'], function (io, guiFactory) {
    "use strict";

    return {
        start: function () {
            var gui = guiFactory();
            var socket = io.connect(location.origin);
            var login;

            socket.on('reconnect', function () {
                if (login) {
                    socket.emit('login', login);
                }
            });

            socket.on('system', function (info) {
                gui.system(info);
            });

            socket.on('message', function (info) {
                gui.received(info.login, info.message);
            });

            gui
                .login(function (nickname) {
                    login = nickname;
                    socket.emit('login', login);
                })
                .messageAction(function (message) {
                    gui.sent(login, message);
                    socket.emit('message', message);
                });
        }
    };
});