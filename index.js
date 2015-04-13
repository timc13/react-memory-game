var http = require('http'),
    finalHandler = require('finalhandler'),
    serveStatic = require('serve-static');

var serve = serveStatic('./public');
var port = process.env.PORT || 3000;

var server = http.createServer(function(req, res) {
  var done = finalHandler(req, res);
  serve(req, res, done);
});

server.listen(port);