/*
goldfish database shema

in addition to number, boolean, string, array, object, we have 
== special types:
- collection (an object where every key is an auto incrementing id of a given type)
- reference (a dot key reference) 

a property/node is assumed to be public ie: can be sent to the front-end. use __private: true to change that.

*/
// we need access to db types
var db = require('../node/tail/goldfish');

/*
part of an example blog schema

var schema = {
	posts: db.type.collection({				
		title: 		db.type.string 	  (''),
		content: 	db.type.string 	  (''),
		author: 	db.type.ref 	  ('--users'),
		categories: db.type.ref_array ('--categories'),
		tags: 		db.type.ref_array ('--tags'),
		published: 	db.type.boolean	  (false),
			
	}),
	users: db.type.collection({
		email: 			 db.type.string(''),
		display_name: 	 db.type.string(''),
		pass_hash: 		 db.type.string('', true),
		activation_code: db.type.string('', true),
		session_id: 	 db.type.string('', true),
		ip_address: 	 db.type.string('', true)	
	}),
	config: db.type.object({
		mailgun_api_key: db.type.string('')
	})
}
*/

module.exports = schema;
// collection type, tags a document ie: a document that belongs in that colleciton
// other types take an optional default value as the second parameter.
// ref type is a dot reference, takes a prefix. if inserting/updating with an int. assume it's a row ID and prepend the prefix
// ref_arry type is an array of dot references.
