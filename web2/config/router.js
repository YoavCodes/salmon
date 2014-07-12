// routes

exports.router = function(res, req, pathname, segments, command) {

	var http = require("http")
    // decide what to do
    switch (pathname) {

    	
        default: 
        //http.get("10.10.10.99:6000", function(r) {
        	http.get("http://127.0.0.1:6000", function(r){
        		var str = ""
        		r.on('data', function (chunk) {
        		    str += chunk;
        		  });

        		  r.on('end', function () {	         	    
        		    res.response.data["respons"] = str
        		    res.response.data["status"] ="end"
        		    res.kill()
        		    // your code here if you want to use the results !
        		  });

        		  
        	}).on('error', function(e) {
        		  	res.response.data["status"] ="error: "+e.message
        		  	res.kill()
        		  })



        

        break;
    }
    return
}