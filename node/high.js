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
var http = require('http');
	fs = require('fs');
 	querystring = require('querystring');
 	path = require('path');
	inspect = require('util').inspect;
	sys = require('sys');
	pump = require('util').pump;
	$ = require('jquery');
	
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
		strip_tags: function(input, allowed) {
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
		trim: function(str) {
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
		validate: function(data, type) {
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
		currentTime: function(type) {
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

	}
}

high.config = $.extend(true, {}, {
	_templates: {}, // used for storing the cached templates
	_application_path: __dirname + "/../application/",
	_template_path: __dirname + "/../templates/", // requres trailing slash
}, require(__dirname + "/../application/config.js").config)

high.mongo = new mongoDB('highfin', new server('localhost', 27017, {auto_reconnect: true, safe: false}));

// recursively load all application code onto the global high object
high.bootstrap = (function(path) {
	high.router = require(high.config._application_path + 'router.js').router;	

	var _path = high.config._application_path + "apps/"
	if(typeof path === 'undefined') {
		path = ""
	}
	_path += path; 
	var folder_contents = fs.readdirSync(_path)
	for(var i = 0; i < folder_contents.length; i++) {
		// ignore .files
		if(folder_contents[i].charAt(0) === ".") {
			continue
		}

		// load .js files 
		if(folder_contents[i].match('.js')) {
			var file_path = folder_contents[i];
			var object_path_array = String(path + file_path).replace('.js', '').split('/');
			var object_branch = high.apps;
			
			for(var j=0; j<object_path_array.length; j++) {
				if(j === object_path_array.length-1) {
					object_branch[object_path_array[j]] = require(_path + file_path)
				} else {
					if(typeof object_branch[object_path_array[j]] === 'undefined') {
						object_branch[object_path_array[j]] = {};
					}
					object_branch = object_branch[object_path_array[j]]
				}
			}

		} else {
			// it's a folder, so call this function again for that folder
			arguments.callee(path + folder_contents[i] + "/")
		}
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
		// template_list is a list of templates needed for the page to function
		var template_list = [];
		if(typeof fields.hashbang !== 'undefined') {
			hashbang = fields.hashbang;
		}
		// fetch templates if requested
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
						//log('is jas')
						//log(fs.existsSync(file_path + '.js'))
						ext = "js"
					} 

					if(fs.existsSync(file_path + '.html')) {
						ext = "html"
					} 
					//log(fs.existsSync(file_path + '.fn.js'))
					//log('hiiii')
					if(fs.existsSync(file_path + '.fn.js')) {
						//log('is fn')
						//log(fs.existsSync(file_path + '.fn.js'))
						ext = "fn.js"
					}
					file_path += "." + ext
					template_name_onclient = template_name + "-" + ext
					log(file_path)

					try { 
						high.config._templates[template_name] = JSON.stringify(fs.readFileSync(file_path, 'utf8'))						
					} catch(err) {
						// template wasn't found
						// make sure it's no longer in the cache
						delete high.config._templates[template_name]
						log("*")
						log("Error: Template ( " + template_name + " ) not found,") 
						log("Solve Error: create "+ template_name.replace(/.*_/, "") +".js OR "+template_name.replace(/.*_/, "")+".html in ( " + file_path.replace(/[a-z_\.]*$/, "").replace(/[a-z]*\/\.\.\//, "") + ")")
						log("*")
					}
				}
				// if the template is not in the cache now, the file wasn't found with any of the valid extensions, 
				// template is in cache so grab it from the cache
				res.response.templates[template_name_onclient] = high.config._templates[template_name]
				
			}
		}
		
		// keep a reference to segments
		res['segments'] = hashbang.toString().split("/");
		
		high.router(res, res.req, res.pathname, res.segments, res.command);						
	})
}).listen(high.config.port, "127.0.0.1");
	
/*------------------------------------------------------------------------------------------
DEFAULT
------------------------------------------------------------------------------------------*/	
/** 
************** DEBUG *****************
**/	

function createDummyMongo(req, res, post) {
	mongo.open(function(err, mongo) {
		mongo.collection('news', function(err, newscollection) {
		
			var query = {uid: "1316644563987as9f"}; 
			
			var post1 = {
					title: 'Post 1',
					timestamp: '1316644563',
					datestamp: 'Fri Jan 16 1970 00:44:04 GMT-0500 (EST)',
					type: 'news',
					url: '2011/09/post-1',
					author: "Yoav Givati",
					published: 1,
					views: 489,
					categories: [{	
								name: "Apps",
								slug: "apps"
							},
							{	
								name: "Web",
								slug: "web"
							}],
					tags: [{	
								name: "Microsoft",
								slug: "microsoft"
							},
							{	
								name: "Google+",
								slug: "google+"
							}],
					comments: [{	
								author: "Yoav",
								datestamp: 'Fri Jan 16 1970 00:44:04 GMT-0500 (EST)',
								comment: "microsoft is a little soft latesly",
								approved: 1
							},{	
								author: "Sue",
								datestamp: 'Fri Jan 16 1970 00:44:04 GMT-0500 (EST)',
								comment: "What what? oh yeah insane!!",
								approved: 1
							}],
					post: '<p>You\'re a Web Developer, a polyglot, you\'ve easily worked with over 15 syntaxes across language and framework and you\'re on the cutting edge of the 5 being used in your current project. You don\'t sleep like normal people should and it\'s been way too long since you last shaved. You have a blog where you try give back to the dev community that brought you here, you have Twitter, Google Plus, and a loose idea of personal brand. You speak out against the misuse of copyright, patent, IE, and corporate monopoly. There\'s a focus on</p>/---/<p>efficiency but it\'s often misguided or misplaced. You try freelancing or working a 9-5 dev job at some factory, but you\'re full of ideas for projects and useful tools that wouldn\'t even be that hard to code if you just had the time. This is a post about why you can and should anyway.</p><h1>Freelancing Sucks</h1><p>Nine times out of ten your clients are hiring you because they can\'t do it themselves. It\'s worse than that; they don\'t even know what you actually do, they only know that they want a "site" and they need a "web developer" to "code" it. Clients are needy people, and have very</p>/---/<p>definite very wrong wants for UI and design. They want you to work as though they were your only client, and as though their\'s was your only project. They don\'t want to pay you though, and they won\'t pay you on time. The bigger the client the more opportunity they have to squeeze work out of you while not paying you on time. The cheque will either be in the mail, delayed by the accounting department until Nancy gets back from vacation to dual approve sending the cheque out, or someone else will be blamed for letting your </p>/---/<p>invoice slip through the cracks. Yeah you could tell them you won\'t write anymore code until you get the cheque but if you need to hit the next milestone and get the next cheque sooner rather than later, and the cheque is "on it\'s way", you might as well just keep coding.</p><p>Smaller clients will just disappear when it\'s invoice time. And in both cases you\'ll be left wondering if they even want the code. Sometimes after a client dragging the project out for months with disperse weeks of silence peppered with subtle revision requests they\'ll have a spontaneous and total change of heart and try dump the project without compensating you for work done. No matter how well you weather the gauntlet of providing a tailored service to people who fundamentally don\'t get it and can\'t appreciate it you\'ll have to start all over again with the next one. You\'ll have to handle several projects at once working ridiculous hours under ridiculous amounts of stress to offset inevitable dry spells and you\'ll never know where your next client is coming from or when.</p><p>The majority of your time will be spent on the business side of things, while you fight in one way or another for the privilege to do the thing you love; albeit in a hindered distorted fashion only to bust </p>/---/<p>your ass trying to meet obscure client demands.</p><p>There\'s no purity in freelance.</p><h1>Factory Farmed Code</h1><p>All companies are not Google. Your boss is not a programmer, she\'s a middle manager who stares at spreadsheets and gantt charts all day and who\'s only drive in life is to push you to meet deadlines reasonable only to the marketing, or business dev departments. You\'re not going to go in and have your ideas heard. You\'re not even going to be present at every relevant meeting. You\'re livestock. You are scheduled to have your soul removed and sterilized between the hours of 9am and 5pm every weekday, with frequent overtime. You\'re expected to work as hard as you can on a project that no one else you work with cares about off hours. You\'re expected to produce value for a company that doesn\'t care about you which far exceeds what you\'re being compensated and more importantly you\'re working on something you don\'t care about.</p><p>There\'s no purity in a factory.</p><h1>Leverage</h1><p>Life as a cog in someone else\'s machine is made harder with no external leverage. If you need that next paycheck you\'re going to have to stick it out and you\'re going to have to do a really good </p>/---/<p>job to make sure you get another one. If your employment is a chess game of contracts and balancing demand what you need is leverage; security, a safety net. In terms of the proverbial chess game you need a baseball bat to take out your opponent\'s rooks if things go pear shaped. You don\'t have to quit freelancing or tell your boss to hire some other sap to push brackets for the man, but you do need to know for yourself that it\'s a tangible option, and you need something of your own to grow and nurture. Something that resonates with your soul and your vision —your machine. Something pure.</p><p>What you need is to identify a market, create a solid(read: static, one-size-fits-all) product or service, pick a price point, and let it sell itself with an occasional marketing push.</p><p>You don\'t just need this for the money. You need this to maintain sanity. You need this for freedom. And you need this for purity.</p><p>So take an hour a day and start looking at the different platforms desperate for you to innovate. iOS, Android, Blackberry, AIR, browser plugins, server software, developer tools, the web. Markets already exist, the platforms exist, the creation tools are there. Play with some </p>/---/<p>apps and see how you\'d execute and implement better. Talk to users and see what needs aren\'t being adequately met and just build something. You don\'t need the perfect domain name, although try avoid hyphens, you don\'t need a whole team working on generating perfect copy and high impact design, just focus on function and usability and get a working version in front of somebody. You won\'t be sorry. It will not be time wasted.</p>',					
					leadgallery: [{
							type: 'image',
							img: '/assets/imgs/test2.png',
							full: '/assets/imgs/test4.jpeg',
							caption: 'hi <a href="http://yoavgivati.com">test</a> test test..jaksfljas',
						}],
				
				};
				
			var post2 = {
					title: 'Post 2',
					timestamp: '1316644575',
					datestamp: 'Fri Jan 16 1970 00:34:04 GMT-0500 (EST)',
					type: 'news',
					url: '2011/09/post-2',
					author: "Yoav Givati",
					published: 0,
					views: 500,
					categories: [],
					tags: [],
					post: 'Hi this is a post',
					leadgallery: [{
							type: 'youtube',
							youtube: 'PMZ5s7o2F88'
						}]
				
				};
				
			var post3 = {
					title: 'Post 3',
					timestamp: '1316644581',
					datestamp: 'Fri Jan 16 1970 00:44:04 GMT-0100 (EST)',
					type: 'news',
					url: '2011/09/post-3',
					author: "Yoav Givati",
					published: 1,
					views: 500,
					categories: [],
					tags: [],
					post: 'asdfsdf',
					leadgallery: [{
							type: 'image',
							img: '/assets/imgs/test3.png',
							full: '/assets/news/uploads/img1-full.jpg',
						}],
				
				};

			newscollection.remove({}, function() {

				newscollection.insert(post1, function() {
								
					newscollection.insert(post2, function() {
				
						newscollection.insert(post3, function() {
					
							if(req.connection.destroyed == false) {
								if(err) {
									res.write('error: '+err);	
								}
								if(res) {
									
										mongo.close()
									res.end('Dummy Database Recreated');
								}					
							}
						})
					})				
				})		
			})
		})
	})

}