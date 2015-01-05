//
//	Code in /app/**/*.js is executed when the server starts
//	Use the bootstrap() function below to run code that has to start after all /app/**/*.js code has loaded
// 	and complete before the server starts accepting incoming requests. like bootstrapping a database, or 
//  configuration or whatever.
//
function bootstrap(next) {	
	tail.flow.parallel( 
		createDB,
		getConfig, 
		next
	)	
}


// bootstrap a db
function createDB(next) {
	// ensure db file exists and bootstrap database with tables. useful for sql dbs
	tail.flow.parallel(		
		function(next) {				
			next()
		},
		function(next) {						
			next()
		},
		next
	)
}

// load sensitive configuration from the db
function getConfig(next) {
	next();
}

module.exports = bootstrap;