/* fin.js v1.0.0
 * Copyright 2012-2013, Yoav Givati ( hello@yoavgivati.com )
 * http://highf.in ~ http://chalkhq.com
 *
 * Released under the MIT license
 * http://highf.in/license
 *
 * 
 * Updated: 15-11-2014
 * Requires jQuery
 */
;(function($, window) {

window.Fin = function HighFin(config) {

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
window.fin = {};

fin = {
	// settings and defaults
	settings: $.extend(true, {}, {		
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
		
	}, config),
	data: { // for storing app data fin.data.news.some_stored_data

	},
	/*
		for storing app specific/namespaced functions. that you'd want to access globally typically loaded from templates
		fin.fn.news.postComment = function() {
			// post a comment here
			log('')
		}

	*/
	fn: { 

	},
	_meta: { // used by highfin.js for storing generic/state data
		templates: {

		},
		assigned_events: [],
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
	},
	meta: {	// used for storing generic meta/state data in your app
		
	},
	
	// bindings model
	// a way to link nodes in the data model to templates and parent elements, or directly to elements, so that as the data model is updated, their bound DOM elements or templates refresh.. bindings is the heart of real-time
	bindings: {
		feed: {
			template: "#feed_item_template",
			item: {
				comment: {
					template: "#feed_item_comment_template"
				}
			}
		}
	},
	
		log: log, // shortcut for consistency with the backend
		// todo: cleanup dot function now that unit tests are written and passing
		// function for getting a dot notation path of an object
		// @obj_path: String, dot notation String eg: "data.meta.current_section.name"
		// @get_key: Boolean, 
					// if true; will return the key for a foreign key value, eg: returns 1 from fin.dot("data.meta.current_section", true) where the value of data.meta.current_section is "__data.sections.1"
					// if false; will delete the key/value from the local data model. so fin.dot("data.meta.current_section", false) will delete data.sections[1], where the value of data.meta.current_section is "__data.sections.1"
		// pass boolean true as the get_key, to parse the last foreign key for the value of the id		
		// @new_value used for assigning a new value to the key at the end of the path
		dot: function dot(obj_path, get_key, object, new_value){

			if(typeof obj_path !== 'string') {
				return
			}

			var path = obj_path.split('.');


			if(object == undefined) { // this will assert true for null or undefined, assuming the var exists, which it does in this scope, just doesn't have a value
				path.unshift(window)
			} else {
				path[0] = object;
			}
			var value;
			if(path.length > 0) {
				 
				value = path[0];

				for(var i=1; i < path.length; i++) {
					// create a blank node if the key doesn't exist.. if we're trying to access it, it means we want it to exist
					if(typeof value[path[i]] === 'undefined') {
						// if it's the end of the chain and new_value is set, then set a new value
						value[path[i]] = {};
						
					} else if (value[path[i]] === null) {
						
						return null
					}
						
						
					// check if it's a foreign key
					if(typeof value[path[i]] === 'string' && value[path[i]].substr(0, 2) === "__") {
						var dot_string = value[path[i]].substr(2, value[path[i]].length - 2)
						
						if((i+1) == path.length && get_key === true) {
							// we only want the foreign_key itself
							if(value[path[i]] !== null) {
								return value[path[i]]//fin.getID(value[path[i]])
							} else {
								return ""
							}

						} else if((i+1) == path.length && get_key === false) {
							// we're deleting the object to which the foreign key refers to
							fin.dot(dot_string, get_key)
							// at the end of the foreign key chain the item will be deleted by an alternate condition
							// then will regressively delete the foreign keys in the chain
							value[path[i]] = ""
							return
						} else if(i === path.length - 1 && new_value !== undefined) {
							fin.dot(dot_string, get_key, null, new_value)
						} else {
							// do lookup
							value = fin.dot(dot_string);
						}
					} else {
						// even if it's not a foreign key, we may still want to delete it
						if ((i+1) == path.length && get_key === false) {
							delete value[path[i]]
							return
						}
						if(i === path.length - 1 && new_value !== undefined) {
							value[path[i]] = new_value
						}
						value = value[path[i]];
					}
				}
				
			} else {
				value = false;
			}

			return value
		},
		// helper function, for setting the value for the node of a dotnotation string
		setDot: function(obj_path, new_value, object) {
			fin.dot(obj_path, null, object, new_value)
		},
		getID: function(fk) {
			if(fk === null) {
				return
			}

			var key = fk.toString().split('.');
			// now just return the last part of the foreign_key ie: the key (in most cases an int id)
			return key[key.length-1];
		},
		/*
		Main navigation function

			1. All hide-able elements are hidden with each navigation, distinquished by class="elem" from permanent elements which lack the class
			2. we find the matching key in the nav object, show all the elements in the show array, and run all functions in the before_func and after_func arrays at the appropriate times

			@key = the key in the navigate array, ie: the 'page' we're navigating to
			@containers = if we only want to render/re-render specific containers, specify an array of strings here
		*/ 


		nav: function(key, containers) {
			if(fin.settings.disable_nav.length > 0) {
				//_.alert(data.meta.disable_nav, [["ok", ""]])
				log('hashbang navigation disabled')
				return
			}


			// google analytics track navigation
			var key_to_path = "/" + key
			key_to_path = key_to_path.split('_')
			//for(var i=0; i<key_to_path.length; i++) {
				//key_to_path[i].replace(/^s$/, 'student').replace(/^p$/, 'professor')
			//}
			key_to_path = key_to_path.join('/') 
			if(typeof _gaq !== 'undefined') {
				_gaq.push(['_trackPageview', key_to_path]);
			}

			

			//clear field errors
			$('input').parent().removeAttr('original-title')
			//$('.tipsy').hide()


			if(fin.settings.navigate[key] === undefined) {
				log(key + ": The page you were navigating to has not been implemented yet.")
				return;
			}


			// run before functions
			if(fin.settings.navigate[key]['before_func'] !== undefined) {
				for (var i = 0; i < fin.settings.navigate[key]['before_func'].length; i++) {
					var before_func_obj = fin.settings.navigate[key]['before_func'][i]
					before_func_obj[0].curry(before_func_obj[1])()
				}
			}

			var scrollToTop = false

			

			for (var c = 0; c < fin.settings.containers.length; c++) {
				if(fin.settings.navigate[key][fin.settings.containers[c]] !== undefined) {

					// mark rendered templates to be cleared
					$('#' + fin.settings.containers[c] + ' > div' ).addClass('toclear');


					

					for (var i = 0; i < fin.settings.navigate[key][fin.settings.containers[c]].length; i++) {
						var template_name = fin.settings.navigate[key][fin.settings.containers[c]][i]
						//log(key)
						if(fin.settings.navigate[key][fin.settings.containers[c]][i].substring(0, 1) === "_") {
							var template_name = fin.settings.navigate[key][fin.settings.containers[c]][i].substring(1, fin.settings.navigate[key][fin.settings.containers[c]][i].length)
						}
						if (i === 0) {
							//$('#' + containers[c] + ' > div').addClass('toclear')
						}
						
						var render = true;
						//log(fin.settings.navigate[key][fin.settings.containers[c]][i])
						// if templatename is preceded with an underscore, check if it's already rendered
						if(fin.settings.navigate[key][fin.settings.containers[c]][i].substring(0, 1) === "_") {
							// remove underscore
							//log("don't re-render")
							// check if already rendered
							if($('.block_' + template_name).length > 0) {
								//log("not re-rendering")
								// remove from clear list
								$('.block_' + template_name).removeClass('toclear')
								render = false;
							}
							
						}
						if(render === true) {
							if(typeof fin._meta.templates[template_name] !== 'undefined') {
								fin.render('#' + fin.settings.containers[c], template_name, false)
							} else {
								// note error will already be logged
								fin.log.solution('Template "' + template_name + '" did not compile. See client or server console output for solution.');//fin.settings.navigate[key][fin.settings.containers[c]][template_name])
							}
						}
						
					}

					
				} 
			}

			// keep track of the last nav function run
			fin._meta.last_nav(key);

			if(scrollToTop === true) {
				$('body').scrollTop(0)
			}

			// run after functions
			if(fin.settings.navigate[key]['after_func'] !== undefined) {
				for (var i = 0; i < fin.settings.navigate[key]['after_func'].length; i++) {
					var after_func_obj = fin.settings.navigate[key]['before_func'][i]
					after_func_obj[0].curry(after_func_obj[1])()
				}
			}

			
			// remove templates marked for clear
			$('.toclear').remove()

			if(typeof fin.settings.callbacks.afterNavCallback !== 'undefined') {
				fin.settings.callbacks.afterNavCallback()
			}
			


		},
		/*  nav functions  */
		// loading function
		// @isLoading, true to add something to load, false to clear it
		loading: function(isLoading) {
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
		},
		/*
		    if user accidentally navigates away, closes the tab, or otherwise. ask if they really want to close highfin.
		*/
		onbeforeunload: function (e) {
		    e = e || window.event;

		    var msg = "Are you sure you want to leave?";

		    // For IE and Firefox prior to version 4
		    if (e) {
		        // nevermind, just show ie users chrome frame
		       // e.returnValue = msg;
		    }

		    // uncomment to activate
		    return fin.settings.leave_alert;
		},
		onHashchange: function(){

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
			fin._meta.hashbang = fin.removeEndSlashes(fin._meta.hashbang);
			//split
			segments = fin._meta.hashbang.split("/");
			
			// try load route
			// search routes for match, to determine page to render
			// if hashbang is #!/news/search, will try `news/search`, and then `news` in fin.settings.routes until it finds a match
			var match_bang = fin._meta.hashbang;
			for(var i=0; i < segments.length; i++) {
				
				if(typeof fin.settings.routes[match_bang] !== 'undefined') {
					fin.nav(fin.settings.routes[match_bang]);
					return;
				} else {
					//log('route ' + match_bang + ' not found')
				}
				match_bang = match_bang.replace(/\/[^\/]*$/, "")
			}
			
			// show default screen unless user just navigated somewhere via url
			//if(fin._meta.last_nav() === "" && typeof fin.settings.default_page !== 'undefined') {		
				fin.nav(fin.settings.default_page)		
			//}
			
			
			
		  },
		  fetchTemplates: function(){
		  	var params = {}

			// fetch all templates for this page if we haven't already.
			if(typeof fin._meta.template_list === 'undefined') {				
				fin._meta.template_list = [];

				// include nested_templates special container to fetch those templates
				var containers = $.extend([], fin.settings.containers)
				containers.push('async_templates')
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
		  },
		  /*
			Get server data
			@_params: <optional>ly overide params
		  */
		  getData: function(_params, _callback) {

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
						fin.nav('login')
					}
				})
			
		  },
		  /*
			handles jsonp results
			@response: is the response object
		  */
		  handleJsonp: function(response) {
		  	
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
					if(typeof res.meta.onSuccess !== "undefined" && typeof fin.dot(res.meta.onSuccess) === "function") {
						// dev is handling this form's success
						fin.dot(res.meta.onSuccess)(res)
					} else {
						// let user know if they specified an onSuccess handler for the form, but forgot to define it.
						if(typeof res.meta.onSuccess !== "undefined" && typeof fin.dot(res.meta.onSuccess) !== "function") {
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
				  	if(typeof res.meta.onError !== "undefined" && typeof fin.dot(res.meta.onError) === "function") {
				  		// dev is handling this form's error
				  		fin.dot(res.meta.onError)(res)

				  	} else {
				  		// let user know if they specified an onError handler for the form, but forgot to define it.
				  		if(typeof res.meta.onError !== "undefined" && typeof fin.dot(res.meta.onError) !== "function") {
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

		  	
		  	
		  },

		/*
			Global client side form validator
		*/
		formValidator: function(fields, form) {

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
		},
		/*
			Global form success handler,
			network success, form may not have been valid
			@res: responseText
			@http_status: the http status for the connection (differs from API res.meta.status)
			@xhr: xhr request
			@form: the jquery wrapped form element
		*/
		formSuccessHandler: function(res, http_status, req, form_el) {
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
		},
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
		apiErrorHandler: function(res, pre_selector, form_set_selector) {
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
		},
		// login_success's sole purpose is to nav to a prelogin state, so that when hitting back, it will serve as a wall which the user cannot go further back.
		// this prevents a user from hitting "back" to the login screen while they're still logged in. 
		/*loginResultHandler: function(res) {
			nav('login_success');
			login(res)
		},*/
		
	    // template cache and rendering shorthand
	    /* 
	        renders an underscore.js template and places it into the DOM
	        @element = [String(jQuery css selector) or DOM Object] -- the parent element
	        @selector = [String(jQuery css selector)] -- the css selector for the underscore.js template located in a <script type="text/template"> tag
	        @reset = <[boolean]> optional -- whether to clear the parent div first or not
	        @events = [array] -- eg: [['.selector', 'click', function, {}]}]
	        @data: [object] data passed to the template in real time, usually from another template or javascript.
	        // eg: if you had a template that iterated over blog posts, and wanted a separate template to print out the comments for each post, in that 
	        // loop you would pass {comments: post_comments_object} which would then be accessible in the sub template as comments variable
	        // in most circumstances you would put data in the main data model, and the template would access it from there
	    */
	    render: function (parent, selector, reset, events, data) {
	        // clear the parent if needed
	        if(reset === true) {
	            $(parent).html('');
	        }
	        var fragment = document.createDocumentFragment();
	        var rootNode = fin.ce('div', {class:'block block_'+selector}, fragment);
	        try {
	        	$(parent).append(fin._meta.templates[selector]( fragment, rootNode, data ));			
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
			setTimeout(function(){ 
				fin.attachEventListeners();
			}, 0)
			


	        
	    },
	    /* 
	    	the template caching mechanism
			@selector is the name of the template, follows template_app_template naming convention.
			@html<optional> if fetching template from the server, or caching javascript template specify template code
			// will favour templates sent from the server and replace an embedded or cached template if/when a new version is sent from the server
		*/
	    cacheTemplate: function(selector, template_string) {
	    	// template caching
	        if (!fin._meta.templates){ fin._meta.templates = {}; }
	        var type = selector.match(/[a-z\.]*$/)[0]
	        selector = selector.replace(/\-[a-z\.]*$/, "")
	        
	        
	        var template = fin._meta.templates[selector];
			var tmpl = ""
			if(typeof template_string !== 'undefined') {
				// look for template in the DOM
				tmpl = template_string	    
			} else {
				tmpl = $('#template_' + selector + '-' + type).html();
			}
			// exported functions should ignore the filename.fn.js in namespacing.
			// so exports.test_function in templates/news/posts/functions.fn.js
			// gets namespaced to fin.fn.news.posts.test_function()
			var dot_location_midpath = selector.replace(/_[^_]*$/, "").replace(/_/g, ".") 
			
			// auto namespace exported functions
			tmpl = tmpl.replace(/exports\.([^ \r\n]+)[ ]*= function[ ]*([^(]*)\(/g, "fin.dot(`fin.fn."+dot_location_midpath+".$1`); fin.fn."+dot_location_midpath+".$1 = function $2(")
			// mask escaped backticks
			tmpl = tmpl.replace(/\\`/g, "___escaped_backtick___")
			// shortcut for fin.ce(` part of the function for more fluid typing and readability
			tmpl = tmpl.replace(/```/g, "fin.ce(`")

			// .html templates need this
			if(type === 'html') {
				tmpl = "fin.ce(`div`, {class: ``}, rootNode, `" + tmpl + "`);"
			}
			// inline [[ arbitrary_js() ]]
			var scrpt = "";
			tmpl = tmpl.replace(/\[\[(([^\[\[]|\r|\n|\r\n)*)]]/g, function($0, $1) {
					scrpt += ";" + $1
					return ""
				})

			scrpt = scrpt
				// remove newlines in strings
				.replace(/[`]([^`]*)(\r|\n|\r\n)*([^`]*)`/g, function($0,$1,$2,$3) {
					$0 = $0.replace(/(\r|\n|\r\n)*/g, "")
					return $0
				}) 
				// add semicolons to line-endings that aren't strings, and remove the newline
				.replace(/[^`](.*)(\r|\n|\r\n)*(.*)(?!`)/g, "$1;$3;") 
				// escape all double quotes
				.replace(/"/g, '\\\\"') 
				// convert backticks to single quotes
				.replace(/`/g, '"') 
				
			// template error stacktrace-ability
			var template_location = ""
			// was it loaded from the server, or inline?
			if(typeof template_string === 'undefined') {
				//log(template_string)
				// template was loaded from the DOM
				template_location = fin._meta.pathname.toString()

				if(!template_location.match('.html')) {
					template_location += "/index.html" 
				}
				template_location = "#" + selector + "-" + type + " in " + template_location
			} else {
				template_location = "root/templates/" + selector.replace(/_/g, "/") + "." + type
			}
			var num_lines_remove = 1;
			if(type === 'html' || typeof template_string === 'undefined') {
				num_lines_remove = 2
			}
			// template error stacktrace-ability

			if(scrpt.length > 0) {
				scrpt = "fin.ce(`script`, {type: `text/javascript`}, rootNode, `setTimeout(function(){ try{ " + scrpt + " }catch(err){fin.log.error(err.message, '"+template_location+"')} },0);`);";
			}

			// parse & rejigger template into javascript
			tmpl = tmpl.replace(/``|([`])(?:(?=(\\?))\2.)[\s\S]*?\1/g, function(_string, _first_match) {				
				//_string = _string.replace(/\\`/g, '{{ "\'" }}') // escape backtick edge case
				// concat multiline quotes, preserving multiline-edness
				_string = _string.replace(/(\r\n|\n|\r)/g, "\\n` + $1`")
				// inline {{ vars }}
				_string = _string.replace(/{{(.*)}}/g, "`+$1+`")
				return _string
			})

			// append return fragment and [[ arbitrary_js() ]]
			tmpl += scrpt + ";return rootNode"
			
		
			
			tmpl = tmpl
				// escape all double quotes
				.replace(/"/g, '\\"')
				// then convert backticks to double quotes
				.replace(/`/g, '"') 
				// unmask escaped backticks
				.replace(/___escaped_backtick___/g, "`") 

			// template stack traceability
			// adding a try/catch block that prints a stack trace, uses a regex to get the line/char number of the template file, modifies it to reflect the code and the prints out a pretty error in the console
			tmpl = "try {" + tmpl + "} catch(err) {"+					
					"var line = err.stack.match(/>(:[0-9]+:[0-9]+)/)[0].replace('>', ''); "+
					"var line_array = line.split(':'); "+
					"line = (parseInt(line_array[1], 10) -"+num_lines_remove+") + ' char ' + line_array[2]; "+ 					
					"fin.log.error(err.message, '"+template_location+"', line);}"; 

			template = new Function(['fragment', 'rootNode', 'data'],tmpl)
			
			if(type !== 'fn.js') {
				fin._meta.templates[selector] = template;

				
			} else {

				template()
			}

	    },
	    // core templating functions
	    /*
			// createElement 
			@type: string - type of element
			@attr: array {id: 'btn1'} - array of attributes
			@parent: string "#menu"- parent (jquery selectors) to attach to
			@content: String - innerHTML of element
			@events: object { click: function(e){alert('test'+e.data.ind)} } - events to add to the element
			@data: object {ind:i} - e.data.ind = 0 naughty scope variables like iterators that you'd like to pass to the event handler as a frozen snapshot of the variable's value, 
			note: if you're adding an event, supply an id in the attributes
			ex:
			var t = ce('div', {}, '#content', 't');
			ce('div', {}, t, 'h');
			ce('div', {}, t, 'i');
			ce('div', {}, t, 's');
			OR
			ce('div', {}, ce('div', {}, ce('div', {}, ce('div', {}, '#content', 't'), 'h'), 'i'), 's');
			
			template.js:
			var other_var = `clicked `;
		    for(var i=0; i<5; i++) {
		        ce(`div`, {id: `id_`+i, class: `s`}, fragment, i + `hello there!, <a style="cursor: pointer; font-weight: 
		            bold;">Click here to nav to welcome again and rerender with templates 
		            from the server.<a>`, { click: function(e){log(other_var + e.data.msg)} }, {msg: i} );
		    }
			// clicking on each sentence will output "clicked 0", "clicked 1", and so on. 


		*/
	    createElement: function(type, attr, parent, content, events, data) {
			var e = document.createElement(type);
			for(var i in attr) {
				e.setAttribute(i, attr[i])
			}
			if(type === 'form' && attr['ajaxform'] === true) {
				// if it's an ajaxform, be safe and create an iframe to target
				// this will catch the form if the submit processing fails to prevent a page reload.
				var iframe = document.createElement('iframe')
				iframe.setAttribute('id', "ajaxformiframe"+attr['id'])
				iframe.setAttribute('class', 'ajaxformiframe')
				fin.ach(parent, [iframe])

				// create hidden fields
				fin.ce('input', {type: 'hidden', name: 'pathname', value: ''}, e)
				fin.ce('input', {type: 'hidden', name: 'hashbang', value: ''}, e)
				fin.ce('input', {type: 'hidden', name: 'command', value: ''}, e)
				fin.ce('input', {type: 'hidden', name: 'onSuccess', value: ''}, e)
				fin.ce('input', {type: 'hidden', name: 'onError', value: ''}, e)
				fin.ce('input', {type: 'hidden', name: 'ajaxiframe_id', value: ''}, e)

				// setup form
				e.setAttribute('target', "ajaxformiframe"+attr['id'])
				e.setAttribute('action', ":"+window.location.port+'/0')
			}
			if(content != undefined && content != "") {
				e.innerHTML = content;
			}
			for(var j in events) {
				fin._meta.assigned_events.push({id:attr['id'], "event": j, "handler": events[j], data:data})	
			}
			
			
			if(parent != undefined && parent != "") {
				fin.ach(parent, [e]);	
			}
			return e;
		},
	    /*
			move code to the end of the execution queue
	    */
	    defer: function(func, delay){
	    	if(typeof delay === 'undefined') {
	    		delay = 0
	    	}
	    	setTimeout(func, delay)
	    },


		/*
			// loop through events, and attach them to DOM nodes as specificied by ce()
			note: called after DOM ready on refresh
		*/
		attachEventListeners: function() {
			//log(fin._meta.assigned_events)
			for(var i in fin._meta.assigned_events) {
			
				
				$('#'+fin._meta.assigned_events[i].id).bind(fin._meta.assigned_events[i].event, fin._meta.assigned_events[i].data, fin._meta.assigned_events[i].handler);	
			}

			fin._meta.assigned_events = new Array();

		},
		/*
			// appendChild Helper
			@parent - jquery selector
			@children - array of children elements to attach to parent
			@prepend - boolean, whether to prepend the element (default is false and will append the element)
			note: in most cases called automatically by ce()
		*/
		appendChild: function(parent, children, prepend) {
			// if we're prepending reverse the order of children so that the order specified will == their order in the DOM
			if(prepend === true) {
				children.reverse();	
			}
			// loop through children and add them to the parent
			for(var i in children) {
				if(prepend === true) {				
					$(parent).prepend(children[i]);
				} else {
					if(typeof(parent) == "string") {
						// if parent is a string, treat as a jQuery selector
						$(parent).append(children[i]);	
					} else {
						// if parent is an object treat as a documentFragment
						parent.appendChild(children[i])	
					}	
				}
			} 
		},
		
	    /* 
	        See if a checkbox is checked or not  
	        @element = [String] element's css selector
	        returns: [Boolean] true or false
	    */
	    is_checked: function (element) {
	        return $(element + ":checked").length > 0;
	    },

	    /* 
	        returns a truncated string, and appends an ellipsis  
	        @str = [String] the string to truncate
	        @len = [int] the displayed length of the concatenated output
	        returns: [String] concatenated result
	    */
	    truncate: function (str, len) {
	        var _len = len - 3;
	        if(str.length > _len) {
	            str = $.trim(str.substring(0, _len)) + '&hellip;';
	        }
	        return str;
	    },

	    /*
	    // remove leading and trailing slashes for consistency
	    @path - a uri or hash string to remove slashes from
	    */
	    removeEndSlashes: function(path) {
	        if(path.charAt(0) == "/") {
	            path = path.toString().substr(1, path.length);
	        }
	        if(path.charAt(path.length-1) == "/") {
	            path = path.toString().substr(0, path.length-1);
	        }
	        return path;
	    },

	    /*
	    // sort's a list of objects into a sorted array
	    	@list: [string] or [object] or [array] like 'fin.data.news.posts' = {338293: {}, 23894723: {}}, uses dot() function to retrieve the object
	    	@sort_paths: [array] of [strings] indicating the dot path within the object representing nodes to compare for sort,
	    				specify multiple sort_paths listed by priority.
	    				[['object.comments.author', 'desc']]
			@direction: [string] 'asc' or 'desc'
	    */
	    sort: function(list, sort_paths) {
	    	// if list is a string fetc the referenced object
	    	if(typeof list === "string") {
	    		list = fin.dot(list);	
	    	}

	    	var sorted_list = [];
	    	// if list is an object of objects, convert it into an array of objects
	        if(Object.prototype.toString.call(list) === '[object Object]') {
	            // convert to array if object
	            for (var i in list) {
	                list[i]._key = i
	                sorted_list.push(list[i]);

	            }
	        } else {
	        	sorted_list = list
	        }

	        //sort the array
	        sorted_list.sort(function(a, b){
	        	for(var i=0; i<sort_paths.length; i++) {
	        		var _a = fin.dot(sort_paths[i][0], null, a);
	        		var _b = fin.dot(sort_paths[i][0], null, b);
	        		var _direction = sort_paths[i][1];
	        		// if descending just switch _a and _b
	        		if(_direction === "desc") {
	        			var _o = _a;
	        			_a = _b;
	        			_b = _o;
	        		}
	        		// if they match, continue to the next sort_path	  
	        		if(_a === _b) {
	        			continue;
	        		}

	        		// determine type
	        		if(typeof _a === "string" || typeof _b === "string") {
	        			return _a.localeCompare(_b)
	        		}
	        		// number
	        		return _a - _b;
	        	}
	        })


	        return sorted_list
	    },

	    /*
	    // counts the keys in an object
	    */
	    countKeys: function(obj, noun) {
	    	if(typeof obj !== 'object') {
	    		var count = 0
	    	} else {
	    		if(typeof obj.length === 'undefined') {
	    			var count = Object.keys(obj).length;	
	    		} else {
	    			var count = obj.length;
	    		}
	    	}
	        
	        // decide to return number or string, and pluralize
			if(noun == undefined) {
				return count;
			} else {
				if(count == 0) {
					return "0 " + noun + "s";	
				} else if(count == 1) {
					return "1 " + noun;	
				} else {
					return count + " " + noun + "s";	
				}
			}
	    },


	    /*
	    // converts newline characters to <br />
	    */
	    convertNewlines: function(str) {
	        str = str.replace(/\n/g, '<br />');
	        return str
	    },

	    /*
	    // returns first argument if plural, or second argument if singular
	    */
	    pluralize: function(quantity, plural, singular) {
	        if(quantity == 0 || quantity > 1) {
	            return plural
	        } else {
	            if(singular !== undefined) {
	                return singular
	            } else {
	                return ""
	            }
	        }
	    },

	    /*
	    // returns the contraction for an integer as a string. eg: 3 becomes 3rd
	    */
	    getIntegerContraction: function(integer){
	        integer = parseInt(integer, 10);
	        switch(integer) {
	            case 0:
	                return "";
	                break;
	            case 1:
	                return "1st";
	                break;
	            case 2:
	                return "2nd";
	                break;
	            case 3:
	                return "3rd";
	                break;
	            default:
	                return integer + "th";
	                break;
	        }
	    },

	    /* 
	    // converts 16:00 to 4pm
	    */
	    convertFromMilitaryTime: function(military_time) {
	        var military_time_array = military_time.toString().split(':');
	        var military_hour = parseInt(military_time_array[0], 10)
	        var military_minute = parseInt(military_time_array[1], 10)
	        var am_pm = "am";
	        
	        if(military_hour >= 12) {
	            am_pm = "pm";
	        }

	        if(military_hour >= 13) {
	            military_hour -= 12
	        }
	       
	        if(military_hour < 10) {
	            military_hour = "0" + military_hour
	        }

	        if(military_minute < 10) {
	            military_minute = "0" + military_minute
	        }

	        return military_hour + ":" + military_minute + am_pm

	    },
	    /*
	    // show modal alert
	        @message: html for the message of the alert
	        @buttons: array of buttons "ok", "cancel", "continue" and corresponding click events as strings [["ok", "alert('what')"]]
	        leave arguments blank to clear alert
	    */
	    alert: function(message, buttons) {
	        if(message === undefined && buttons === undefined) {
	            // hide alert
	            $('#alert_content').html('').css('display', 'none');
	            return;
	        }
	        
	        $('#alert_content').html( _.template( $('#alert_modal').html(), {message: message, buttons: buttons} ) ).css('display', 'block')
	        

	        setTimeout(function(){
	            $('#alert_content .content').removeClass('before')
	        }, 10)
	        
	    },
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
	    // implementation of half text search for relevance searching through the data model.
	        
	        @tree = object of objects
	        @search_paths = object of arrays of dot notation paths within tree, so the name of a school for example, each array corresponds to a different query
	        if a path begins with an underscore it must have a match for the corresponding query/path, or the item will be excluded from results.
	        @query = array of search keyword(s) that correspond to the search_path arrays
	        @returns a sorted array of the tree's objects based on relevance
	        removed //@tolerance: if a relevance is below this threshold it will be excluded from the results
	        @cache: a dot notation string passed in to store the results
	    */
	    searchObject: function(tree, search_paths, query, cache) {
	            var tolerance = 0.4;
	            var max_matches = 0;
	            var index = {}
	            // simple search
	            var query_terms = []
	            for(var n=0; n<query.length; n++) {
	                query_terms[n] = query[n].toString().toLowerCase().replace(/[^a-z0-9]+/, ' ').split(/[ ]+/);
	            }
	            
	            // find paths that have to be matched, like if we're only searching starred items
	            var must_match_paths = []
	            for(var l=0; l<search_paths.length; l++) {
	                must_match_paths[l] = []
	                for(var j=0; j<search_paths[l].length; j++) {
	                    if(search_paths[l][j].toString().substr(0, 1) === "_") {                        
	                        // remove the underscore
	                        search_paths[l][j] = search_paths[l][j].substr(1, search_paths[l][j].length -1)
	                        must_match_paths[l].push(search_paths[l][j])
	                    }

	                    

	                }

	            }



	            // loop through all the objects
	            for(var i in tree) {
	                var matches = 0;
	                var no_query = false
	                
	                var searchable_content = "";
	                var must_matched_searchabled_content = "";

	                var must_matched = false // used to check if there are must matched paths, and whether they're matched
	                var must_match = false;
	                // for every path
	                for(var l=0; l<search_paths.length; l++) {
	                    for(var j=0; j<search_paths[l].length; j++) {
	                        
	                        if(must_match_paths[l].length === 0) {
	                            searchable_content += fin.dot(search_paths[l][j], null, tree[i]);
	                        } else {
	                            must_matched_searchabled_content += fin.dot(search_paths[l][j], null, tree[i])
	                        }
	                    }

	                    if(must_matched_searchabled_content.length > 0) {
	                        must_match = true;
	                    }

	                    if(query[l].length === 0) {
	                        no_query = true
	                    }
	                    searchable_content = searchable_content.toLowerCase().replace(/[^a-z0-9]+/, ' ');//.split(/[ ]+/);
	                    must_matched_searchabled_content = must_matched_searchabled_content.toLowerCase().replace(/[^a-z0-9]+/, ' ');
	                    // check all the query words against the searchable content
	                    for(var m=0; m<query_terms.length; m++) {
	                        for(var k=0; k<query_terms[m].length; k++) {
	                            // don't bother checking if the query word is blank, should probably prevent blanks instead of ignoring them
	                            if(query_terms[m][k].length === 0) {
	                                continue
	                            }
	                            // if there are must matches
	                            if(must_matched_searchabled_content.length > 0) {                                
	                                var must_match_array = must_matched_searchabled_content.toString().match(query_terms[m][k])
	                                var must_matches = must_match_array ? must_match_array.length : 0
	                                if(must_matches > 0) {
	                                    if(must_matched !== null) {
	                                        must_matched = true
	                                    }
	                                } else {
	                                    if(must_matched === true) {
	                                        // we had a match and now lost it so this item failed
	                                        must_matched = null
	                                    } else {
	                                        must_matched = false
	                                    }
	                                }
	                            }
	                            var match_array = searchable_content.toString().match(query_terms[m][k])
	                            matches += match_array ? match_array.length : 0
	                        }
	                    }
	                    // if we never found a must match
	                    if(must_matched_searchabled_content.length > 0 && must_matched === false) {
	                        must_matched = null                        
	                    } 
	                }
	                if(matches > 0 && must_matched !== null || no_query === true && must_matched !== null) {
	                    index[i] = tree[i];
	                    index[i]['matches'] = matches
	                    max_matches = Math.max(matches, max_matches)
	                }
	            }

	            // calculate and filter for threshold
	            //var relevance = max_matches
	            for(var p in index) {
	                if(index[p].matches / max_matches < tolerance) {
	                    delete index[p]
	                }
	            }

	            var sorted_tree = _.sort(index, function(item) {
	                return item.matches * -1
	            })

	            


	           
	          
	        
	        //fin.dot('data.meta.current_section.apps.multichoice')['filtered_questions']
	        setDot(cache, sorted_tree)
	       
	        return sorted_tree
	        

	    },
	    getFunctionArguments: function getFunctionArguments(params, named_args, unnamed_arguments) {
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
	    },
	    log: {
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
	    }
	    

	


}
// refine HighFin object
// shortcuts to minimize typing
$.extend(true, fin, {
	ce: fin.createElement,
	ach: fin.appendChild,
	log: fin.log,
})

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
*/

Function.prototype.curry = function curry(named_args) {
	var that = this;

	if(typeof that.prototype.curry_args !== 'undefined') {		
		named_args = $.extend(true, {}, that.prototype.curry_args, named_args);
	}

	var unnamed_args = fin.getFunctionArguments([], {}, arguments);

	if(typeof that.prototype.unnamed_args !== 'undefined') {		
		var previous_unnamed_args = that.prototype.unnamed_args;
		unnamed_args = [].concat(previous_unnamed_args, unnamed_args);
		arguments = [named_args].concat(unnamed_args);
	}

	if (typeof that.prototype.curry_fn !== 'undefined') {
		that = that.prototype.curry_fn;
	}
	var params = that.toString().match(/\(([^)]*)\)/)[1].replace(/[ ]*/g, "").split(',');				
	var args = fin.getFunctionArguments(params, named_args, arguments);	
	
	var func;
	
	func = function func(){
		return that.apply(that, args);
	}

	func.prototype.curry_args = named_args;
	func.prototype.unnamed_args = unnamed_args;
	func.prototype.curry_fn = that;

	return func
}




fin._meta.pathname = fin.removeEndSlashes(window.location.pathname.toString())	



// load plugins
$.extend(true, fin.util, Fin.prototype.plugins);


// ajax form capture

// @parseValidate has to be a string reference to a function that returns true or false, it is passed the jquery selected form object
$('form[ajaxform]').live('submit', function(e) {
	var form = $(e.target);

	if(arguments[1] === true) {
		var validator = fin.dot(form.attr('parseValidate'))
		if(typeof validator === "function") {
			//fin.log('no! ' + validator(form))
			return validator(form)
		} else {
			return true
		}
	}

	//return true
	var num_persistant_iframes = $('.persistant').length
	// create an iframe that will persist until server response
	var ajaxiframe_id = "ajaxpersistantiframe"+num_persistant_iframes;

	var ajaxiframe = fin.ce('iframe', {id: ajaxiframe_id,
					name: ajaxiframe_id,
					class: "ajaxformiframe persistant"}, 'body', '',
					{
						load: function() {
							log('')
						}
					})
	// setup form
	form.attr('target', ajaxiframe_id)

	
	// update hidden inputs	
	form.find("[name='pathname']").val(fin._meta.pathname)
	form.find("[name='hashbang']").val(form.attr('hashbang'))
	form.find("[name='command']").val(form.attr('command'))
	form.find("[name='onSuccess']").val(form.attr('onSuccess'))
	form.find("[name='onError']").val(form.attr('onError'))
	form.find("[name='ajaxiframe_id']").val(ajaxiframe_id)
	
	setTimeout(function(){
		try {
			form.trigger('submit', [true])
		} catch(err) {
			fin.log.error(err.message)
			fin.log.solution('If submit is not a function, do not set the name or id of any inputs in your ajaxform "submit"')
		}
	},500)

	return false
})




$(document).ready(function(){
	window.onbeforeunload = fin.onbeforeunload;
  	
  	//$(window).hashchange(fin.onHashchange)
  	window.onhashchange = fin.onHashchange;

  	// cache embedded templates
  	$("script[type='text/template']").each(function(i) {
  		fin.cacheTemplate($(this).attr('id').replace(/template_/, ""))
  	})

  	// fetch templates * will also trigger hashchange event
  	fin.fetchTemplates()

	fin.loading(false)

	
	
});

}




//window.fin = fin;


})(jQuery, window);











