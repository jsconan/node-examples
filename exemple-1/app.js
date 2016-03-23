var http = require('http');

var server = http.createServer(function (req, res) {

    res.writeHead(200);
    res.end('Bonjour chez vous !');

});

server.listen(8080);
