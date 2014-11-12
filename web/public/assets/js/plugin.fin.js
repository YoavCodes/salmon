/* extras.fin.js v1.0.0
 * Copyright 2012-2013, Yoav Givati ( hello@yoavgivati.com )
 * http://highf.in ~ http://chalkhq.com
 *
 * Released under the MIT license
 * http://highf.in/license
 *
 * 
 * Updated: 15-11-2014
 * This is a fin plugin boilerplate. the <script> tag for this file should be after the <script> tag for fin.js but before calling Fin()
 * after calling Fin(), testfunc will be available at fin.util.testfunc()
 */
;(function($, Fin) {

if(typeof Fin.prototype.plugins === 'undefined') {
	Fin.prototype.plugins = {};
}

$.extend(true, Fin.prototype.plugins, {
	testfunc: function testfunc() {
		fin.util.log.solution('hello '+fin.settings.containers[0]);
	}
})

})(jQuery, Fin);


