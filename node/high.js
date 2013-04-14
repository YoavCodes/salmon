/*------------------------------------------------------------------------------------------
GLOBAL - BOOTSTRAP
------------------------------------------------------------------------------------------*/
/*
	// global log function, for consistency with clientside code
*/
function log(msg) {
    if(console) {
		console.log(msg);
	}
};
/*
	// global error handler
	// process will still crash, but we can do stuff after it crashes, like send an email or log it or something
*/
process.on('uncaughtException', function(e){
	// something
	try {
		high.mongo.close();
	} catch(err) {
		//uggg
	}
})

/*
	// load dependencies
*/
var http = require('http'),
	fs = require('fs'),
 	querystring = require('querystring'),
 	path = require('path'),
	inspect = require('util').inspect,
	sys = require('sys'),
	pump = require('util').pump,
	$ = require('jquery-latest'),
	less = require('less');
	
	
/*
	// form handling
*/	
var	formidable = require('./node_modules/formidable');
	

	
/*
	// connect to MongoDB
*/
var mongoDB = require('./node_modules/mongodb').Db;
	connect = require('./node_modules/mongodb').Connection;
	server = require('./node_modules/mongodb').Server 



/*------------------------------------------------------------------------------------------
GLOBAL - UTILITIES
------------------------------------------------------------------------------------------*/
/*
	// measure execution time, useful for benchmarking in a local or controlled environment, 
	// will give false results with multiple concurrent requests
	call timeDiff.setStartTime() to start timer
	call timeDiff.getDiff() to get time difference
*/
var timeDiff  =  {
    setStartTime:function (){
        d = new Date();
        time  = d.getTime();
    },

    getDiff:function (){
        d = new Date();
        return (d.getTime()-time);
    }
}

/*
	// simple generic post handler
	@req - request
	@res - response
	@callback - function to call on complete
	note: can take a while if request is being slowly uploaded
*/ 
function postHandler(req, res, callback)
{
	var _REQUEST = {};
	var _CONTENT = '';
	if(req.method == 'POST')
	{
		req.addListener('data', function(chunk) {
			_CONTENT += chunk;
		});
		
		req.addListener('end', function() {
			_REQUEST = querystring.parse(_CONTENT);

			
			callback(req, res, _REQUEST);
		});
	} else {
		res.end('no post data');	
	}
}	

/*
	// cloning objects, so changes to one don't affect the other
	@obj - object to clone
	note: var newObj = cloneObject(oldObj);
*/
function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}










// global server-side highfin.js object 
high = {
	apps: { 
		// used for storing application functions. ie: controllers and public models in MVC
		// typically not defined here.
	}, 
	util: {
		log: log,
		/*
			strip html tags
			note: if b is specified as an allowable tag, it will preserve <b></b> tags, but will remove tag params ie: <b onclick="javascript()">bold text</b> 
					will be converted into <b>bold text</b>, this prevents javascript injection in allowable tags
			@input - html string
			@allowed "b,i", comma separated string of alloweable tags
		*/
		strip_tags: function strip_tags(input, allowed) {
			if(input == undefined) {
				return "";	
			}
			// array of allowable tags
		    allowed = allowed.split(',')
			input = input	.replace(/<!--[\s\S]*?-->/gi, '') // html comments
							.replace(/<(\/? *[a-z][a-z0-9]*)\b[^>]*(\/?)>/gi, function($0, $1){ // html tags
								// for closing tags, remove the slash before checking if the tag is allowed
								var tag = $1.replace('/', '')
								if($.inArray(tag, allowed) > -1) {
									// allowed tag
									var self_closed = ""
									if($0.indexOf('/>') > -1) {
										self_closed = "/"
									}
									return "<" + $1 + self_closed + ">"
								} else {
									return ''
								}
							})
			return input
		},
		/*
			fast trim for leading and trailing whitespace
		*/
		trim: function trim(str) {
			str = str.replace(/^\s+/, '');
			for (var i = str.length - 1; i >= 0; i--) {
				if (/\S/.test(str.charAt(i))) {
					str = str.substring(0, i + 1);
					break;
				}
			}
			return str;
		},
		/*
			// validate specific data types		
			@data - the data to validate
			@type - the validator to use
		*/			
		validate: function validate(data, type) {
			if(typeof data === 'undefined') {
				return false
			}
			switch(type) {
				case "email":
		 			var regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
					break;
				case "required":
					var regex = /.+/
					break;	
				default:
					return;
					break;
			} 
			
			if(data.match(regex) == null) {
				return false;
			} else {
				return true	
			} 
		},
		/*
			validation
		*/

		/*
			// get the current time as either a timestamp or UTC datestamp
			@type - "time" or "date"
		*/
		currentTime: function currentTime(type) {
			switch(type) {
				case "time":
					// seconds passed the epoch, used for sorting and server side operations
					return new Date().getTime().toString();
					break;
				case "date":
					// UTC datetime, used for timezone support and displaying dates and times to the user
					return new Date().toString();
					break;	
				
			} 
		},
		// recursively operate on every file in a folder and its subfolders
		// @folders: array of string folder paths
		// @callback: function to call on every file, the callback gets two arguments
				// @file_name: string name of the file
				// @root_path: string full root path of the file not including the file_name, so root_path + file_name = full path to file
				// @isDirectory: boolean
		// @recursive: boolean: whether to recursively check subfolders or not
		// @callback_on: 'files', 'folders', 'both' when to trigger a callback
		loopOverFolders: function loopOverFolders(folders, callback, recursive, callback_on) {			
			if(typeof folders === 'undefined') {
				return
			}
			if(typeof recursive === 'undefined') {
				recursive = true;
			}			
			if(typeof callback_on === 'undefined') {
				callback_on = 'files'
			}

			var root_path = "";
			for(var j = 0; j < folders.length; j++) {
				root_path = folders[j];	
				if(fs.statSync(root_path).isDirectory() === false) {
					continue;
				}
				(function(rel_path){
					if(typeof rel_path === 'undefined') {
						rel_path = ""
					}  
					var _path = root_path + rel_path;					
					var folder_contents = fs.readdirSync(_path)
					for(var i = 0; i < folder_contents.length; i++) {
						var file_name = folder_contents[i];
						// ignore dot files
						if(file_name.charAt(0) === ".") {
							continue
						}
						var isDirectory = fs.statSync(_path + file_name).isDirectory();

						if(isDirectory === true) {	
							if(callback_on === "folders" || callback_on === "both") {
								callback(file_name, _path, true)
							}

							// call this function again for the newly discovered folder
							if(recursive === true) {
								arguments.callee(rel_path + file_name + "/")
							}
						} else {
							if(callback_on === "files" || callback_on === "both") {
								callback(file_name, _path, false)
							}
						}
					}
				})("")
			}
		},
		// update client-side cache control _CACHE_CONTROL=timestamp
		updateCacheControl: function updateCacheControl() {	
			var timestamp = new Date().getTime();
			high.util.loopOverFolders([high.config._public_path, high.config._template_path], function(file_name, root_path) {
				// modify .html, .js, and .css files.
				if(file_name.match(/.html$|.js$|.css$|.less$/)) {								
					var file_contents = fs.readFileSync(root_path + file_name, {'encoding': 'utf8'});								
					file_contents = file_contents.replace(/_CACHE_CONTROL_=[0-9]+/g, "_CACHE_CONTROL_=" + timestamp);
					fs.writeFileSync(root_path + file_name, file_contents, {'encoding': 'utf8'})
				}
			})										
		},
		// recursively load all server-side application code onto the global high object
		loadServerCode: function loadServerCode() {
			// load server-side application code
			var _path = high.config._application_path + "apps/"
			high.util.loopOverFolders([high.config._application_path + "apps/"], function(file_name, root_path) {
				// load .js files 
				if(file_name.match(/.js$/)) {
					var object_path_array = String(root_path + file_name).replace(/js$/, '').split('/');
					var object_branch = high.apps;
					
					for(var j=0; j<object_path_array.length; j++) {
						if(j === object_path_array.length-1) {
							object_branch[object_path_array[j]] = require(root_path + file_name)
						} else {
							if(typeof object_branch[object_path_array[j]] === 'undefined') {
								object_branch[object_path_array[j]] = {};
							}
							object_branch = object_branch[object_path_array[j]]
						}
					} 
				}       
			})			 	   		 	 
		},           
		// compile and compress css
		compileCompressCSS: function compileCompressCSS() {
			high.util.loopOverFolders([high.config._less_path], function(file_name, root_path) {				
				// LESS 
				if(file_name.match(/.less$/)){
					var parser = new(less.Parser)({
					    paths: [high.config._less_path], // Specify search paths for @import directives
					    filename: file_name // Specify a filename, for better error messages
					})
					var file_contents = fs.readFileSync(root_path + file_name, {'encoding': 'utf8'});					
					parser.parse(file_contents, function(err, tree) {
						if(err) {
							log(err)
							return
						}
						var less_config,
							compiled_file_contents;

						if(high.config.env === 'dev') {
							less_config = high.config.less.dev;
						} else {
							less_config = high.config.less.prod;
						}
						compiled_file_contents = tree.toCSS(less_config)						
						fs.writeFileSync(root_path.replace(/\/less\//, '/css/') + file_name.replace(/.less$/, ".css"), compiled_file_contents, {'encoding': 'utf8'})						
					})
				}  
			}, false)  
		},
		// fetch templates
		getTemplates: function getTemplates(fields, res){
			// template_list is a list of templates needed for the page to function
			var template_list = [];
			var template_name_onclient;
			if(typeof fields.template_list !== 'undefined') {
				template_list = fields.template_list.split(',') // convert string back into array
				res.response['templates'] = {}
				// get templates
				for(var i=0; i<template_list.length; i++) {
					var template_name = template_list[i];
					// if the template is undefined or we're in development mode, get the template from the file system
					if(typeof high.config._templates[template_name] === 'undefined' || high.config.env === 'dev') {
						// not in cache, so grab it from the file system
						var file_path = high.config._template_path + template_name.replace(/_/g, '/');

						// check if .js or .html template
						// we favour .js templates in cases where a .js and .html template both exist with the same name
						var ext = ""
						if(fs.existsSync(file_path + '.js')) {
							ext = "js"
						} 
						if(fs.existsSync(file_path + '.html')) {
							ext = "html"
						} 
						if(fs.existsSync(file_path + '.fn.js')) {
							ext = "fn.js"
						}
						file_path += "." + ext
						template_name_onclient = template_name + "-" + ext

						try { 
							high.config._templates[template_name] = {template: JSON.stringify(fs.readFileSync(file_path, 'utf8')), ext: ext}						
						} catch(err) {
							// template wasn't found
							// make sure it's no longer in the cache
							delete high.config._templates[template_name]
							log("*")
							log("Error: Template ( " + template_name + " ) not found,") 
							log("Solve Error: create "+ template_name.replace(/.*_/, "") +".js OR "+template_name.replace(/.*_/, "")+".html in ( " + file_path.replace(/[a-z_\.]*$/, "").replace(/[a-z]*\/\.\.\//, "") + ")")
							log("*")
						}
					} else {
						template_name_onclient = template_name + '-' + high.config._templates[template_name].ext
					}
					// if the template is not in the cache now, the file wasn't found with any of the valid extensions, 
					// template is in cache so grab it from the cache
					res.response.templates[template_name_onclient] = high.config._templates[template_name].template
					
				}
			}
		}  
		    
	}
}  
 
high.config = $.extend(true, {}, {
	_templates: {}, // used for storing the cached templates
	_application_path: __dirname + "/../application/",
	_template_path: __dirname + "/../templates/", // requres trailing slash
	_public_path: __dirname + "/../public/",
	_css_path: __dirname + "/../public/assets/css/",
	_less_path: __dirname + "/../public/assets/less/",
	less: {
		dev: {
			compress: false,
			yuicompress: false,

		},
		prod: {
			yuicompress: true,
		}
	}
}, require(__dirname + "/../application/config.js").config)

//high.mongo = new mongoDB('highfin', new server('localhost', 27017, {auto_reconnect: true, safe: false}));

high.bootstrap = (function() {
	// load router
	high.router = require(high.config._application_path + 'router.js').router;	

	high.util.compileCompressCSS();

	high.util.updateCacheControl();

	high.util.loadServerCode();

	if(high.config.env === "dev") {
		// recompile css periodically in dev mode
		setInterval(function devIntervalFunction(){
			high.util.compileCompressCSS()
		}, 5008)
	} 

	
})()




 
/*------------------------------------------------------------------------------------------
GLOBAL - SERVER
------------------------------------------------------------------------------------------*/
/*
	// the main server		
	note: runs on every request
*/
http.createServer(function (req, res) { 
	// start execution time monitor
	timeDiff.setStartTime();
	var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
	//postHandler(req, res, function(req, res, post){
		/******/
		// modify the res

		// store the api response object that can be modified globally until the server actually sends it to the client
		res['response'] = {
			meta: {
				status: 200,
				errors: [],
			},
			data: {
				// result data goes here, will extend the high global object $.extend(high.data, response.data) when it gets to the browser
				// so data paths must be consistent with the front-end
			}
		}
		// store headers we want to add
		res['headers'] = {}
		// pass fields on down
		res['fields'] = fields
		res['files'] = files
		// keep a reference to the request so we don't have to keep passing it over
		res['req'] = req
		// convenience function to handle api response
		res['kill'] = function(status, contentType) {
			if(typeof contentType === 'undefined') {
				contentType = 'application/json'
			}

			// authenticated actions kill(401) - not authenticated, kill(403) insufficient permissions
			if(typeof status === 'undefined') {
				status = 200;
			}
			res.response.meta.status = status

			var response = "";
			if(typeof fields.ajaxiframe_id !== 'undefined') {
				// ajaxforms are targetted at async iframes, use jsonp to trigger callback function on client.
				contentType = "text/html"

				res.response.meta.onSuccess = fields.onSuccess
				res.response.meta.onError = fields.onError
				res.response.meta.ajaxiframe_id = fields.ajaxiframe_id

				response = JSON.stringify(res.response);
				response = "<script type='text/javascript'>parent.fin.util.handleJsonp(" + response + ")</script>"
			} else {
				// regular responses are sent as json
				response = JSON.stringify(res.response);
			}
			
			res.headers['Content-Type'] = contentType

			this.writeHead(200, res.headers)
			this.end(response)										
		}
		// pathname is used for admin areas, different apps, or beta versions of the site
		res['pathname'] = fields.pathname;
		// hashbang is used for navigation
		res['hashbang'] = "/"; // default
		// command is used for non-url based actions
		res['command'] = fields.command;		
		if(typeof fields.hashbang !== 'undefined') {
			hashbang = fields.hashbang;
		}
		// fetch templates if requested
		high.util.getTemplates(fields, res)
		
		// keep a reference to segments
		res['segments'] = hashbang.toString().split("/");
		
		high.router(res, res.req, res.pathname, res.segments, res.command);						
	})
}).listen(high.config.port, "127.0.0.1");
	
