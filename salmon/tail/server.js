var http = require('http');
var static = require('node-static');
var handleApi = require('./api-handler');

var fileServer = new static.Server('./public');

http.createServer(function (req, res) {
    
    if(req.url === "/0") {
        handleApi(req, res);
        return;
    }    

    req.addListener('end', function () {
        fileServer.serve(req, res, function (e) {
            if (e && (e.status === 404)) { // If the file wasn't found                    
                res.statusCode = 404
                res.end('<pre>404</pre>')
            }
        });
    }).resume();
}).listen(tail.config.port);
log('salmon is listening on port ' + tail.config.port);