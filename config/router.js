// routes
exports.router = function(res, req, pathname, segments, command) {

	var http = require("http")	
	

    // decide what to do
    switch (pathname) {


        default: 
	        res.kill();
	        break;
    }
    return
}