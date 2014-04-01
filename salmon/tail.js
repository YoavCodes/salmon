/*------------------------------------------------------------------------------------------
GLOBAL - BOOTSTRAP
------------------------------------------------------------------------------------------*/
/*
	// global log function, for consistency with clientside code
*/
log = function log(msg) {
    if (console) {
        console.log(msg);
    }
};

/*
	// global error handler
	// process will still crash, but we can do stuff after it crashes, like send an email or log it to a dashboard or something
*/
process.on('uncaughtException', function(e) {
    // something
    try {
        log(e);  

    } catch (err) {
        //uggg
    }
})


    
// global server-side tail object 
tail = {
    app: {
        // used for storing application functions. ie: controllers and public models in MVC
        // typically not defined here.
    },
    util: {          
        /*
        extend an object, can be used as clone by specifying a a new blank object in the first param, and the object to clone in in the second
        */
        extend: function extend(obj) {
            Array.prototype.slice.call(arguments, 1).forEach(function(source) {
                if (source) {
                    for (var prop in source) {
                        if (source[prop].constructor === Object) {
                            if (!obj[prop] || obj[prop].constructor === Object) {
                                obj[prop] = obj[prop] || {};
                                tail.util.extend(obj[prop], source[prop]);
                            } else {
                                obj[prop] = source[prop];
                            }
                        } else {
                            obj[prop] = source[prop];
                        }
                    }
                }
            });
            return obj;
        },

        /*
			strip html tags
			note: if b is specified as an allowable tag, it will preserve <b></b> tags, but will remove tag params ie: <b onclick="javascript()">bold text</b> 
					will be converted into <b>bold text</b>, this prevents javascript injection in allowable tags
			@input - html string
			@allowed "b,i", comma separated string of alloweable tags
		*/
        strip_tags: function strip_tags(input, allowed) {
            if (input == undefined) {
                return "";
            }            
            // array of allowable tags
            allowed = allowed.split(',')
            input = input.replace(/<!--[\s\S]*?-->/gi, '') // html comments
            .replace(/<(\/? *[a-z][a-z0-9]*)\b[^>]*(\/?)>/gi, function($0, $1) { // html tags
                // for closing tags, remove the slash before checking if the tag is allowed
                var tag = $1.replace('/', '');
                if (allowed.indexOf(tag) >= 0) {
                    // allowed tag
                    var self_closed = ""
                    if ($0.indexOf('/>') >= 0) {
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
            if (typeof data === 'undefined') {
                return false
            }
            switch (type) {
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

            if (data.match(regex) == null) {
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
            switch (type) {
                case "time":
                    // seconds passed the epoch, used for sorting and server side operations
                    return new Date().getTime().toString();
                    break;
                case "date":
                    // UTC datetime, used for timezone support and displaying dates and times to the user
                    return new Date().toString();
                    break;

            }
        }
    }
}


// define app paths, passing in the base project directory
require('./tail/paths')(__dirname + '/../');

// bootstrap the application
// bootstraps the app then exports a set of functions that may be used later in certain edge cases
tail.util.bootstrap = require('./tail/bootstrap-utils');

// load the static file server / global request handler
require('./tail/server');










