// routes
exports.router = function(res, req, pathname, segments, command) {

	var http = require("http")
	require('../salmon/node_modules/shelljs/global');

	

    // decide what to do
    switch (pathname) {


        default: 
        	// works http
	         /*http.get("http://127.0.0.1:6001", function(r){
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
	         	  })*/



		// works db
		var MongoClient = require('../salmon/node_modules/mongodb').MongoClient
		   , format = require('util').format;



		   //http.get("http://10.10.10.11:27017", function(r) {
		   // console.log("hit")
		   //})
		 //MongoClient.connect('mongodb://127.0.0.1:6001/test', function(err, db) {
		 MongoClient.connect('mongodb://127.0.0.1:6002/tester', function(err, db) {
		  
		  
		   if(err) {
		   	res.response.data["err"] = err.message
		   	res.kill()
		   }

		   var collection = db.collection('test_insert');
		   collection.insert({a:2}, function(err, docs) {
		    console.log("inserting"+ err)

		     collection.count(function(err, count) {
		      res.response.data["count"] = format("count = %s", count)
		       console.log(format("count = %s", count));
		     });

		     // Locate all the entries using find
		     collection.find().toArray(function(err, results) {
		       console.dir(results);
		       // Let's close the db
		       db.close();
		       res.response.data["status"] = "worked!"
		   		res.kill()
		     });
		   });
		 })
	        
        break;
    }
    return
}