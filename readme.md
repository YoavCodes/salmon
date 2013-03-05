# HighFin.js - Lightening Fast Overview
HighFin.js is a flexible and configurable Javascript framework. Built on Node.js for building next generation client-side apps, fast.

**Table of Contents**
- High-level Overview
- Installation
- Project Folder Walkthrough
- Framework Overview (client and server)
- HighFin Templates
- Forms
- Notes
- Roadmap


## High-level Feature Overview
- Complete dev environment in a box - get started in 3 commands.
- Supports multiple navigation paradigms out of the box.
- Supports multiple paradigms of code separation and structure out of the box.
- Request routing and automatic form & post handling.
- Automatically namespaces functions.
- Tested in real world apps with thousands of active users.
- Helper functions that actually help with no extra work or changes to the way you code.
- Robust templating engine like no other that's new, refreshing, and easy to read.
	


## Installation
1. Install [Vitualbox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](http://www.vagrantup.com/)
2. Clone highfin.js onto your hard drive
3. Open terminal and cd to the project folder
4. Type `vagrant up`
5. Wait for Vagrant to create the dev environment, ETA ~5-10mins
6. When it's done type `vagrant ssh`
7. /vagrant is your project folder in the vm, it's a live copy of the project folder on your host machine, type `node-dev /vagrant/node/high.js` to run the back-end
	you'll now get output in the terminal
8. Go open Chrome and enter `http://200.200.200.200` as the url
9. start hacking


## Rebooting the VM
If you run into trouble and need to reboot the vm:

1. Type `exit` (if you're already sshed into it, otherwise just cd to the project folder on your host machine)
2. Type `vagrant reload`
3. This will configure ports properly, restart nginx, and reboot the VM.
4. `vagrant ssh`
5. `node-dev /vagrant/node/high.js`
6. back in businesss



## Project Folder Overview
	+---application
	|	└---config.js    							( HighFin.js server configuration )
	|   └---router.js    							( routes, url management )   
	+---conf
	|	└---dev
	|   	└---etc
	|   		└---nginx
	|   			└---sites-available
	|   				└---highfin-dev.conf    	( nginx config )
	|   	└---mongodb
	|   		└---highfin     					( database name )
	|   			└---collection.bson    		( collection data )
	+---node
	|	└---node_modules
	|   	└---node dependencies
	|   └---high.js    							( server side HighFin.js library )
	|   └---package.json    						( configure node dependencies )
	+---public
	|	└---assets
	|   	└---css
	|   	└---imgs
	|   	└---js
	|   └---test_app    							( /test_app/ html files and folder structure )
	|   	└---index.html   						( test_app's index file )
	|	└---index.html    						( root index file )
	+---templates    							  ( namespaced templates )
	|	└---home
	|   	└---welcome.js    					( a primarily Javascript template )
	|   	└---welcome2.html   					( a primarily HTML template )
	|   	└---welcome3.fn.js  					( namespaced client-side function exports )
	|   └---test
	|   	└---welcome.js    					( this template would be test_welcome )
	+---Vagrantfile    							  ( Vagrant configuration )


## Multiple navigation paradigms out of the box.
- hashbang live web app (where the client never reloads)
- standard path based navigation
- separate apps with shared code at different paths
- separate apps with shared code at different subdomains
- and any combination of the above

## Server
- Application code is separated into an mvc like folder structure containing node.js modules ie: controllers/models.
- a node.js module scopes the 'this' keyword to the object you assign it when you require.
- so since we attach these modules into the "global" server object(which wouldn't normally be global only within the main high.js ie: local in the context of modules) the `this` keyword inside these modules now references the entire `high` object. so you get this functionality without having to do anything special in the modules themselves.

## Helper Functions
Available on both front and back-end:

- Execute any function with named argument pairs.
- Get and Set nodes in any object using a recursive dot.notation syntax that supports embedded foreign keys to the same or other objects.
- A robust search that lets you find and return matching values or branches in any object.
- Automatic next generation JSONP form handling with fallbacks for compatible ajax that supports file uploads cross platform.
- a lot more...

## Templates
Most front-end templating engines fall short:
- Attaching event listeners with other engines requires: 
	- having a unique id/class for an element
	- writing a `<script text/javascript>` block within the template with a setTimeout(function(){},0) to ensure it's executed after the template html is rendered and inserted in the DOM, this is slow and non-deterministic.
- complex intertwining of markup and logic with tons of <% %> tags to distinguish code from markup if you want to group code by thought, but the template is often not parsed in the same way it's written which can lead to bugs.
- overly complicated code editor hacks for proper syntax-highlighting if you even have time.
- slower to render than a pure javascript approach because it requires parsing text
- logic inside html and tons of <% %> blocks is polluted code, 
- you lose stack trace information when errors occur inside templates

The HighFin templating engine solves the above issues and adds more functionality:
- HighFin.js templates let you switch between html and javascript templates easily based on the content of the template without losing functionality. 
	- Easily support markup heavy templates
	- Logic heavy templates
	- Function specific templates for automatically namespacing client-side functions
	- You can choose to trade-off between speed of authoring, speed of rendering, or mix and match, and also nest templates as needed.
- uses document.createElement and document fragments for lightening fast element manipulation before and/or after inserting into the DOM
- multiline strings in javascript using backticks \`string\`. 
	- Quotes never have to be escaped.
	- type faster with less Shift key action
- proper stack traces for templates showing file names and line numbers, regardless of how you choose organize or write your templates.
- javascript templates promote indentation and nesting structure that's new, refreshing, and easy to read.
- attaching jQuery (read: cross platform/more functional) event listeners is easy and intuitive, 
- so is passing a reference to the element and other scoped data to those event listeners without creating unique id/class names that pollute the DOM and without relying on global objects. although you could still easily do both.
- within backtick strings, use multiline strings without millions of plus signs and closing strings or backslashes {{ vars }} that can access the global data model and [[ arbitrary_js() ]] that can also be multiline and are executed so that they can access DOM elements defined in the template itself immediately after they've been inserted into the DOM and are DOM ready
- use .html or .js files loaded from the server. or script type="text/template-js" type="text/template-html" when loading templates from the client
- fetch and refresh templates at any time
- you can declare functions from within templates and use them within scope, or attach them to global client-side objects like window or fin. Or use client-side function exports to take advantage of automatic namespacing.
- you can define .fn template files, where .html and .js are templates that wait to be rendered, .fn files contain globally accessible functions which need to be added to the environment. ie: the code inside an .fn function is run when it's cached in it's own lexical scope. for added convenience instead of defining each function's namespace in a .fn file, which can be a pain if you're several folders deep you have to fin.fn.news = {}; fin.fn.news.comments = {} etc. until you reached the depth you wanted, you can optionally define it as exports.functionName = function() {} and the templating engine will determine the namespace automatically based on the folder path.

## FORMS

when creating a form element ce('form') you can specify the following attributes
- onSuccess
- onError
- parseValidate
- ajaxForm

If ajaxForm is set to true, the first thing that happens is an iframe is created next to the form and targeted. This will prevent an ajaxForm from reloading the page if the submit() function fails.

When a form is actually submitted, a new iframe is created in the document.body with a unique id and name and this iframe is targeted.

This allows you to submit a form multiple times asynchronously.

The server will respond to ajaxforms with the same json object, but with extra padding, ie: json-p. the json-p will call a jsonp handler function which will provide generic error handling, clean up the async iframe window that was being used, determine if the res.meta.status is a 200 or error and pass the response on to the onSuccess or onError handlers if they were specified and exist.

This approach gives us cross browser ajax support that also supports file uploads.

In general with form reponses. fin.data is automatically extended and updated with the response.

The parseValidate function, if specified will be used to determine if the form can be sent and perform client-side validation, it must return true or false.

## Notes
- when defining an array of arrays in template files, make sure to add a space in between the [ [] ] as [[asdf]] would be interpreted as arbitrary js

- if you create a multiline string like so \`  
blah
\`

	then there MUST be a space after the opening backtick
- when editing template files. the console error
Unexpected token ILLEGAL
is probably you not using backticks for strings correctly or forgetting to. you will get a console message indicating this, otherwise the illegal token will be printed in the console. if the template throws any other error, you'll see this in the console as well along with the file name, (template block id if an inline template) and line-number

- If the form contains an input with the name 'submit', even if it's of type="submit" ajaxform will not work, because when it tries to trigger the form's submit event it will instead select the input and try call the input like a function which causes it to fail

## Syntax highlighting in Sublime Text
1. open /Users/[username]/Library/Application Support/Sublime Text 2/Packages/JavaScript/JavaScript.tmLanguage in a text editor
2. find `<string>'</string>` 
3. paste the following <dict> block after it

			<dict>
				<key>begin</key>
				<string>`</string>
				<key>beginCaptures</key>
				<dict>
					<key>0</key>
					<dict>
						<key>name</key>
						<string>punctuation.definition.string.begin.js</string>
					</dict>
				</dict>
				<key>end</key>
				<string>`</string>
				<key>endCaptures</key>
				<dict>
					<key>0</key>
					<dict>
						<key>name</key>
						<string>punctuation.definition.string.end.js</string>
					</dict>
				</dict>
				<key>name</key>
				<string>string.quoted.single.js</string>
				<key>patterns</key>
				<array>
					<dict>
						<key>match</key>
						<string>\\(x\h{2}|[0-2][0-7]{,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)</string>
						<key>name</key>
						<string>constant.character.escape.js</string>
					</dict>
				</array>
			</dict>





## Roadmap
- support LESS and SASS out of the box
- data-binding
- advanced caching and cache controls that browsers respect
- full-text client-side search
- websockets
- support for other databases
- improved support for file uploads
- hashbang alternate content (_escaped_fragment_) support for built in SEO
- base styles and UI elements
- manage and organize 3rd party dependencies
- improved route matching
- comprehensive documentation and hello world app
