define(function () {
    "use strict";

    /**
     * Build a GUI manager
     * @returns {gui}
     */
    function guiFactory() {
        var list = document.querySelector('.messages');
        var form = document.querySelector('.speaker');
        var gui = {
            /**
             * Displays a message in the chat window
             * @param {String} type
             * @param {String|HTMLElement} content
             * @returns {gui}
             */
            addLine: function addLine(type, content) {
                var line = document.createElement('LI');
                line.setAttribute('class', type);
                if ('string' === typeof content) {
                    line.innerHTML = content;
                } else {
                    line.appendChild(content);
                }

                list.appendChild(line);
                list.scrollTop = list.scrollHeight;

                return this;
            },

            /**
             * Format a message with the name of the emitter
             * @param {String} login
             * @param {String} message
             * @returns {String}
             */
            formatMessage: function formatMessage(login, message) {
                return '<span class="login">' + login + '</span>: <span class="text">' + message + '</span>'
            },

            /**
             * Displays a system message
             * @param {String} message
             */
            system: function (message) {
                this.addLine('system', message);
            },

            /**
             * Displays a received message
             * @param {String} who
             * @param {String} message
             */
            received: function (who, message) {
                this.addLine('message others', this.formatMessage(who, message));
            },

            /**
             * Displays a sent message
             * @param {String} who
             * @param {String} message
             */
            sent: function (who, message) {
                this.addLine('message me', gui.formatMessage(who, message));
            },

            /**
             * Process to user login
             * @param {Function} cb
             * @returns {gui}
             */
            login: function login(cb) {
                var nickname = window.prompt('What is your login?');
                var tag = document.getElementsByTagName('h1')[0];
                var title = nickname + ' - ' + document.title;

                document.title = title;
                tag.innerHTML = title;

                cb(nickname);

                return this;
            },

            /**
             * Registers the action called when a message needs to be sent
             * @param {Function} cb
             * @returns {gui}
             */
            messageAction: function messageAction(cb) {
                if ('function' === typeof cb) {
                    action = cb;
                }

                return this;
            }
        };
        var action;

        // send a message when the user hit the "send" button
        form.addEventListener('submit', function (event) {
            var input = document.getElementById('text');
            var message = input.value;

            event.preventDefault();

            input.value = '';
            input.focus();

            if (message && action) {
                action(message);
            }
        });

        return gui;
    }

    return guiFactory;
});