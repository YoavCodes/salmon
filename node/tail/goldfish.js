/*
	goldfish, a persistant in-process queryable data store, for when you don't need to remember a lot.
*/
var fs = require('fs');
var _data = {
	collections: {},
	schema: {},
	info: {}
};
var changed = false;
var is_writing = false;
var schema; // schema is defined in your app.. maybe
var db; // exported db object
var isServer = true;

function load() {
	try {		
		_data = JSON.parse( fs.readFileSync('./data/goldfish.db', {encoding: 'utf8'}) )				
	} catch(err) {
		console.log(err)
		if(err.code === 'ENOENT') {
			// try create the file

			changed = true;
			save();
		}
	}
}

function save() {
	var data_str;

	if(changed === false || is_writing === true) return;
	
	is_writing = true;	
	data_str = JSON.stringify(_data);

	fs.writeFile('./data/goldfish.db', data_str, function(err) {
		if(err) throw err;
		console.log('saved');
		changed = false;
		is_writing = false;
	})
}

function init() {
	// todo: do in parallel
	load();
	setInterval(save, 1000)
}

/* types */
// In the schema every type has a '__type' and a '___default'. in some cases the __default represents something else.
/*
	Valid Types
	string, number, boolean, array, and object are all valid and take a default. In most cases you would use an object literal instead of
	the object type in the schema. In addition there are some special types:
	
	collection Type: 
		a special object (where every key is an auto incrementing id and every value is a document)
		its default describes the schema of it's documents
	ref Type:
		a dot key reference. eg: the author field of a blog post may point to '--users.1'
		its default describes the dotreference prefix eg: '--users'. this way the value stored in the database is only "1" saving space
		and simplifying migrations if we ever change the name of the users collection, we only have to change it in the schema for ref Types
		instead of each record.
	ref_array Type:
		an array of refs
		its default is the same as the ref Type's default
*/ 
function type(type, __default, __private){
	// string, number, boolean, array, object
	var item = {'__type': type, '__default': __default};
	
	if(__private === true) {
		item.__private = true;
	}
	return item;
}
// type aliases for cleaner code.
type.collection = function (__default, __private) { return type('collection',   __default, __private); };
type.ref 		= function (__default, __private) { return type('ref', 			__default, __private); };
type.ref_array  = function (__default, __private) { return type('ref_array', 	__default, __private); };
type.string 	= function (__default, __private) { return type('string', 		__default, __private); };
type.number 	= function (__default, __private) { return type('number', 		__default, __private); };
type.boolean 	= function (__default, __private) { return type('boolean', 		__default, __private); };
type.array 	 	= function (__default, __private) { return type('array', 		__default, __private); };
type.object 	= function (__default, __private) { return type('object', 		__default, __private); };

// database will already have init()ed
function setSchema(new_schema) {
	var current_schema = _data.schema;
	// todo: migrate collections from old schema to new schema
	_data.schema = new_schema;
	changed = true;
}



function fin(obj_path, object, create_nodes){

	if(obj_path === null || typeof obj_path === "undefined") {
		obj_path = "";
	} else if(typeof obj_path === 'object'){
		// objects, functions, arrays ie: anything that can store properties.
		object = obj_path;
		obj_path = '';
	} else {
		// number, boolean, string. cast to string
		obj_path = "" + obj_path
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
		schema: _data.schema, // keep track of the schema of the current node.
		schema_type: '',
		last_key: obj_path, // last_key keeps track of the last dotkey reference followed. it's a direct reference to the object in val
		last_insert_id: void 0, // chaining calls after insert can access the row id
		create_nodes: create_nodes || false, // toggle to true to create object nodes if they don't exist, useful for saving data to the model.
		select: [],// allow selecting an array of properties. used in results and result calls
		/*
			return findings
		*/
		// return a template friendly version of the value
		// eg: normally in order to traverse nodes fin() will create object nodes at each step
		// string() will return an empty string for null, undefined, {} values
		// this is helpful if you want to print out values in a template if they exist {{ fin('value.does.not.exist') }} will print an empty string
		string: function() {
			if (typeof this.val === 'undefined' || this.val === null || this.val.constructor === Object && Object.keys(this.val).length === 0) {
				return "";
			} else {
				return this.val.toString();
			}
		},		
		// cast the value to a boolean
		bool: function() {
			return (this.val == true);
		},
		/*
			modify findings
		*/
		// narrow down findings
		find: function(dot_path) {
			dot_path = obj_path + "." + dot_path;
			return fin(dot_path);
		},		
		// returns the value of a subnode without modifying our current findings object
		get: function(dot_path) {			
			return fin(dot_path, findings.val).val;
		},
		// gets the property of the current val, changing val, but not the rest of the findings object
		// useful for querying a single record by rowid. without the overhead of sort. 
		// eg: tail.db('posts').get('1') instead of tail.db('posts').where('rowid').is('1').results()
		// note: because get() changes the value of .val without changing any of the other findings properties
		// it's only useful just before calling .result(), so .result() is called for you
		// if you want the record itself use find('1').val instead.
		getResult: function(dot_path) {		
			return fin(this.last_key +'.'+dot_path).result();
		},
		createNodes: function() {
			this.create_nodes = true;
			return findings;
		},
		// set a new value
		set: function(new_value, follow_dotkeys) {
			this.create_nodes = true;
			dot(obj_path, object, findings, false, new_value, follow_dotkeys);
			changed = true
			return findings;
		},
		// deletes the property and value at the end of the lookup chain and then regressively changes dot.string's followed to get there
		remove: function(follow_dotkeys) {
			dot(obj_path, object, findings, true, void 0, follow_dotkeys);						
			changed = true;
		},
		// adds a child document to a collection
		insert: function(child) {
			
			// get nextid
			// todo: race condition, create database lock mechanism that prevents inserting a child of a collection
			// while an insert is taking place. maybe store it in info __insert_lock
			
			var __index = fin(this.last_key, _data.info).find('index');			
			if(typeof __index.val === 'undefined') {				
				__index = fin(this.last_key+'.index', _data.info, true).set(0)
			}
			
			var id = (parseInt(__index.val, 10) || 0) + 1;
			
			__index.set(id);

			child.rowid = id.toString();
			var _findings = fin(obj_path, object, true)

			_findings.val[id] = child;

			_findings.last_insert_id = id;
			changed = true;
			
			return _findings;

		},
		// get the item we just inserted
		inserted_child: function() {
			if(typeof last_insert_id === 'undefined') return null;

			return this.val[ this.last_insert_id ];
		},
		// extend a record. eg: if post has a date_created timestamp generated during insert i can pass in {title:'new title'}
		// to just update the title of the object.
		// you could just query the record, record.title = 'new title'; tail.db.save(); if you only care about once record
		// but passing in an object that extends one or more records is easier using this update(partial_record) method.
		update: function(partial_record) {
			// todo
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

		},
		// get properly structured result object and resolve dot key references
		// todo: optimize the shit out of all this, db indexes, schema definitions, and so on.

		/*
		sort() applies the filter and returns an array. maybe it should store results in findings.results.
		if findings.results.length > 0, then use it, otherwise use findings.val

		*/
		results: function(sort_by) {			
			if(sort_by === "sortByDate") {
				return this.getResults( this.sort() );	
			} else if(typeof sort_by === 'function') {
				return this.getResults( this.sort(sort_by) );
			} else {
				return this.getResults( this.sort() );
			}
		},

		result: function() {		
			return this.getResults( [this.val] );
		},

		/// returns a clone of the data.
		getResults: function(sorted_array) {	
			// create data structure	
			for(var s=0; s<sorted_array.length; s++) {
				if(sorted_array[s].constructor === Object) {
					sorted_array[s] = tail.util.extend({}, sorted_array[s]);
				}
			}		
			var results = {};	
			var schema = this.schema;	
			var prop_schema = schema;
			var dot_paths = []; // prevent circular references	
			var key;
			
			function buildTree(dot_path, val) {
				if(dot_paths.indexOf(dot_path) > -1) {
					// already built this tree
					return null
				} else {
					dot_paths.push(dot_path);
				}
				// build tree				
				var dot_path_array = dot_path.split('.');	
				var key = dot_path_array.shift()
				if(dot_path_array.length > 0) {
					results[ key ] = results[ key ] || {}
				} else {
					if(val.constructor === Object) {
						results[ key ] = tail.util.extend({}, val);
					} else {
						results[ key ] = val						 
					}
				}	
				var path = results[ key ];

				for(var i=0; i<dot_path_array.length; i++) {						
					if(i === dot_path_array.length-1) {	
						if(typeof val !== 'undefined' && val.constructor === Object) {
							path = path[dot_path_array[i]] = tail.util.extend({}, val);
						} else {	
							path = path[dot_path_array[i]] = val;	
						}
					} else {		
						path = path[dot_path_array[i]] = {};
					}						
				}
				
				
				return path;
			}


			function resolveRefs(document, schema) {				
				var refs = []
				var ref;
				for(var prop in document) {	
					if(typeof schema === 'undefined') {
						continue
					}				
					prop_schema = schema.__default[prop];
					if(typeof prop_schema !== 'undefined' && prop_schema.__private === true) {
						delete document[prop];
						continue;
					}
					
					if(typeof prop_schema !== 'undefined' && prop_schema.__type === 'ref') {
						refs = [document[prop]];
					} else if(typeof prop_schema !== 'undefined' && prop_schema.__type === 'ref_array') {
						refs = document[prop];
					}
					for(var r=0; r<refs.length; r++) {		
						ref = refs[r];				
						var dot_ref = prop_schema.__default.substr(2) + '.' + ref;
						if(prop_schema.__type === 'ref') {
							document[prop] = '--'+dot_ref;
						} else if(prop_schema.__type === 'ref_array') {
							document[prop][r] = '--'+dot_ref;
						}
						var resolved_document = buildTree(dot_ref, fin(dot_ref).val);						
						// todo: replace _data.schema[prop_schema.__default.substr(2)] with a function or special call to fin()
						// that can traverse the schema to support dot references multiple levels deep.
						resolveRefs(resolved_document, _data.schema[prop_schema.__default.substr(2)]); // recurse
					}
				}
			}


			for(var i=0; i<sorted_array.length; i++) {
				if(typeof this.schema !== 'undefined' && this.schema_type === 'collection') {
					key = this.last_key + "." + sorted_array[i].rowid 
				} else {
					key = this.last_key;
				}
				
				var path = buildTree(key, sorted_array[i])
				
				resolveRefs(path, schema)
			}
			return results;
		},




		// sort results by comparing dates. 
		// @date_field: string, object prop key that contains the date to compare
		// @direction: string defaults to desc (newest first), can be asc (oldest first)
		sortByDate: function(date_field, direction) {
			return this.sort( function(a, b) {
				if(direction === 'asc') {
					var c = b; b = a; a = b;
				}
				return new Date( b[date_field] ) - new Date( a[date_field] );
			});
		}
	}

	function dot(dot_path, object, findings, remove, new_value, follow_dotkeys) {
		var data_path = false;

		if(dot_path.substr(0,2) === "__") {
			dot_path = dot_path.substr(2);
		}

		if(dot_path.substr(0,2) === "--") {
			dot_path = dot_path.substr(2);
			data_path = true;
		}

		var path = dot_path.split('.');
		// assume namespace is window if undefined
		if(object == undefined ) { // this will assert true for null or undefined, assuming the var exists, which it does in this scope, just doesn't have a value		
			path.unshift(_data.collections); 
		} else {
			path.unshift(object);
		}
		// loop for iterating through object, following dot.paths
		//var value;
		if(path.length > 0) {
			 
			findings.val = path[0];			
			for(var i=1; i < path.length; i++) {
				var path_i = path[i];

				var findings_val_path_i = findings.val[path_i];

				if(isServer === true && typeof findings.schema !== 'undefined') {
					//findings.schema_type = findings.schema.__type;
					if(findings.schema_type === 'collection') {
						// if the parent of this node is a collection
						// set this type to document
						findings.schema_type = 'document'
					} else if (findings.schema_type === 'document' && typeof findings.schema.__default !== 'undefined') {
						// get the schema via document schema
						findings.schema = findings.schema.__default[path_i];
						findings.schema_type = findings.schema.__type;
					} else {
						// no parent type, likely top of schema tree
						findings.schema = findings.schema[path_i];
						if(typeof findings.schema !== 'undefined') {
							findings.schema_type = findings.schema.__type;
						}
					}
					if(typeof findings.schema !== 'undefined') {
						// now that schema has been set for this node
						if(findings.schema.__type === 'ref') {
							findings_val_path_i = findings.schema.__default + '.' + findings_val_path_i						
						} else if(findings.schema.__type === 'ref_array') {
							for(var k=0; k<findings.val.length; k++) {
								findings_val_path_i[k] = findings.schema.__default + '.' + findings_val_path_i[k];
							}
						}
					}



				} 

				var next_i = i+1;
				if(typeof findings_val_path_i === 'undefined') {
					// create a blank node if the key doesn't exist.. if we're trying to access it, it means we want it to exist
					// this is a convenient way to create a new property and ensure all the parents exist				
					if(findings.create_nodes === true) {
						findings.val[path_i] = {};
					} else {						
						findings.val = void 0;
						return findings
					}

				} else if (findings_val_path_i === null) {				
					return null
				}				
				// check if it's a dot.key
				if(typeof findings_val_path_i === 'string' && findings_val_path_i.substr(0, 2) === "__" ||
					typeof findings_val_path_i === 'string' && findings_val_path_i.substr(0, 2) === "--") {
					var dot_string = findings_val_path_i//.substring(2);	
					// if findings.val is a dot string save it in findings.key
					// note: since we only return the original findings, this will only represent the first dot.string at the obj_path value					
					findings.key = dot_string;	
					findings.last_key = dot_string;
					
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
						var lookup_chain = fin(dot_string);
						findings.val = lookup_chain.val;	
						findings.last_key = lookup_chain.last_key;
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

// exports
var fin = fin;

fin.init = init;
fin.type = type;
fin.setSchema = setSchema;
fin.save = function() {
	changed = true;
}


module.exports = fin;