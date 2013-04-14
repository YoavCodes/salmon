// node.js configuration

exports.config = {
	env: 'dev',// 'dev', 'staging', 'prod'
	port: 8200,
	/*
		'dev':
			- will disable template caching
			- will not compress compiled LESS
		'staging / prod':
			- templates are cached after they're first fetched
			- LESS is compiled and then YUI compressed
	*/
	
}