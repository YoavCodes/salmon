// routes
exports.router = function(res, req, pathname, segments, command) {

	var http = require("http")
	require('../salmon/node_modules/shelljs/global');

	

    // decide what to do
    switch (pathname) {


        default: 
	        res.kill();
	        break;
    }
    return
}