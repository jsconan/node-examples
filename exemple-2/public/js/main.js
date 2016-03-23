(function (window) {
    // gets the path of the application bootstrap script
    var appName = document.getElementById('loader').getAttribute('data-app');

    // sets the RequireJS config
    requirejs.config({
        // all javascripts are located inside the folder public/js
        baseUrl: 'js',
        // shorten some paths using a translation map
        paths: {
            'socket.io': '../socket.io/socket.io'
        }
    });

    // loads the application
    require([appName], function (app) {
        app.start();
    });
})(this);
