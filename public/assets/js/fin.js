/* fin.js v1.0.0
 * Copyright 2012-2014, Yoav Givati ( hello@yoavgivati.com )
 * http://highf.in ~ http://chalkhq.com
 *
 * Released under the MIT license
 * http://highf.in/salmon/#!/license
 *
 * 
 * Updated: 12-2014
 * Requires jQuery

 */
;(function($, window) {

function init(config) {

/* 
use log() instead of console.log() to prevent client side errors in some browsers that lack a console.
@msg = [String or Object] what to print in the console
*/

window.log = function log() {
    if(typeof console !== 'undefined') {
         console.log.apply(console, arguments);
    }
}


/*
	global ajax error handling
*/ 

$.ajaxSetup({
  cache: false,
  error: function(xhr, textStatus, errorThrown) {
  	var res = xhr.responseText;
  	// switch unhandled error codes
  	switch(xhr.status) {
  		case 404:
  			//log('404 error')
  			break;
  	}
  	//log($.parseJSON(res).error)  	
    
    // removes an item from the loading queue
    // if(loading !== undefined) {
    //     loading(false)
    // }
    return true
  }
});



/****************************/

// fin object
//===========================/
/****************************/

/*
	the fin() function takes dot notation string and does object lookups with BDD style filtering, sorting, modifying functionality
	any property value can be a string beginning with two underscores which are representing dot notation paths that can be automatically parsed
	and followed depending on how you use fin().
*/
var fin = function fin(obj_path, object){

	if(typeof obj_path !== 'string') {
		return
	}	

	// filters are used to filter out properties of an object based on their properties. useful if you have an object of blog post objects
	// that you want to filter by author
	var filter = {
		prop: "", // dot notation path relative to dotPath
		val: "", // the value to compare it to, could be any type incl regex.
		method: "" // the method of comparison ie: is(), contains, regex, etc.
	}

	var findings = {
		obj_path: obj_path, // the original looked up path
		// manipulating values/properties at the end of a dotkey chain
		val: void 0, // the final value of the property specified in obj_path, after following the dotkey chain		
		// manipulating values/properties that store the first dotkey before following the chain
		key: "", // if the value of obj_path is a dotkey, store the dotkey string here. we only care about the dotkey at the original obj_path. not the rest in the chain		
		/*
			modify findings
		*/
		// narrow down findings
		find: function(dot_path) {
			return fin(dot_path, findings.val);
		},
		// set a new value
		set: function(new_value, follow_dotkeys) {
			dot(obj_path, object, findings, false, new_value, follow_dotkeys);
			return findings;
		},
		// deletes the property and value at the end of the lookup chain and then regressively changes dot.string's followed to get there
		remove: function(follow_dotkeys) {
			dot(obj_path, object, findings, true, void 0, follow_dotkeys);						
		},

		/*
			filter findings
		*/
		filters: [ [] ], // [[this, andthis], [orthis, andthis]]
		current_filter: { or: 0, and: 0 },
		/*
			where(), and(), or() all create a new filter at the appropriate position in the filter list
		*/
		where: function(filterPath) {
			var f = Object.create(filter);
			f.prop = filterPath;								
			this.filters[this.current_filter.or][this.current_filter.and] = f;
			return this
		},
		and: function(filterPath) {
			this.current_filter.and++;
			this.where(filterPath);
			return this
		},
		or: function(filterPath) {
			this.current_filter.or++;
			this.current_filter.and = 0;
			this.filters.push([]);
			this.where(filterPath);
			return this
		},
		/*
			comparison methods configure the filter
		*/
		// strict equality
		is: function(value) {
			var f = this.filters[this.current_filter.or][this.current_filter.and];
			f.val = value;
			f.method = function(prop, val) {
				if(prop === val) {
					return 1
				} else {
					return false
				}
			}
			return this
		},
		// truthy or falsey
		// @value: boolean. ranks matching boolean higher than matching truthy/falsey
		truthyFalsey: function(value) {
			var f = this.filters[this.current_filter.or][this.current_filter.and];
			f.val = value;
			f.method = function(prop, val) {					
				if(prop === val) {
					// exact match
					return 2
				} else if(prop == val) {
					// truthy match
					return 1
				} else {
					// no match
					return false
				}
			}
			return this
		},
		// string contains matches for a substring or regex
		// @value: normally a regular expression
		// 		if you pass in a string, it will construct a regular expression with the g flag
		contains: function(value) {
			var f = this.filters[this.current_filter.or][this.current_filter.and];
			f.val = value;
			f.method = function(prop, val) {
				if(typeof val === 'string') {
					var val = new RegExp(val, 'g');
				}
				matches = prop.match(val);					
				if(matches !== null && matches.length > 0) {
					return matches.length
				} else {
					return false
				}
			}
			return this
		},
		// generic filter method, lets you pass in your own
		// fn(prop, val) where prop is the resolved value of the property to compare
		// and val is the value to compare it against, originally passed into the compare() function as value
		// fn() must return a number describing the "relevance" or strength of the match. if it's not a match return false
		// note: the fn() f.method will actually be called in sort along with all the other and() and or() filters
		compare: function(value, fn) {
			var f = this.filters[this.current_filter.or][this.current_filter.and];
			f.val = value;
			f.method = fn;
			return this
		},
		sort: function(sort_method) {
			// apply filters
			var results = [];
			var relevance_array = []; // [result, relevance]temporary array for storing the relevance of each match. for sorting
			// loop through dataset
			for(var key in this.val) {
				var result = this.val[key];
				var is_match = false;
				var total_relevance = 0;
				// loop through or[] and and[] filters
				// if a filter fails to match, it will break to the next or[] group
				// so all the and[] filters in at least one or group must match to push it to the array					
				or_matching:
				for(var or=0; or<this.filters.length; or++) {
					var or_group = this.filters[or];
					for(var and=0; and<or_group.length; and++) {
						var f = or_group[and];
						relevance = f.method(fin(f.prop, result).val, f.val);
						if (relevance === false) {
							continue or_matching
						}
						total_relevance += relevance;
					}
					// all the ands in an or[] group matched
					is_match = true;
				}

				if(is_match === true) {
					relevance_array.push( {result: result, rel: total_relevance} );
				}
			}
			// secondary relevance sort
			var rel_sort = function(a, b) {
				// descending from most relevant
				return b.rel - a.rel;
			}

			relevance_array.sort(function(a, b) {
				var sort_comparison = 0;
				// call a custom sort method if provided
				if(typeof sort_method === 'function') {
					sort_comparison = sort_method(a.result, b.result);
				}
				// call secondary relevance based sort
				if(sort_comparison === 0) {
					sort_comparison = rel_sort(a, b);
				}
				return sort_comparison
			});


			for(var r=0; r<relevance_array.length; r++) {
				results.push(relevance_array[r].result);
			}

			return results

		}
	}

	function dot(dot_path, object, findings, remove, new_value, follow_dotkeys) {
		var path = dot_path.split('.');
		// assume namespace is window if undefined
		if(object == undefined) { // this will assert true for null or undefined, assuming the var exists, which it does in this scope, just doesn't have a value		
			path.unshift(window); 
		} else {
			path.unshift(object);
		}
		// loop for iterating through object, following dot.paths
		var value;
		if(path.length > 0) {
			 
			findings.val = path[0];

			for(var i=1; i < path.length; i++) {
				var path_i = path[i];
				var findings_val_path_i = findings.val[path_i];
				var next_i = i+1;
				if(typeof findings_val_path_i === 'undefined') {
					// create a blank node if the key doesn't exist.. if we're trying to access it, it means we want it to exist
					// this is a convenient way to create a new property and ensure all the parents exist				
					findings.val[path_i] = {};

				} else if (findings_val_path_i === null) {				
					return null
				}				
				// check if it's a dot.key
				if(typeof findings_val_path_i === 'string' && findings_val_path_i.substr(0, 2) === "__") {
					var dot_string = findings_val_path_i.substring(2);	
					// if findings.val is a dot string save it in findings.key
					// note: since we only return the original findings, this will only represent the first dot.string at the obj_path value					
					findings.key = dot_string;	
					
					// we're deleting the property and this is a dot.path
									
					if(next_i == path.length && remove === true) {												
						if(follow_dotkeys !== false) {
							// default: follow dot.paths changing them to empty strings	
							dot(dot_string, null, {}, remove); 
							findings.val[path_i] = ""
							return
						} else {
							// we're not following dotkeys, just delete the property/value that stored the dotkey
							// note: if you wanted to set the dotkey to an empty string use fin().set('', false) instead of remove()
							delete findings.val[path_i];
						}
					} else if(next_i == path.length && new_value !== undefined) {
						if(follow_dotkeys !== false) {
							// default behaviour: we're setting a new value at the end of the lookup chain
							dot(dot_string, null, {}, false, new_value);
						} else {
							// we're not following the dotkey, we're setting it to a new value
							findings.val[path_i] = new_value
							return
						}
					} else {
						// do lookup
						// we only care about findings.val or final value of nested dot lookups here, returned to the original findings object
						findings.val = fin(dot_string).val;	
					}

				} else {	
					// if we're deleting a property and this is the property
					if (next_i == path.length && remove === true) {
						delete findings.val[path_i]
						return
					}
					if(next_i == path.length && new_value !== undefined) {
						findings.val[path_i] = new_value
					}
					findings.val = findings.val[path_i];
				}
			}

		} else {
			findings.val = false;
		}


		return findings	
	}

	return dot(obj_path, object, findings);
};


// settings and defaults
fin.settings = $.extend(true, {}, {		
	// nav
	leave_alert: null, // set to "" to activate or null to disable. alerts user for confirmation on navigate away/reload
	disable_nav: false, // toggle true/false to disable hashbang navigation
	/*
	Navigation object
		
		'nav_key': { // the name of the 'page' call nav('nav_key') to  to this page
			'before_func': [[function, {arg: value, arg1: value1}]],  // array of functions to run before rendering the page, with a dictionary of objects to pass to the function, uses Function.prototype.args(), so dictionary should match the arguments the function expects plus others. expected arguments not passed will be undefined, extra arguments will be iterated over with no guarantee of sequence
			'sidebar': ['template_id', 'template2_id'],   // list of templates to render into the sidebar. Actually templates are all #block_template_id. but #block_ is excluded here and prepended automativally by the nav() function
			'userbar': ['_user'],   // same as sidebar, the underscore before user indicates that the template should not be re-rendered if it already exists on the stage, and can be used on any template_id
			'after_func': [[function, {arg: value, arg1: value1}]] /// like before_func, a list of functions that run after rendering all templates
			'async_templates': ['', ''], // templates rendered by calling the fin.render() function from within another template or that are otherwise needed by this page after rendering. 
										 // ie: templates listed here will be requested from the server. you can list any template here you want to request from the server at bootstrap, it doesn't matter if it's a duplicate mentioned somewhere else, 
										 // this is just marking it as a dependency for this 'page', so as long as a page needs it, it'll be fetched
		}
		notes: 
		 1. if you leave out sidebar, or any other container, the entire container will be left intact with rendered templates intact
		 2. if you specify a blank array for sidebar, or any other container, the entire container will be cleared and replaced with the templates you specify
		 3. all templates are given access to the global data model
		 4. templates may be nested and also have functions called from within the template itself at various stages during the rendering process
		
	*/
	navigate: {},
	containers: [],
	routes: {},
	callbacks: {
		afterNavCallback: undefined,
	},
	/* 
		global form response handlers to override default behaviours
		- specify per-form success/error handlers with the ce() function
	*/
	global_form_onSuccess: undefined,
	global_form_onError: undefined,
	
}, config);

// perform recursive object extending
// properties that are objects are recursed
// properties that are arrays can either be replace or DRYly appended to. if obj === true, then it'll append arrays.
// properties that are other types will always be replaced, the child is always more correct than the parent.
// for arrays of objects, we can't logically assume to recurse through those objects. extend them manually first.
// @obj... pass in any number of objects. the first object will be extended with the second, then with the third, and so on
// by default, properties that exist in the first object will be overwritten if they exist in the second
// @obj pass in true as the first parameter to change the default behaviour so that existing properties are extended, not overwritten
fin.extend = function(obj) {
	// [].constructor === Array	
	if(typeof obj === 'undefined') {
		return {};
	}

	var args = Array.prototype.slice.call(arguments, 1);
	var extend = false; // by default existing properties are overwritten
	if(obj === true) {
		extend = true;		
	}
	if(typeof obj === 'boolean') {
		obj = arguments[1];
		args.shift();
	}
	for(var a=0; a<args.length; a++) {
		var extending_obj = args[a];		

		// is obj an object or array
		if(extending_obj.constructor === Object && obj.constructor === Object) {

			for(var prop in extending_obj) {
				// if the property doesn't exist in obj, then just add it
				if(typeof obj[prop] === 'undefined') {
					obj[prop] = extending_obj[prop];
					continue;
				}
				// otherwise if there's a conflict
				// if the property's value is an object or array, then recurse
				if(extending_obj[prop].constructor === Object || extending_obj[prop].constructor === Array) {					
					fin.extend(extend, obj[prop], extending_obj[prop]);
				} else {
					if(extend === false) {
						// overwrite 
						obj[prop] = extending_obj[prop];
					} 
				}
			}

		} else if (extending_obj.constructor === Array && obj.constructor === Array) {
			if(extend === false) {
				// overwrite array
				obj = extended_obj;
			} else {
				// DRY extend array
				for(var b=0; b<extending_obj.length; b++) {
					if(obj.indexOf( extending_obj[b] )) {
						obj.push( extending_obj[b] );
					}
				}
			}
		} else {			
			// mismatch. trying to extend an array with an object, visa versa, or some other types passed in.
			// child is always more correct than parent if types disagree
			obj = extending_obj;

		}
	} 

	return obj;

}

// transform passed in navigate objection from hierarchical DRY to flat explicit structure
/*
	navigate: { // a list of 'pages' defined as functions to run and container->templates to render
        // landing
        'blog': {
            require: ['misc'],
            before_func: [['fin.fn.misc.setCurrentApp', {app: 'blog'}]],
            maincontent: ['_sidebar']
            footer: ['_blog_footer'],
        },
        'singlepost': {
            parents: ['blog'],
            require: ['blog_comments', 'blog_tags'],  
            before_func: [['fin.fn.misc.otherfunction', {thing: 'one'}]], 
            maincontent: ['blog_singlepost'],
        }
    }

    will be transformed to: 

    navigate: {
		'blog': {
		    require: ['misc'],
		    before_func: [['fin.fn.misc.setCurrentApp', {app: 'blog'}]],
		    footer: ['_blog_footer'],
		},
		'singlepost': {
            require: ['misc', blog_comments', 'blog_tags'],  
            before_func: [['fin.fn.misc.setCurrentApp', {app: 'blog'}], ['fin.fn.misc.otherfunction', {thing: 'one'}]], 
            maincontent: ['_sidebar', blog_singlepost'],
            footer: ['_blog_footer'],
        }
    }
*/
fin.transformNavigationObj = function() {
	var navigate = fin.settings.navigate;
	var flat_navigate = {};
	var reserved_words = ['parents', 'before_func', 'after_func']; // note: require: [] templates should be loaded here

	for(var page in navigate) {				
		// a parent must be defined before a child, so it must already exist in flat_navigate
		var parents = navigate[page].parents;
		delete navigate[page].parents;

		if(typeof parents !== 'undefined') {
			// true implies a deep_copy, so arrays and objects are extended not overwritten
			// ie: if you do something in a parent, it will also happen in the child. before whatever the child does
			var extend_array = [true, {}];					
			flat_navigate[page] = {};

			for(var i=0; i < parents.length; i++) {
				// add already processed parents from flat navigate
				extend_array.push(flat_navigate[ parents[i] ]);
				//$.extend(true, flat_navigate[page], flat_navigate[ parents[i] ]);
			}
			// add this page
			extend_array.push( navigate[page] );
			//$.extend(true, flat_navigate[page], navigate[page]);
			flat_navigate[page] = fin.extend.apply(this, extend_array);
		} else {
			flat_navigate[page] = navigate[page];
		}
	}
	fin.settings.navigate = flat_navigate;

}

fin.transformNavigationObj();

fin.data = { // for storing app data fin.data.news.some_stored_data

};
/*
	for storing app specific/namespaced functions. that you'd want to access globally typically loaded from templates
	functions defined in /templates/news/comments.html as
	exports.post = function() {
		// post a comment here
		log('')
	}
	will be auto namespaced to the following when fetching that template
	fin.fn.news.comments.post = function() {
		// post a comment here
		log('')
	}

*/
fin.fn = { 

};

// used by highfin.js for storing generic/state data
fin._meta = { 
	templates: {

	},		
	// path
	hostname: window.location.hostname.toString(),
	protocol: window.location.protocol.toString(),		
	domain: "//" + window.location.hostname.toString(),
	pathname: "",

	hashbang: "",

	segments: [],
	// nav
	// will always return the last_nav, if @nav is supplied it will first set that as the last nav
	last_nav: function(nav) { 
		if(typeof nav !== "undefined" && nav !== fin._meta.last_nav_array[fin._meta.last_nav_array.length - 1]) {
			fin._meta.last_nav_array.push(nav)
		} 
		return fin._meta.last_nav_array[fin._meta.last_nav_array.length - 1] || ""
	},
	// simulate a back button
	go_back: function() {
		fin._meta.last_nav_array.pop()
		if(fin._meta.last_nav() !== "") {
			nav(fin._meta.last_nav())
		} else {
			welcome()
		}
	},
	last_nav_array: [],
	// loading queue
	loading: [],
};

// used for storing generic meta/state data in your app
fin.meta = {	
		
};
	
// bindings model
// a way to link nodes in the data model to templates and parent elements, or directly to elements, so that as the data model is updated, their bound DOM elements or templates refresh.. bindings is the heart of real-time
fin.bindings = {
	feed: {
		template: "#feed_item_template",
		item: {
			comment: {
				template: "#feed_item_comment_template"
			}
		}
	}
};


/*
Main navigation function

	1. All hide-able elements are hidden with each navigation, distinquished by class="elem" from permanent elements which lack the class
	2. we find the matching key in the nav object, show all the elements in the show array, and run all functions in the before_func and after_func arrays at the appropriate times

	@key = the key in the navigate array, ie: the 'page' we're navigating to
	@containers = if we only want to render/re-render specific containers, specify an array of strings here
*/ 


fin.nav = function(key, containers) {
	if(fin.settings.disable_nav.length > 0) {
		//_.alert(data.meta.disable_nav, [["ok", ""]])
		log('hashbang navigation disabled');
		return
	}	
	var nav_obj = fin.settings.navigate[key];
	if(typeof nav_obj === 'undefined') {			
		log(key + ": The page you were navigating to has not been implemented yet.");
		return
	}
	var reserved_keywords = ['before_func', 'after_func'];
	var missing_templates = [];
	// if we don't have all the required templates, then fetch them
	for(var container in nav_obj) {
		if(reserved_keywords.indexOf(container) >= 0) {
			continue;
		}
		for(var i=0; i<nav_obj[container].length; i++) {
			var t_name = nav_obj[container][i];
			// if it's missing, and we don't already know it's missing, add it to the missing list
			if(typeof fin._meta.templates[ t_name ] === 'undefined' && missing_templates.indexOf( t_name ) === -1) {
				missing_templates.push( t_name )
			}
		}
	}
	// if we're missing some templates, get them before navigating, otherwise just navigate
	if(missing_templates.length > 0) {
		var params = {
			template_list: missing_templates.toString()
		};

		fin.getData(params, _nav);
	} else {
		_nav();
	}

	// todo: add callback here

	// google analytics track navigation
	// var key_to_path = "/" + key
	// key_to_path = key_to_path.split('_')
	//for(var i=0; i<key_to_path.length; i++) {
		//key_to_path[i].replace(/^s$/, 'student').replace(/^p$/, 'professor')
	//}
	// key_to_path = key_to_path.join('/') 
	// if(typeof _gaq !== 'undefined') {
	// 	_gaq.push(['_trackPageview', key_to_path]);
	// }
	function run_funcs(fns) {
		if(typeof fns !== 'undefined') {
			for (var i = 0; i < fns.length; i++) {
				var fn = fns[i][0];
				var args = fns[i][1];
				// if it's a string, do a dot.key lookup
				if(typeof fn === 'string') {
					fn = fin(fn).val;
				}
				// if it's now a function, try curry it with named args and call it
				if(typeof fn === 'function') {
					fn.curry( args )()	
				}
				
			}
		}
	}

	function _nav() {

		//clear field errors
		$('input').parent().removeAttr('original-title')
		//$('.tipsy').hide()


		// run before functions
		run_funcs( nav_obj['before_func'] );
		

		var scrollToTop = false

		reserved_keywords.push('require');

		for(var container in nav_obj) {		
			if(reserved_keywords.indexOf(container) >= 0) {
				continue;
			}


			// mark rendered templates to be cleared
			$('#' + container + ' > div' ).addClass('toclear');


			

			for (var i = 0; i < nav_obj[container].length; i++) {
				var template_name = nav_obj[container][i]
				if(nav_obj[container][i].substring(0, 1) === "_") {
					var template_name = nav_obj[container][i].substring(1, nav_obj[container][i].length)
				}
				if (i === 0) {
					//$('#' + containers[c] + ' > div').addClass('toclear')
				}
				
				var render = true;
				// if templatename is preceded with an underscore, check if it's already rendered
				if(nav_obj[container][i].substring(0, 1) === "_") {
					// remove underscore
					// check if already rendered
					if($('.block_' + template_name).length > 0) {
						// remove from clear list
						$('.block_' + template_name).removeClass('toclear')
						render = false;
					}
					
				}
				if(render === true) {
					if(typeof fin._meta.templates[template_name] !== 'undefined') {
						fin.render('#' + container, template_name, false)
					} else {
						// note error will already be logged
						fin.log.solution('Template "' + template_name + '" did not compile. See client or server console output for solution.');//nav_obj[fin.settings.containers[c]][template_name])
					}
				}
				
			}							
		}

		// keep track of the last nav function run
		fin._meta.last_nav(key);

		if(scrollToTop === true) {
			$('body').scrollTop(0)
		}

		run_funcs( nav_obj['after_func'] );

		
		// remove templates marked for clear
		$('.toclear').remove()

		if(typeof fin.settings.callbacks.afterNavCallback !== 'undefined') {
			fin.settings.callbacks.afterNavCallback()
		}
		
	}


};

/*  nav functions  */
// loading function
// @isLoading, true to add something to load, false to clear it
fin.loading = function(isLoading) {
	if(isLoading === true) {
		fin._meta.loading.push('.');
	} else {
		fin._meta.loading.pop();
	}
	// show/hide the loading ui
	if(fin._meta.loading.length > 0) {
		$('#loading').show();
	} else {
		$('#loading').hide();
	}
};

/*
    if user accidentally navigates away, closes the tab, or otherwise. ask if they really want to close highfin.
*/
fin.onbeforeunload = function (e) {
    e = e || window.event;

    var msg = "Are you sure you want to leave?";

    // For IE and Firefox prior to version 4
    if (e) {
        // nevermind, just show ie users chrome frame
       // e.returnValue = msg;
    }

    // uncomment to activate
    return fin.settings.leave_alert;
};

fin.onHashchange = function(){
	// respond to location change events.

	// make sure uri is encoded for consistency
	if(encodeURI(decodeURI(window.location.href))  !== window.location.href) {
		window.location = encodeURI(decodeURI(window.location.href)) 
		return;	
	}
	// visual loading
	$('#loader').css('opacity', 1);
	// get hashbang uri
	fin._meta.hashbang = (window.location.hash).replace("#!","");
	// if we're coming from an escaped fragment link		
	if(window.location.search.match("_escaped_fragment_=")) {
		fin._meta.hashbang = window.location.search.substr(window.location.search.indexOf("_escaped_fragment_=")+String("_escaped_fragment_=")
			.length, window.location.search.length);	
	}
	// parse hash segments
	fin._meta.hashbang = fin._meta.hashbang.replace(/(^\/)|(\/$)/, ""); // regex: remove end slashes
	//split
	segments = fin._meta.hashbang.split("/");

	// try load route
	// search routes for match, to determine page to render
	// if hashbang is #!/news/search, will try `news/search`, and then `news` in fin.settings.routes until it finds a match
	var match_bang = fin._meta.hashbang;
	for(var i=0; i < segments.length; i++) {
		
		if(typeof fin.settings.routes[match_bang] !== 'undefined') {
			fin.nav(fin.settings.routes[match_bang]);
			return
		} else {
			//log('route ' + match_bang + ' not found')
		}
		// try a parent path. ie: if #!/news/search/ is not defined, try #!/news/
		match_bang = match_bang.replace(/\/[^\/]*$/, "");
	}

	// there were no matching routes for the current hash, so show default screen
	if(typeof fin.settings.default_page !== 'undefined') {		
		fin.nav(fin.settings.default_page)		
	}



};



fin.fetchTemplates = function(){
	var params = {}

	// fetch all templates for this page if we haven't already.
	if(typeof fin._meta.template_list === 'undefined') {				
		fin._meta.template_list = [];

		// include require special container to fetch those templates
		var containers = $.extend([], fin.settings.containers)
		containers.push('require')
		// for each page in the navigate object
		for(var page in fin.settings.navigate) {
			// for each container defined
			for (var c = 0; c < containers.length; c++) {
				var container = containers[c];
				// if the container's been defined in the page
				if(fin.settings.navigate[page][container] !== undefined) {
					// loop through the templates defined in that container
					for (var i = 0; i < fin.settings.navigate[page][container].length; i++) {
						var template_name = fin.settings.navigate[page][container][i]
						if(template_name.substring(0, 1) === "_") {
							template_name = template_name.substring(1, template_name.length)
						}
						if($.inArray(template_name, fin._meta.template_list) === -1) {
							fin._meta.template_list.push(template_name)
						}
					}
				}
			}
		}

		params['template_list'] = fin._meta.template_list.toString()
	} 

	fin.getData(params, function(){				
		// Trigger the event (useful on page load).
			//$(window).hashchange();								
			window.onhashchange();
	})
};

/*
Get server data
@_params: <optional>ly overide params
*/
fin.getData = function(_params, _callback) {

	var params = {
		pathname: fin._meta.pathname, // the path part of the url eg: blah.com"/app/"
		hashbang: fin._meta.hashbang, // the hashbang part of the url eg: blah.com/app/#!"/test/thing/"
		command: "", // a command that we doesn't warrant changing the url eg: "delete post"
	}

	$.extend(params, _params, true)

		// request templates and data from server
	$.post(fin._meta.domain+":"+window.location.port+"/0", params, function(res, status, xhr) {
		
		// if there are templates, then process the into locally cached templates
		for(var i in res.templates) {
			try {
				fin.cacheTemplate(i, $.parseJSON(res.templates[i]))
			} catch(err) {
				fin.log.error("(error parsing template) "+ err.message, i.replace("-", ".")) 
				if(err.message.match(/ILLEGAL/)) {
					fin.log.solve("make sure you're using backticks for strings correctly, double quotes outside of a backtick or single quote delineated string, are ILLEGAL tokens")	
				}
			} 
		}

		if(res.meta.status == 200) { 
			
			

			// extend the data model
			// requires much more advanced cache control
			$.extend(true, fin.data, res.data)
			//fin.data = res.data
			if(typeof _callback !== 'undefined') {
				_callback()
			}

		} else if(res.meta.status === 401) {
			//fin.nav('login')
		}
	})

};

/*
handles jsonp results
@response: is the response object
*/
fin.handleJsonp = function(response) {
	
	// this function will stop executing as soon as the ajaxiframe is removed and the reference to the response argument may also be lost
	// clone res
	var res = $.extend({}, response);
	// create independent function
	(function(res){
		log('handling jsonp')
  	log(res)
  	// extend data object
  	$.extend(true, fin.data, res.data)
  	// get rid of the ajax iframe
  	$('#'+res.meta.ajaxiframe_id).remove()
  	// handle result
  	if(res.meta.status === 200) {
  		// handle success
		if(typeof res.meta.onSuccess !== "undefined" && typeof fin(res.meta.onSuccess).val === "function") {
			// dev is handling this form's success
			fin(res.meta.onSuccess).val(res)
		} else {
			// let user know if they specified an onSuccess handler for the form, but forgot to define it.
			if(typeof res.meta.onSuccess !== "undefined" && typeof fin(res.meta.onSuccess).val !== "function") {
				fin.log.error(res.meta.onSuccess + "() is not defined. Using global onSuccess handler")
			}
			// generic form success
			if(typeof fin.settings.global_form_onSuccess === "function") {
				// dev is handling generic form sucess
				typeof fin.settings.global_form_onSuccess(res)
			} else {
				// generic form success 
				log(res.meta.status)
				log(res)
			}
		}
	} else {
		// handle error
	  	if(typeof res.meta.onError !== "undefined" && typeof fin(res.meta.onError).val === "function") {
	  		// dev is handling this form's error
	  		fin(res.meta.onError).val(res)

	  	} else {
	  		// let user know if they specified an onError handler for the form, but forgot to define it.
	  		if(typeof res.meta.onError !== "undefined" && typeof fin(res.meta.onError).val !== "function") {
				fin.log.error(res.meta.onError + "() is not defined. Using global onError handler")
			}
	  		// generic form error
			if(typeof fin.settings.global_form_onError === "function") {
				// dev is handling generic form error
				typeof fin.settings.global_form_onError(res)
			} else {
				// generic form error 
				log(res.meta.status)
				log(res.meta.error_messages)
				log(res)
			}
	  	}
	}

	//setTimeout(function(){log('-----');log(res)},0)
	})(res)		
};

	/*
		Global client side form validator
	*/
fin.formValidator = function(fields, form) {

	var form_id = form.attr('id')
	var valid = false;

	switch(form.attr('id')) {
		//todo: make public array of objects
		// [{formid: "form_login", "callback":"fun()"}]
		// where the callback returns true or false
		/*case "form_login":
			valid = true;
			break
		case "form_register_prof":
			data.meta.confirm_email.first_name =  fields[1].value;
			valid = true;
			break;
		case "form_register_student":
			data.meta.confirm_email.first_name =  fields[1].value;
			valid = true;
			break;
		case "form_reset_password":
			data.meta.reset_password.email = fields[1].value;
			valid = true;
			break;
		case "form_reset_password_form":
			data.meta.reset_password.email = "";
			valid = true;
			break;
			*/
		default:
			// by default send form without validation --for development
			valid = true;
			break;
	}
	return valid
};

/*
	Global form success handler,
	network success, form may not have been valid
	@res: responseText
	@http_status: the http status for the connection (differs from API res.meta.status)
	@xhr: xhr request
	@form: the jquery wrapped form element
*/
fin.formSuccessHandler = function(res, http_status, req, form_el) {
	var form = form_el.attr('id')
	
	if(res.meta.status === 200) {
		//todo: make public array of objects
		// [{formid: "form_login", "callback":"fun()"}]
		// where the callback returns true or false

		// form was valid
		// run valid function, and pass the response
		if(form_el.attr('data-functionOnSuccess') !== undefined) {
			window[form_el.attr('data-functionOnSuccess')](res);

		}
		// navigate somewhere it was a success.
		if(form_el.attr('data-navigateOnSuccess') !== undefined) {
			nav(form_el.attr('data-navigateOnSuccess'))
		}



	} else if(res.meta.status === 400) {
		// form was invalid
		apiErrorHandler(res, '#'+form)
	}
};
	
/*
	Global res error handler
	@res: api response object
	@pre_selector: a div, form element or class as a jquery selector .class #id, as a general container for the form elements.
	@form_set_selector:<optional>jquery selectors for formset div where children() are the form's sets and the key of the formset response for each error to look in.
	TODO: cannot differentiate between errors from two different formsets that may come from a single api call. They're never come at the same time, because errors can only be from a single form or formset, and I can differentiate between a form and a formset, but not between two formsets. So if two formsets both have a similar field name, I can't tell on which elements to show the error tooltip.

	FORM/FORMSET HTML CONVENTIONS to display errors correctly
	select2 elements, must be wrapped in <div class="helptip-container"></div>, you can attach help tips to this container, error tips will attach to the parent of that container and not interfere
	select elements, must be wrapped in spans.
	formset field names should be classes attached to formset field elements
	form field names should be the name="" attribute
	in a form/formset combination page, the form elements should conform to form naming conventions (name attribute) and the formset elements should conform to formset naming conventions (class).
	regular form elements should be in a span or div or p or anything.
*/
fin.apiErrorHandler = function(res, pre_selector, form_set_selector) {
	if(res.meta.status === 400) {
		// we only want one of these to display
		if(res.result.errors.__all__ === undefined) {
			res.result.errors.__all__ = "";
		} else {
			res.meta.error = "";
		}
		var formError = res.meta.error + res.result.errors.__all__;

		// append non_form_errors to formError
		for(var i in res.result.non_form_errors) {
			formError += "<br />-" + res.result.non_form_errors[i]
		}



		$(pre_selector).parent().find('.form_error').html('').hide();
		// general form error
		if(formError.length > 0) {
			$(pre_selector).parent().find('.form_error').html(formError).show();
		}

		//clear field errors
		var tip_els = $(pre_selector + ' input, ' + pre_selector + ' select, ' + pre_selector + ' .helptip-container').parent()
		for(var m = 0; m < tip_els.length; m++) {

			if($(tip_els[m]).hasClass('helptip-container') || $(tip_els[m]).is('select')) {

				tip_els[m] = $(tip_els[m]).parent()[0]
				
			}
			
			$(tip_els[m]).removeAttr('original-title')
			
			
		}  
		
		//$('.tipsy').hide()

		var error_keys = Object.keys(res.result.errors)
		// decide if the errors are for a formset, and which formset
		// note: formsets are ints as keys, forms are field names.
		if(parseInt(error_keys[0], 10) == error_keys[0]) {
	
			// now loop through each error and attach the tooltips to fields
			for(var n=0; n < error_keys.length; n++) {
				// loop through field names in form of formset
				var form_set_children = $(pre_selector + " " + form_set_selector).children()
				for(var field_key in res.result.errors[error_keys[n]]) {
					var element = $(form_set_children[error_keys[n]]).find('.' + field_key)
					var error_message = res.result.errors[error_keys[n]][field_key][0]
			
					$(element).parent().tipsy(tipsy_config).removeAttr('original-title').attr({'title': error_message}).tipsy('hide').tipsy('show')
				}
				
			}


		} else {
	
			// field errors
			for (var key in res.result.errors) {
		
				var selector = pre_selector + ' ' + 'input[name="' + key + '"], ' + pre_selector + ' ' + 'select[name="' + key + '"]';
		
				var value = res.result.errors[key];
				if($(pre_selector).attr('data-tipsyconfig')) {
					var tipsy_config = TIPSY_CONFIGS[$(pre_selector).attr('data-tipsyconfig')]
				} else {
					var tipsy_config = TIPSY_CONFIGS['default']
				}
				// accomodate select2, which are wrapped in an extra div for displaying help tooltip.
				// we don't want help tooltips to interferer with error tooltips.
				var el_field = $(selector).parent()
				if(el_field.hasClass('helptip-container')) {
					el_field = el_field.parent()
				} 
				el_field.tipsy(tipsy_config).removeAttr('original-title').attr({'title': value}).tipsy('hide').tipsy('show')
			}
		}
	}
};

// form validation helpers
fin.v = {
	// @form, a form element, likely already jqueryified.
	// @name, name of the element
	// @fn, the function that will do validation, should return an array [bool(pass/fail), string(msg)]
	// if a validator fails it will add a data-validation-error attribute to that field, which can be displayed
	// at your discretion
	validate: function(form, name, fn) {
		var field = $(form).find('input[name="'+name+'"]');
		var value = field.val();			
		var result = fn(field, name, value); // should
		if(result.length === 2) {
			field.attr("data-validation-error", result[1]); // set the message
		} else {
			field.removeAttr("data-validation-error");
		}			
		return result[0];
	},
	strlen: function(form, name, min, max) {
		min = min||0;
		max = max||Infinity;
		try {
			return fin.v.validate(form, name, function(field, name, value){	
				if(value.length < min || value.length > max) { 
					return [false, name+" required length of "+min+"-"+max];
				}
				return [true]
			})
		} catch(err) {
			fin.log.error("error in fin.v.strlen validator: "+err.message);
			return false
		}
	}
};

// ajax form submit handler. use [[ addEvent('submit', '#loginForm', fin.submit) ]] or [[ ajax('#loginForm') ]] in templates with ajaxforms
// to ajaxify them.
fin.submit = function(e) {
	var form = $(e.target);

	var validator = fin(form.attr('validator')).val;

	if(typeof validator === 'function') {
		// validator function set as <form validator="fin.fn.your_form_validator"></form>
		// passed a reference to the Jqueried form element in case you need to modify it before submitting
		// for convenience a jquery selected array of form inputs that may need to be validated.	
		if(validator(form, form.children().not("input[type='submit']")) !== true) {
			// validation failed				
			e.preventDefault();	
			e.stopImmediatePropagation();
			// validation failed, execute the error display function if one was specified as a form attribute
			// otherwise exist
			var errorDisplayFn = fin(form.attr('errorDisplayFn')).val;
			if(typeof errorDisplayFn === 'function') {
				errorDisplayFn(form);
			}
			return 
		}
	}


	//return true
	var num_persistant_iframes = $('.persistant').length;
	// create an iframe that will persist until server response
	var ajaxiframe_id = "ajaxpersistantiframe"+num_persistant_iframes;;

	var targetiframe_id = "ajaxpersistantiframe"+(num_persistant_iframes-1);

	// setup form
	form.attr('target', targetiframe_id)

	// hidden inputs
	form.append('<input type="hidden" name="pathname" value="'+fin._meta.pathname+'" />' +
						'<input type="hidden" name="hashbang" value="'+form.attr('hashbang')+'" />' +
						'<input type="hidden" name="command" value="'+form.attr('command')+'" />' +
						'<input type="hidden" name="onSuccess" value="'+form.attr('onSuccess')+'" />' +
						'<input type="hidden" name="onError" value="'+form.attr('onError')+'" />' +
						'<input type="hidden" name="ajaxiframe_id" value="'+targetiframe_id+'" />');

	// update hidden inputs	
	
	$('body').append('<iframe id="'+ajaxiframe_id+'" name="'+ajaxiframe_id+'" style="display:none;" class="ajaxformiframe persistant"></iframe>');
		
};
	
// template cache and rendering shorthand
/* 
    renders a template and places it into the DOM
    @parent = [String(jQuery css selector) or DOM Object] -- the parent element
    @selector = [String(jQuery css selector)] -- the css selector for the underscore.js template located in a <script type="text/template"> tag
    @reset = <[boolean]> optional -- whether to clear the parent div first or not
    @data: [object] data passed to the template in real time, usually from another template or javascript.
    // eg: if you had a template that iterated over blog posts, and wanted a separate template to print out the comments for each post, in that 
    // loop you would pass {comments: post_comments_object} which would then be accessible in the sub template as comments variable
    // in most circumstances you would put data in the main data model, and the template would access it from there
*/
fin.render = function (parent, selector, reset, data) {
    // clear the parent if needed
    if(reset === true) {
        $(parent).html('');
    }
    var fragment = document.createDocumentFragment();
    //var rootNode = fin.ce('div', {class:'block block_'+selector}, fragment);
    var rootNode = $('<div class="block block_'+selector+'"></div>');
    $(fragment).append(rootNode);

    var events = [];
    try {
    	fin._meta.templates[selector]( events, data, rootNode);
    	//$(parent).append(fin._meta.templates[selector]( fragment, rootNode, data ));			
    } catch(err) {
    	// since the templates have their own try/catch blocks, this should only happen
    	// when the template itself is not a function. ie: it was never found in the DOM or sent by the server.
    	// it's not in the DOM, it wasn't sent from the server because it either wasn't requested, or didn't exist.
    	var file_path = "root/templates/" + selector.replace(/_/g, "/") + "."
    	var template_name = selector;
    	if($.inArray(selector, fin._meta.template_list) === -1) {
    		// it was not requested from the server
    		fin.log.error("template not found", template_name);
    		fin.log.solution("there may be an error within the template that will be printed after this,");
    		fin.log.solution("if not, specify " + template_name + " within the navigate object when instantiating HighFin, either under a container or the async_templates array for any page so that it gets requested from the server at runtime.");	        		
    	} else {	        		
    		fin.log.error("template not found", template_name);
    		fin.log.solution("create "+ template_name.replace(/.*_/, "") +".js OR "+template_name.replace(/.*_/, "")+".html in ( " + file_path.replace(/[a-z_\.]*$/, "").replace(/[a-z]*\/\.\.\//, "") + " )");
    		throw("Error: Template ( " + template_name + " ) not found,")  	        		
    	}
    }
    // when using sub-templates, events should be delegated to the rootNode of the main template.
    $rootNode = $(rootNode);
	
	for(var i=0; i<events.length; i++) {
		$rootNode.on.apply($rootNode, events[i]);
	}
	

	if(typeof parent !== 'undefined') {
		$(parent).append(fragment)
	} else {
		return fragment;
	}		

    
};

/* render function for use with inline templates
	@selector: template selector
	@data: object template can access via data
 */
fin.r = function (selector, data) {
	return fin.render(void 0, selector, false, data)
	
};

/* 
	the template caching mechanism
	@selector is the name of the template, follows template_app_template naming convention.
	@html<optional> if fetching template from the server, or caching javascript template specify template code
	// will favour templates sent from the server and replace an embedded or cached template if/when a new version is sent from the server
	
	the following example template would 
		- print the value of x from the data model
		- log hi to the console
		- print out index b: 0<br /> inex b: 1<br /> ... and so on
		- maintain newlines in the <pre> tag
		- each [[ inlinejs ]] block has it's own private scope within the template, but they can all access the same global namespace
	<script type="text/template" id="template_example-html">
		x is {{ fin.data.meta.x }}

		[[ console.log('hi') ]] 

		[[
		for(var b=0; b<5; b++) {
		    print(`index b: `+b+`<br />`)

		}
		]]
		<pre>
			maintain
			newlines
		</pre>
	</script>
*/
fin.cacheTemplate = function(selector, template_string) {
	// template caching
    if (!fin._meta.templates){ fin._meta.templates = {}; }
    var type = selector.match(/[a-z\.]*$/)[0]
    selector = selector.replace(/\-[a-z\.]*$/, "")
    
    
    var template = fin._meta.templates[selector];
	var tmpl = ""
	if(typeof template_string !== 'undefined') {
		// template coming in as JSON from server
		tmpl = template_string
	} else {
		// look for template in the DOM				
		tmpl = $('#template_' + selector + '-' + type).html(); // JSON.stringify will convert newlines to \n				
	}
	tmpl = JSON.stringify(tmpl);
	tmpl = tmpl.slice(1, tmpl.length-1); // remove extra double-quotes added by JSON.stringify				
	
	// so exports.test_function in templates/news/posts/handlers.js
	// gets namespaced to fin.fn.news.posts.handlers.test_function()
	var dot_location_midpath = selector.replace(/_[^_]*$/, "").replace(/_/g, ".") 
	
	// auto namespace exported functions
	tmpl = tmpl.replace(/exports\.([^ \r\n]+)[ ]*= function[ ]*([^(]*)\(/g, "fin(`fin.fn."+dot_location_midpath+".$1`).val; fin.fn."+dot_location_midpath+".$1 = function $2(")
	// mask escaped backticks
	tmpl = tmpl.replace(/\\`/g, "___escaped_backtick___")

	// .html templates need this
	if(type === 'html') {
				// 
		tmpl = "var tmpl = [];"+
				// print() append a string to template string at that location, for use inside [[ inline_js() ]] blocks
				// @str: string to be added to the template
				"function print(str){tmpl.push(str)};function addEvent(){__events.push(Array.prototype.slice.call(arguments, 0))};"+
				// render() prints a placeholder div inline that will be replaced LATER with the subtemplate fragment rendered NOW inline
				// @st string, subtemplate selector. ie: `welcome` for a template in /templates/welcome.html
				"var subtmpls = []; var subid=0; function render(st, stdata){ var sid = `___subtmpl_id`+subid;subid++; print(`<div id='`+sid+`'></div>`); subtmpls.push({id: sid, fragment: fin.r(st, stdata)})};"+
				// wrap the template
				"var $rootNode = $(rootNode); tmpl.push(`"+tmpl+"`);";
	}
	// inline [[ inline_js() ]]
	tmpl = tmpl.replace(/\[\[(([^\[\[]|\r|\n|\r\n)*)]]/g, function($0, $1) {
		// replace escaped newlines in [[ inline_js() ]] with a real newline character			
		return $0.replace(/(\\r\\n|\\n|\\r)/g, "\n");
	});
	// wrap inline javascript in closure with print function 
	// note: print() adds results to p string, which is returned by the closure function and concatenated into the template
	tmpl = tmpl.replace(/\[\[/g, '`); ');
	tmpl = tmpl.replace(/\]\]/g, "; tmpl.push(`");
		
	// template error stacktrace-ability
	var template_location = ""
	// was it loaded from the server, or inline?
	if(typeof template_string === 'undefined') {
		// template was loaded from the DOM
		template_location = fin._meta.pathname.toString()

		if(!template_location.match('.html')) {
			template_location += "/index.html" 
		}
		template_location = "#" + selector + "-" + type + " in " + template_location
	} else {
		template_location = "root/templates/" + selector.replace(/_/g, "/") + "." + type
	}
	
	
	// parse & rejigger template into javascript
	tmpl = tmpl.replace(/``|([`])(?:(?=(\\?))\2.)[\s\S]*?\1/g, function(_string, _first_match) {				
		//_string = _string.replace(/\\`/g, '{{ "\'" }}') // escape backtick edge case
		// concat multiline quotes, preserving multiline-edness
		_string = _string.replace(/(\r\n|\n|\r)/g, "\\n` + $1`"); 
		// remove empty inline vars {{ }} to prevent errors
		_string = _string.replace(/{{[\s]*}}/g, "");
		// inline {{ vars }}
		_string = _string.replace(/{{((?:(?!}}).)*)}}/g, function($0, $1) {
			// remove newline characters from inline vars
			$1 = $1.replace(/(\\r\\n|\\n|\\r)/g, "");
			return "`+"+$1+"+`"
		});
		return _string
	})

	// template compilation functions
	// join the template and append
	tmpl += ";tmpl = tmpl.join(``);$rootNode.append(tmpl);"+
			// loop over rendered subtemplates replacing their placeholder tags with their rendered fragments
			"for(var i=0; i<subtmpls.length; i++) { $rootNode.find(`#`+subtmpls[i].id).replaceWith(subtmpls[i].fragment) };";

	tmpl = tmpl
		// escape unescaped double quotes
		.replace(/([^\\]|^)(")/g, '$1\\"') // regex: character is not escape or is start of string followed by ", replace second group with \"
		// then convert backticks to double quotes
		.replace(/`/g, '"') 
		// unmask escaped backticks
		.replace(/___escaped_backtick___/g, "`") 
	// template stack traceability
	// adding a try/catch block that prints a stack trace, uses a regex to get the line/char number of the template file, modifies it to reflect the code and the prints out a pretty error in the console
	tmpl = "try {" + tmpl + "} catch(err) {"+					
			"var line = err.stack.match(/>(:[0-9]+:[0-9]+)/)[0].replace('>', '');"+
			"var line_array = line.split(':'); "+
			"var c = parseInt(line_array[2], 10);" +
			"var sub = this."+selector+".toString().substr(0, c+51);" +
			"var lines = sub.toString().split('\\\\n');" +
			"line = lines.length + ' char ' + lines[lines.length-1].length; "+ 					
			"fin.log.error(err.message, '"+template_location+"', line);}"; 

	template = new Function(['__events', 'data', 'rootNode'],tmpl)
	if(type === 'fn.js') {
		// if it's function template (with exports requiring auto namespaced function declarations) execute the declarations now
		template()
	} else {
		// if it's a template to be re-rendered then cache it.
		fin._meta.templates[selector] = template;			

	}

};

fin.getFunctionArguments = function getFunctionArguments(params, named_args, unnamed_arguments) {
	var args = [];  // array of actual arguments to be passed in

	// loop through arguments the function expects and fetch them from the args object passed into args
	for(var i=0; i<params.length; i++) {
		var value = named_args[params[i]]; //note: we want to preserve undefined if it is and pass it along
		args.push(value);
	}

	// note: ~3 times faster than using splice/concat
	for(var i=1; i<unnamed_arguments.length; i++) {
		args.push(unnamed_arguments[i]);
	}	

	return args
};

fin.log = {
	error: function logError(msg, url, line) {
		var args = [];
		
		var args = ["%c Error %c ", "color:hsl(0, 100%, 90%);background-color:hsl(0, 100%, 50%);"]; // red with white text

		if(typeof url !== 'undefined') {
			if (typeof line !== 'undefined') {
				args[0] += "on line " + line + " of " + url + " %c ";
			} else {
				args[0] += "in " + url + " %c ";
			}
			
			args.push("color:hsl(0, 0%, 80%);background-color:hsl(0, 0%, 0%);") // black with grey text
		}

		args[0] += msg;
		args.push("color:hsl(100, 0%, 0%);background-color:hsl(0, 0%, 100%);") // white with black text

		log.apply(this, args);
	},

	solution: function logSolution(msg) {
		var args = ["%c Solution %c " + msg, "color:hsl(240, 100%, 90%);background-color:hsl(240, 100%, 50%);", "color:hsl(100, 0%, 0%);background-color:hsl(0, 0%, 100%);"];

		log.apply(this, args);
	}
};

fin.init = init // store the bootstrap function for edge cases where we need to re-init the fin object. eg: unit tests


window.fin = fin;


/****************************/

// Extend Native
//===========================/
/****************************/

/*
    global error handler
    note: site won't break on error, but functions will stop executing at exception
*/
window.onerror = function(msg, url, line) {
    
    var error = {
        msg: msg,
        url: url,
        line: line
    }
    var redStart = "%C"
    var redEnd = "</span>"
    
    url = url.replace(location.protocol + "//" + location.host, "");

    log(msg, url, line);
        
    // report error
    try {
        //reportError(msg, url, line)
    } catch(err) {

    }
    //throw "error";
    // suppress browser exception, return true in production environment
    return true;   
};

/*
every Function will have the .curry() method which will alow you to call it with a key/pair object of named arguements followed by ...unnamed arguments
@args: a key/value map of it's arguments and the values you want to pass
@...: followed by any number of unnamed arguments
eg: for the function
	function test_concat(one, two, three) {
		var str = ""+one+two+three;
		if(arguments.length > 3) {
			for(var i=3; i<arguments.length; i++) {
				str += arguments[i];
			}
		}
		return str
	}
	you would call
	test_concat.curry({two: 2, one: 1, three:3})() // 123

@return: a function that wraps the original function and passes in the curried values
	it doesn't matter how you order the arguments object. 
	keys in the object which the function is not expecting will be ignored
	expected arguments which do not have corresponding keys will be set to undefined
	arguments passed into args({}, unnamed_arguments...) after the object will be passed onto the function as unnamed arguments in the same order
	you can then execute the returned function, or call curry again on the returned function providing more
	named args, and keep doing that until your heart's content.
	calling it a second time with some of the same argument keys will replace the previous values for those named arguments
	var x = test_concat.curry({two: 2, one: 1, three:3})
	x.curry({three:9})() // 129
	var y = x.curry({}, 4, 5) 
	var z = y.curry({}, 6, 7)
	y() // 12345
	z() // 1234567


	note: when you call curry on a curried function. this will equal func in a closure. 
	perf: bind ~2x faster than closure curry's nov 2014 chrome
*/

Function.prototype.curry = function curry(named_args) {
	var fn = this;

	if(typeof fn.prototype.curry_args !== 'undefined') {		
		named_args = $.extend(true, {}, fn.prototype.curry_args, named_args);
	}

	var unnamed_args = fin.getFunctionArguments([], {}, arguments);

	if(typeof fn.prototype.unnamed_args !== 'undefined') {		
		var previous_unnamed_args = fn.prototype.unnamed_args;
		unnamed_args = [].concat(previous_unnamed_args, unnamed_args);
		arguments = [named_args].concat(unnamed_args);
	}

	if(typeof fn.prototype.curry_fn !== 'undefined') {
		fn = fn.prototype.curry_fn;
	}
	var params = fn.toString().match(/\(([^)]*)\)/)[1].replace(/[ ]*/g, "").split(',');				
	var args = fin.getFunctionArguments(params, named_args, arguments);	
	args.unshift(fn);
	var func = fn.bind.apply(fn, args);
	
	if(typeof func.prototype === 'undefined') {
		func.prototype = {};
	}

	func.prototype.curry_args = named_args;
	func.prototype.unnamed_args = unnamed_args;
	func.prototype.curry_fn = fn;

	return func
}

fin._meta.pathname = window.location.pathname.toString().replace(/(^\/)|(\/$)/, ""); // regex: remove end slashes

// load plugins
fin.pg = {};
$.extend(true, fin.pg, init.prototype.plugins); // init.prototype is preserved even after multiple init() calls.

$(document).ready(function(){
	// the starter ajax response iframe
	$('body').append('<iframe id="ajaxpersistantiframe0" name="ajaxpersistantiframe0" style="display:none;" class="ajaxformiframe persistant"></iframe>');

	window.onbeforeunload = fin.onbeforeunload;
  	
  	//$(window).hashchange(fin.onHashchange)
  	window.onhashchange = fin.onHashchange;

  	// cache embedded templates
  	$("script[type='text/template']").each(function(i) {  	
  		fin.cacheTemplate($(this).attr('id').replace(/template_/, ""))
  	})

  	window.onhashchange();
	//fin.loading(false)

});

}
window.fin = {
	init: init // set fin to the bootstrap function
}

})(jQuery, window);











