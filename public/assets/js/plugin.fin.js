/* plugin.fin.js v1.0.0
 * Copyright 2012-2013, Author ( author@email.com )
 * http://website.com
 *
 * Released under licence
 *
 * Updated: 
 * This is the fin plugin boilerplate. Include this file after fin.js but before calling fin.init()
 * In the example below, testfunc will be available at fin.pg.myPlugin.testfunc after calling fin.init()
 */
;(function($, fin) {

if(typeof fin.prototype.plugins === 'undefined') {
	fin.prototype.plugins = {};
}

$.extend(true, fin.prototype.plugins, {
	myPlugin: {
		testfunc: function testfunc() {
			fin.util.log.solution('hello plugin');
		}
	}
})

})(jQuery, fin);