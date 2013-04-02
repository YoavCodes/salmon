/* HighFin.js v1.0.0
 * Copyright 2012-2013, Yoav Givati ( hello@yoavgivati.com )
 * http://highf.in ~ http://chalkhq.com
 *
 * Released under the MIT license
 * http://highf.in/license
 *
 * Includes:
 	* jQuery.js
 		* http://jquery.com/
 	* jQuery Cookie Plugin
 		* https://github.com/carhartl/jquery-cookie
 	 * jQuery hashchange event
 		* http://benalman.com/projects/jquery-hashchange-plugin/
 	 * history API JavaScript Library
 	 	* http://spb-piksel.ru/
 	 * XDate
 	 	* http://arshaw.com/xdate/
 * 
 * 
 * Update: 30-10-2012 
 */

/* 
use log() instead of console.log() to prevent client side errors in some browsers that lack a console.
@msg = [String or Object] what to print in the console
*/
function log(msg) {
    if(typeof console !== 'undefined') {
         console.log(msg);
    }
}
/****************************/

// Dependencies
//===========================/
/****************************/


/*! jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);
/****************************/
// extend jQuery.js
/****************************/

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

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
  			log('404 error')
  			break;
  	}
  	log($.parseJSON(res).error)
  	log('---')
    // handles 500 errors and other crazy shit globalobbaly 
    /*
    log({responseText: xhr.responseText})
    log(xhr)
    log(errorThrown)
    log(xhr.getAllResponseHeaders())

    // weird, we shouldn't be getting an error like this.. is socket down?
    //getSocketIO()
	*/
    // removes an item from the loading queue
    if(loading !== undefined) {
        loading(false)
    }
    return true
  }
});

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


/*
 * history API JavaScript Library v3.1.0 beta
 *
 * Support: IE6+, FF3+, Opera 9+, Safari, Chrome
 *
 * Copyright 2011-2012, Dmitriy Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 20-05-2012 
 */
(function(e,z,s,j,T){function G(a,c,g){var d=2===a?e.onhashchange:e.onpopstate,b=2===a?"hashchange":"popstate",f=w[b];m.createEvent?(a=m.createEvent("Events"),a.initEvent(b,s,s)):(a=m.createEventObject(),a.type=b);a.state=n.state;a.oldURL=c;a.newURL=g;d&&d.call(e,a);c=0;for(g=f.length;c<g;c++)f[c].call(e,a)}function N(a){return H?a?H.setItem("__hitoryapi__",I(a)):O(H.getItem("__hitoryapi__"))||{}:{}}function P(a,c,g){var d=a,b,f=s;if(A||B)for(b in c){if(C.call(c,b))if(B)c[b].get&&B.call(a,b,c[b].get),
c[b].set&&Z.call(a,b,c[b].set);else if(A)try{A(a,b,c[b])}catch(h){if(g)return s;f=z;break}}else f=z;if(f&&x){g="StaticClass"+$+x++;d=["Class "+g];"execVB"in e||execScript("Function execVB(c) ExecuteGlobal(c) End Function","VBScript");"VBCVal"in e||execScript("Function VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function","VBScript");for(b in a)d[d.length]="Public ["+b+"]";C.call(a,"toString")&&(a.propertyIsEnumerable("toString")||(d[d.length]="Public [toString]"),c["(toString)"]={get:function(){return this.toString.call(this)}});
for(b in c)if(C.call(c,b)&&(c[b].get&&(a["get "+b]=c[b].get,d.push("Public [get "+b+"]","Public "+("(toString)"===b?"Default ":"")+"Property Get ["+b+"]","Call VBCVal(me.[get "+b+"].call(me),["+b+"])","End Property")),c[b].set))a["set "+b]=c[b].set,d.push("Public [set "+b+"]","Public Property Let ["+b+"](v)","Call me.[set "+b+"].call(me,v)","End Property","Public Property Set ["+b+"](v)","Call me.[set "+b+"].call(me,v)","End Property");d.push("End Class","Function "+g+"Factory()","Set "+g+"Factory=New "+
g,"End Function");execVB(d.join("\n"));d=e[g+"Factory"]();for(b in a)d[b]=a[b];C.call(a,"toString")&&(d.toString=a.toString)}return d}var m=e.document,r=e.history||{},f=e.location,p=!!r.pushState,aa=p&&r.state===T,u=f.href,v=e.JSON||{},A=Object.defineProperty,B=Object.prototype.__defineGetter__,Z=Object.prototype.__defineSetter__,U=r.pushState,V=r.replaceState,H=e.sessionStorage,C=Object.prototype.hasOwnProperty,ba=Object.prototype.toString,y=eval("/*@cc_on (@_jscript_version+'').replace(/\\d\\./, '');@*/"),
$=(new Date).getTime(),x=(A||B)&&(!y||8<y)?0:1,i=8>y?m.createElement("iframe"):s,D,E,F,J="",K=(D="addEventListener",e[D])||(D="attachEvent",J="on",e[D]),ca=(E="removeEventListener",e[E])||(E="detachEvent",e[E]),da=(F="dispatchEvent",e[F])||(F="fireEvent",e[F]),L=[],y=[],Q=0,w={onpopstate:L,popstate:L,onhashchange:y,hashchange:y},t=function(){var a,c,g,d={basepath:"/",redirect:0,type:"/"};g=m.getElementsByTagName("SCRIPT");for(a=0;g[a];a++)if(c=/(.*)\/(?:history|spike)(?:-\d\.\d(?:\.\d)?\w?)?(?:\.min)?.js\?(.*)$/i.exec(g[a].src)||
a===g.length-1&&2===(c=g[a].src.split("?")).length&&(c[2]=c[1])&&c){a=0;for(g=c[2].split("&");g[a];)c=g[a++].split("="),d[c[0]]="true"==c[1]?z:"false"==c[1]?s:c[1]||"";d.basepath=d.basepath||"/";break}return d}(),l=function(a){var c,g,d,b,e,h,q,i=RegExp("^"+t.basepath,"i");return function(k,j){if(k){if(!p)var o=l(),R=o.f,X=o.i,k=/^(?:[a-z]+\:)?\/\//.test(k)?0===k.indexOf("/")?X+k:k:X+"//"+o.h+(0===k.indexOf("/")?k:0===k.indexOf("?")?R+k:0===k.indexOf("#")?R+o.g+k:R.replace(/[^\/]+$/g,"")+k)}else if(k=
f.href,!p||j)k=f.protocol+"//"+f.host+t.basepath+(k.replace(/^[^#]*/,"")||"#").replace(RegExp("^#[/]?(?:"+t.type+")?"),"");if(c!==k){a.href=c=k;h=a.port;e=a.host;q=a.pathname;if("http:"===a.protocol&&80==h||"https:"===a.protocol&&443==h)e=a.hostname,h="";q=0===q.indexOf("/")?q:"/"+q;g=q+a.search+a.hash;b=q.replace(i,t.type)+a.search;d=b+a.hash}return{a:a.protocol+"//"+e+g,i:a.protocol,h:e,j:a.hostname||f.hostname,k:h||f.port,f:q,g:a.search,e:a.hash,b:g,c:b,d:d}}}(m.createElement("a")),n=!x?r:{back:r.back,
forward:r.forward,go:r.go,pushState:j,replaceState:j,emulate:!p,toString:function(){return"[object History]"}},M={state:{get:function(){return i&&i.storage||N()[n.location.href]||j}},length:{get:function(){return r.length}},location:{set:function(a){e.location=a},get:function(){return p?f:S}}},S={assign:function(a){f.assign(p||0!==a.indexOf("#")?a:"#"+l().c+a)},reload:f.reload,replace:function(a){f.replace(p||0!==a.indexOf("#")?a:"#"+l().c+a)},toString:function(){return this.href}},ea={href:{set:function(a){f.href=
a},get:function(){return l().a}},protocol:{set:function(a){f.protocol=a},get:function(){return f.protocol}},host:{set:function(a){f.host=a},get:function(){return f.host}},hostname:{set:function(a){f.hostname=a},get:function(){return f.hostname}},port:{set:function(a){f.port=a},get:function(){return f.port}},pathname:{set:function(a){f.pathname=a},get:function(){return l().f}},search:{set:function(a){f.search=a},get:function(){return l().g}},hash:{set:function(a){var a=0===a.indexOf("#")?a:"#"+a,c=
l();i?a!=c.e&&(n.pushState(j,j,c.c+a),Y({oldURL:c.a})):f.hash="#"+c.c+a},get:function(){return l().e}}},I=v.stringify||function(a){function c(d){var b,e,h;b=(typeof d).charCodeAt(2);if(114===b)d=g(d);else if(109===b)d=isFinite(d)?""+d:"null";else if(111===b||108===b)d=""+d;else if(106===b)if(d){e=(b="[object Array]"===ba.apply(d))?"[":"{";if(b)for(h=0;h<d.length;h++)e+=(0==h?"":",")+c(d[h]);else for(h in d)C.call(d,h)&&d[h]!==a&&(e+=(1==e.length?"":",")+g(h)+":"+c(d[h]));d=e+(b?"]":"}")}else d="null";
else d=a;return d}function g(a){var b=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};b.lastIndex=0;return b.test(a)?'"'+a.replace(b,function(a){var b=c[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}return c}(),O=function(){var a=v.parse;return function(c){return c?a?a(c):(new Function("return "+
c))():j}}(),Y=function(){function a(a){var c=l();if(Q)return q=c.a,Q=0;var d=a.oldURL||q,a=q=a.newURL||c.a,c=d.replace(/^.*?(#|$)/,""),e=a.replace(/^.*?(#|$)/,"");d!=a&&!b&&G();u=b=0;c!=e&&G(2,d,a)}function c(){if(u&&!(u=0)&&h.b!==t.basepath)clearInterval(i),setTimeout(G,10)}var g=e.onpopstate||j,d=e.onhashchange||j,b=0,i=j,h=l(),q=h.a;h.e.replace(/^#/,"");K(J+"hashchange",a,s);K(J+"popstate",function(){if(u===f.href)return u=0;u=0;G(b=1)},s);n.fixURL=function(a){return l(a).b};n=P(n,x?M:r.state===
T?{state:M.state,location:M.location}:{location:M.location});S=P(S,ea);e[D]=function(a,b,d,e){w[a]?(w[a].push(b),!p&&L===w[a]&&c()):K(a,b,d,e)};e[E]=function(a,b,c){var d=w[a];if(d)for(a=d.length;--a;){if(d[a]===b){d.splice(a,1);break}}else ca(a,b,c)};e[F]=function(a,b){var c=w[a],d=c===L?e.onpopstate:e.onhashchange;if(c){b=b||("string"==typeof a?e.event:a);try{b&&(b.target=e)}catch(g){try{b.srcElement=e}catch(h){}}d&&d.call(e,b);for(var d=0,f=c.length;d<f;d++)c[d].call(e,b);return z}return da(a,
b)};x&&execScript("Public history, onhashchange","VBScript");if((!A&&!B||!P(e,{onhashchange:{get:function(){return d},set:function(a){d=a||j}},onpopstate:{get:function(){return g},set:function(a){(g=a||j)&&!p&&c()}}},1))&&!p)i=setInterval(function(){e.onpopstate&&c()},100);if(t.redirect&&0===e.parent.frames.length){var W=l(j,z).b,k=f.search,m=f.pathname,o=t.basepath;if(p){if(W!=o&&RegExp("^"+o+"$","i").test(m)&&(f.href=W),!RegExp("^"+o,"i").test(m))f.href=m.replace(/^\//,o)+k}else m!=o&&(f.href=o+
"#"+m.replace(RegExp("^"+o,"i"),t.type)+k+f.hash)}return a}();n.pushState=function(a,c,e,d){var b=N(),i=l().a,h=e&&l(e);u=0;e=h?h.a:i;d&&b[i]&&delete b[i];if((!p||aa)&&H&&a)b[e]=a,N(b),a=j;U&&V?d?V.call(n,a,c,e):U.call(n,a,c,e):h&&h.b!=l().b&&(Q=1,d?f.replace("#"+h.d):f.hash=h.d)};n.replaceState=function(a,c,e){n.pushState(a,c,e,1)};x?(e.history=n,function(a,c){if(i){var g,d,b=function(){var a=l().a;c!=a&&Y({oldURL:c,newURL:c=a})};d=setInterval(b,100);i.src="javascript:true;";i=m.documentElement.firstChild.appendChild(i).contentWindow;
n.pushState=g=function(a,e,j,k,m){var o=i.document,n=["<script>","lfirst=1;",,"storage="+I(a)+";","<\/script>"];if(j=j&&l(j)){m||clearInterval(d);if(k)i.lfirst?(history.back(),g(a,e,j.a,0,1)):(i.storage=a,f.replace("#"+j.d));else if(j.a!=c||m)i.lfirst||(i.lfirst=1,g(i.storage,e,c,0,1)),n[2]='parent.location.hash="'+j.d.replace(/"/g,'\\"')+'";',o.open(),o.write(n.join("")),o.close();m||(c=l().a,d=setInterval(b,100))}else i.storage=a};K(J+"unload",function(){if(i.storage){var a={};a[l().a]=i.storage;
m.cookie="_historyAPI="+escape(I(a))}clearInterval(d)},s);if(1<a.length){a=unescape(a.pop().split(";").shift());try{i.storage=O(a)[l().a]}catch(j){}}!v.parse&&!v.stringify&&(v.parse=O,v.stringify=I,e.JSON=v)}}(m.cookie.split("_historyAPI="),l().a)):e.history.emulate=!p})(window,!0,!1,null);

/*
 XDate v0.7
 Docs & Licensing: http://arshaw.com/xdate/
*/
var XDate=function(g,m,A,p){function f(){var a=this instanceof f?this:new f,c=arguments,b=c.length,d;typeof c[b-1]=="boolean"&&(d=c[--b],c=q(c,0,b));if(b)if(b==1)if(b=c[0],b instanceof g||typeof b=="number")a[0]=new g(+b);else if(b instanceof f){var c=a,h=new g(+b[0]);if(l(b))h.toString=w;c[0]=h}else{if(typeof b=="string"){a[0]=new g(0);a:{for(var c=b,b=d||!1,h=f.parsers,r=0,e;r<h.length;r++)if(e=h[r](c,b,a)){a=e;break a}a[0]=new g(c)}}}else a[0]=new g(n.apply(g,c)),d||(a[0]=s(a[0]));else a[0]=new g;
typeof d=="boolean"&&B(a,d);return a}function l(a){return a[0].toString===w}function B(a,c,b){if(c){if(!l(a))b&&(a[0]=new g(n(a[0].getFullYear(),a[0].getMonth(),a[0].getDate(),a[0].getHours(),a[0].getMinutes(),a[0].getSeconds(),a[0].getMilliseconds()))),a[0].toString=w}else l(a)&&(a[0]=b?s(a[0]):new g(+a[0]));return a}function C(a,c,b,d,h){var e=k(j,a[0],h),a=k(D,a[0],h),h=c==1?b%12:e(1),f=!1;d.length==2&&typeof d[1]=="boolean"&&(f=d[1],d=[b]);a(c,d);f&&e(1)!=h&&(a(1,[e(1)-1]),a(2,[E(e(0),e(1))]))}
function F(a,c,b,d){var b=Number(b),h=m.floor(b);a["set"+o[c]](a["get"+o[c]]()+h,d||!1);h!=b&&c<6&&F(a,c+1,(b-h)*G[c],d)}function H(a,c,b){var a=a.clone().setUTCMode(!0,!0),c=f(c).setUTCMode(!0,!0),d=0;if(b==0||b==1){for(var h=6;h>=b;h--)d/=G[h],d+=j(c,!1,h)-j(a,!1,h);b==1&&(d+=(c.getFullYear()-a.getFullYear())*12)}else b==2?(b=a.toDate().setUTCHours(0,0,0,0),d=c.toDate().setUTCHours(0,0,0,0),d=m.round((d-b)/864E5)+(c-d-(a-b))/864E5):d=(c-a)/[36E5,6E4,1E3,1][b-3];return d}function t(a){var c=a(0),
b=a(1),a=a(2),b=new g(n(c,b,a)),d=u(c),a=d;b<d?a=u(c-1):(c=u(c+1),b>=c&&(a=c));return m.floor(m.round((b-a)/864E5)/7)+1}function u(a){a=new g(n(a,0,4));a.setUTCDate(a.getUTCDate()-(a.getUTCDay()+6)%7);return a}function I(a,c,b,d){var h=k(j,a,d),e=k(D,a,d),b=u(b===p?h(0):b);d||(b=s(b));a.setTime(+b);e(2,[h(2)+(c-1)*7])}function J(a,c,b,d,e){var r=f.locales,g=r[f.defaultLocale]||{},i=k(j,a,e),b=(typeof b=="string"?r[b]:b)||{};return x(a,c,function(a){if(d)for(var b=(a==7?2:a)-1;b>=0;b--)d.push(i(b));
return i(a)},function(a){return b[a]||g[a]},e)}function x(a,c,b,d,e){for(var f,g,i="";f=c.match(M);){i+=c.substr(0,f.index);if(f[1]){g=i;for(var i=a,j=f[1],l=b,m=d,n=e,k=j.length,o=void 0,q="";k>0;)o=N(i,j.substr(0,k),l,m,n),o!==p?(q+=o,j=j.substr(k),k=j.length):k--;i=g+(q+j)}else f[3]?(g=x(a,f[4],b,d,e),parseInt(g.replace(/\D/g,""),10)&&(i+=g)):i+=f[7]||"'";c=c.substr(f.index+f[0].length)}return i+c}function N(a,c,b,d,e){var g=f.formatters[c];if(typeof g=="string")return x(a,g,b,d,e);else if(typeof g==
"function")return g(a,e||!1,d);switch(c){case "fff":return i(b(6),3);case "s":return b(5);case "ss":return i(b(5));case "m":return b(4);case "mm":return i(b(4));case "h":return b(3)%12||12;case "hh":return i(b(3)%12||12);case "H":return b(3);case "HH":return i(b(3));case "d":return b(2);case "dd":return i(b(2));case "ddd":return d("dayNamesShort")[b(7)]||"";case "dddd":return d("dayNames")[b(7)]||"";case "M":return b(1)+1;case "MM":return i(b(1)+1);case "MMM":return d("monthNamesShort")[b(1)]||"";
case "MMMM":return d("monthNames")[b(1)]||"";case "yy":return(b(0)+"").substring(2);case "yyyy":return b(0);case "t":return v(b,d).substr(0,1).toLowerCase();case "tt":return v(b,d).toLowerCase();case "T":return v(b,d).substr(0,1);case "TT":return v(b,d);case "z":case "zz":case "zzz":return e?c="Z":(d=a.getTimezoneOffset(),a=d<0?"+":"-",b=m.floor(m.abs(d)/60),d=m.abs(d)%60,e=b,c=="zz"?e=i(b):c=="zzz"&&(e=i(b)+":"+i(d)),c=a+e),c;case "w":return t(b);case "ww":return i(t(b));case "S":return c=b(2),c>
10&&c<20?"th":["st","nd","rd"][c%10-1]||"th"}}function v(a,c){return a(3)<12?c("amDesignator"):c("pmDesignator")}function y(a){return!isNaN(+a[0])}function j(a,c,b){return a["get"+(c?"UTC":"")+o[b]]()}function D(a,c,b,d){a["set"+(c?"UTC":"")+o[b]].apply(a,d)}function s(a){return new g(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())}function E(a,c){return 32-(new g(n(a,c,32))).getUTCDate()}function z(a){return function(){return a.apply(p,
[this].concat(q(arguments)))}}function k(a){var c=q(arguments,1);return function(){return a.apply(p,c.concat(q(arguments)))}}function q(a,c,b){return A.prototype.slice.call(a,c||0,b===p?a.length:b)}function K(a,c){for(var b=0;b<a.length;b++)c(a[b],b)}function i(a,c){c=c||2;for(a+="";a.length<c;)a="0"+a;return a}var o="FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds,Day,Year".split(","),L=["Years","Months","Days"],G=[12,31,24,60,60,1E3,1],M=/(([a-zA-Z])\2*)|(\((('.*?'|\(.*?\)|.)*?)\))|('(.*?)')/,
n=g.UTC,w=g.prototype.toUTCString,e=f.prototype;e.length=1;e.splice=A.prototype.splice;e.getUTCMode=z(l);e.setUTCMode=z(B);e.getTimezoneOffset=function(){return l(this)?0:this[0].getTimezoneOffset()};K(o,function(a,c){e["get"+a]=function(){return j(this[0],l(this),c)};c!=8&&(e["getUTC"+a]=function(){return j(this[0],!0,c)});c!=7&&(e["set"+a]=function(a){C(this,c,a,arguments,l(this));return this},c!=8&&(e["setUTC"+a]=function(a){C(this,c,a,arguments,!0);return this},e["add"+(L[c]||a)]=function(a,d){F(this,
c,a,d);return this},e["diff"+(L[c]||a)]=function(a){return H(this,a,c)}))});e.getWeek=function(){return t(k(j,this,!1))};e.getUTCWeek=function(){return t(k(j,this,!0))};e.setWeek=function(a,c){I(this,a,c,!1);return this};e.setUTCWeek=function(a,c){I(this,a,c,!0);return this};e.addWeeks=function(a){return this.addDays(Number(a)*7)};e.diffWeeks=function(a){return H(this,a,2)/7};f.parsers=[function(a,c,b){if(a=a.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/)){var d=
new g(n(a[1],a[3]?a[3]-1:0,a[5]||1,a[7]||0,a[8]||0,a[10]||0,a[12]?Number("0."+a[12])*1E3:0));a[13]?a[14]&&d.setUTCMinutes(d.getUTCMinutes()+(a[15]=="-"?1:-1)*(Number(a[16])*60+(a[18]?Number(a[18]):0))):c||(d=s(d));return b.setTime(+d)}}];f.parse=function(a){return+f(""+a)};e.toString=function(a,c,b){return a===p||!y(this)?this[0].toString():J(this,a,c,b,l(this))};e.toUTCString=e.toGMTString=function(a,c,b){return a===p||!y(this)?this[0].toUTCString():J(this,a,c,b,!0)};e.toISOString=function(){return this.toUTCString("yyyy-MM-dd'T'HH:mm:ss(.fff)zzz")};
f.defaultLocale="";f.locales={"":{monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),amDesignator:"AM",pmDesignator:"PM"}};f.formatters={i:"yyyy-MM-dd'T'HH:mm:ss(.fff)",u:"yyyy-MM-dd'T'HH:mm:ss(.fff)zzz"};K("getTime,valueOf,toDateString,toTimeString,toLocaleString,toLocaleDateString,toLocaleTimeString,toJSON".split(","),
function(a){e[a]=function(){return this[0][a]()}});e.setTime=function(a){this[0].setTime(a);return this};e.valid=z(y);e.clone=function(){return new f(this)};e.clearTime=function(){return this.setHours(0,0,0,0)};e.toDate=function(){return new g(+this[0])};f.now=function(){return+new g};f.today=function(){return(new f).clearTime()};f.UTC=n;f.getDaysInMonth=E;if(typeof module!=="undefined"&&module.exports)module.exports=f;return f}(Date,Math,Array);

/*
	// date format https://github.com/phstc/jquery-dateFormat
	note: use the formatDate() helper function
*/
(function($){var daysInWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var shortMonthsInYear=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var longMonthsInYear=["January","February","March","April","May","June","July","August","September","October","November","December"];var shortMonthsToNumber=[];shortMonthsToNumber["Jan"]="01";shortMonthsToNumber["Feb"]="02";shortMonthsToNumber["Mar"]="03";shortMonthsToNumber["Apr"]="04";shortMonthsToNumber["May"]="05";shortMonthsToNumber["Jun"]="06";shortMonthsToNumber["Jul"]="07";shortMonthsToNumber["Aug"]="08";shortMonthsToNumber["Sep"]="09";shortMonthsToNumber["Oct"]="10";shortMonthsToNumber["Nov"]="11";shortMonthsToNumber["Dec"]="12";$.format=(function(){function strDay(value){return daysInWeek[parseInt(value,10)]||value;}
function strMonth(value){var monthArrayIndex=parseInt(value,10)-1;return shortMonthsInYear[monthArrayIndex]||value;}
function strLongMonth(value){var monthArrayIndex=parseInt(value,10)-1;return longMonthsInYear[monthArrayIndex]||value;}
var parseMonth=function(value){return shortMonthsToNumber[value]||value;};var parseTime=function(value){var retValue=value;var millis="";if(retValue.indexOf(".")!==-1){var delimited=retValue.split('.');retValue=delimited[0];millis=delimited[1];}
var values3=retValue.split(":");if(values3.length===3){hour=values3[0];minute=values3[1];second=values3[2];return{time:retValue,hour:hour,minute:minute,second:second,millis:millis};}else{return{time:"",hour:"",minute:"",second:"",millis:""};}};return{date:function(value,format){try{var date=null;var year=null;var month=null;var dayOfMonth=null;var dayOfWeek=null;var time=null;if(typeof value.getFullYear==="function"){year=value.getFullYear();month=value.getMonth()+1;dayOfMonth=value.getDate();dayOfWeek=value.getDay();time=parseTime(value.toTimeString());}else if(value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:\d{2}/)!=-1){var values=value.split(/[T\+-]/);year=values[0];month=values[1];dayOfMonth=values[2];time=parseTime(values[3].split(".")[0]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();}else{var values=value.split(" ");switch(values.length){case 6:year=values[5];month=parseMonth(values[1]);dayOfMonth=values[2];time=parseTime(values[3]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();break;case 2:var values2=values[0].split("-");year=values2[0];month=values2[1];dayOfMonth=values2[2];time=parseTime(values[1]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();break;case 7:case 9:case 10:year=values[3];month=parseMonth(values[1]);dayOfMonth=values[2];time=parseTime(values[4]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();break;default:return value;}}
var pattern="";var retValue="";for(var i=0;i<format.length;i++){var currentPattern=format.charAt(i);pattern+=currentPattern;switch(pattern){case"ddd":retValue+=strDay(dayOfWeek);pattern="";break;case"dd":if(format.charAt(i+1)=="d"){break;}
if(String(dayOfMonth).length===1){dayOfMonth='0'+dayOfMonth;}
retValue+=dayOfMonth;pattern="";break;case"MMMM":retValue+=strLongMonth(month);pattern="";break;case"MMM":if(format.charAt(i+1)==="M"){break;}
retValue+=strMonth(month);pattern="";break;case"MM":if(format.charAt(i+1)=="M"){break;}
if(String(month).length===1){month='0'+month;}
retValue+=month;pattern="";break;case"yyyy":retValue+=year;pattern="";break;case"HH":retValue+=time.hour;pattern="";break;case"hh":retValue+=(time.hour==0?12:time.hour<13?time.hour:time.hour-12);pattern="";break;case"mm":retValue+=time.minute;pattern="";break;case"ss":retValue+=time.second.substring(0,2);pattern="";break;case"SSS":retValue+=time.millis.substring(0,3);pattern="";break;case"a":retValue+=time.hour>=12?"PM":"AM";pattern="";break;case" ":retValue+=currentPattern;pattern="";break;case"/":retValue+=currentPattern;pattern="";break;case":":retValue+=currentPattern;pattern="";break;default:if(pattern.length===2&&pattern.indexOf("y")!==0&&pattern!="SS"){retValue+=pattern.substring(0,1);pattern=pattern.substring(1,2);}else if((pattern.length===3&&pattern.indexOf("yyy")===-1)){pattern="";}}}
return retValue;}catch(e){return value;}}};}());}(jQuery));


/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
function SHA256(s){var chrsz=8;var hexcase=0;function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function S(X,n){return(X>>>n)|(X<<(32-n));}function R(X,n){return(X>>>n);}function Ch(x,y,z){return((x&y)^((~x)&z));}function Maj(x,y,z){return((x&y)^(x&z)^(y&z));}function Sigma0256(x){return(S(x,2)^S(x,13)^S(x,22));}function Sigma1256(x){return(S(x,6)^S(x,11)^S(x,25));}function Gamma0256(x){return(S(x,7)^S(x,18)^R(x,3));}function Gamma1256(x){return(S(x,17)^S(x,19)^R(x,10));}function core_sha256(m,l){var K=new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);var HASH=new Array(0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19);var W=new Array(64);var a,b,c,d,e,f,g,h,i,j;var T1,T2;m[l>>5]|=0x80<<(24-l%32);m[((l+64>>9)<<4)+15]=l;for(var i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(var j=0;j<64;j++){if(j<16)W[j]=m[j+i];else W[j]=safe_add(safe_add(safe_add(Gamma1256(W[j-2]),W[j-7]),Gamma0256(W[j-15])),W[j-16]);T1=safe_add(safe_add(safe_add(safe_add(h,Sigma1256(e)),Ch(e,f,g)),K[j]),W[j]);T2=safe_add(Sigma0256(a),Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,T1);d=c;c=b;b=a;a=safe_add(T1,T2);}HASH[0]=safe_add(a,HASH[0]);HASH[1]=safe_add(b,HASH[1]);HASH[2]=safe_add(c,HASH[2]);HASH[3]=safe_add(d,HASH[3]);HASH[4]=safe_add(e,HASH[4]);HASH[5]=safe_add(f,HASH[5]);HASH[6]=safe_add(g,HASH[6]);HASH[7]=safe_add(h,HASH[7]);}return HASH;}function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz){bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(24-i%32);}return bin;}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;}function binb2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&0xF);}return str;}s=Utf8Encode(s);return binb2hex(core_sha256(str2binb(s),s.length*chrsz));}



/****************************/
//===========================/
// END Dependencies


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
    log('======Error:=====')
    log(msg)
    log(url + ":" + line)    
    log('======Error:=====');
        
    // report error
    try {
        //reportError(msg, url, line)
    } catch(err) {

    }
        
    // suppress browser exception, return true in production environment
    return true;   
};

/*
every function will have the .args() function which will alow you to call it with a key/pair object of named arguements
@args: a key/value map of it's arguments and the values you want to pass
eg: for the function
	function showAlert(msg, console_msg) {
		console.log(console_msg)
		alert(msg)
	}
	you would call
	showAlert.args({console_msg: "hi I'm in the console", msg: "Hi I'm an alert"})
	it doesn't matter how you order the arguments object.

*/
Function.prototype.args = function(args) {		
	// clone args, as it may contain a reference to an actual object somewhere
	args = $.extend(true, {}, args)

	// get an array of arguments the function expects
	var function_string = this.toString() + ";";
	var function_name = function_string.match(/[a-zA-Z]+(?=\()/)[0]
	var arg_string = function_string.match(/\([^)]*\)/)[0]
	arg_string = arg_string.substring(1, arg_string.length-1).replace(/[ ]*/g, "")
	
	var arg_array = arg_string.split(',')		

	// create the function call string
	function_string += function_name + "(";
	// loop through arguments the function expects and fetch them from the args object passed into args
	for(var i=0; i<arg_array.length; i++) {
		if(i > 0) {
			function_string += ","
		}
		var arg = args[arg_array[i]] //note: we want to preserve undefined if it is and pass it along
		if(typeof arg !== 'function') {
			arg = JSON.stringify(arg);
		}
		function_string += arg

		// delete the reference to this arg from args
		delete args[arg_array[i]];
	}
	// loop through the remaining args passed to args, and insert them as unnamed variables to the function
	for(var j in args) {
		function_string += ",";
		var arg = args[j]
		if(typeof arg !== 'function') {
			arg = JSON.stringify(arg);
		}
		function_string += arg
	}
	function_string += ");"

	// create and run the new function	
	new Function(function_string)()	
}

/****************************/

// Fin.js
//===========================/
/****************************/


function HighFin(config) {

// front-end fin object
fin = {};

fin = {
	// settings and defaults
	settings: $.extend(true, {}, {
		msg: "hi there this is default",
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
				'async_templates': ['', ''], // templates rendered by calling the fin.util.render() function from within another template or that are otherwise needed by this page after rendering. 
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
		domain: window.location.protocol.toString() + "//" + window.location.hostname.toString(),
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
	util: { // highfin utilities
		log: log, // shortcut for consistency with the backend
		// function for getting a dot notation path of an object
		// @obj_path: String, dot notation String eg: "data.meta.current_section.name"
		// @get_key: Boolean, 
					// if true; will return the key for a foreign key value, eg: returns 1 from fin.util.getDot("data.meta.current_section", true) where the value of data.meta.current_section is "__data.sections.1"
					// if false; will delete the key/value from the local data model. so fin.util.getDot("data.meta.current_section", false) will delete data.sections[1], where the value of data.meta.current_section is "__data.sections.1"
		// pass boolean true as the get_key, to parse the last foreign key for the value of the id
		// so data.meta.current_section, where current_section = '__data.section.1', passing true as the object will return "1"
		// @new_value used for assigning a new value to the final value
		getDot: function(obj_path, get_key, object, new_value){

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
					
					if(i === path.length - 1 && new_value !== undefined) {
						value[path[i]] = new_value
					}

					if(typeof value[path[i]] === 'undefined') {
						// if it's the end of the chain and new_value is set, then set a new value
							
							value[path[i]] = {};
						
					} else if (value[path[i]] === null) {
						
						return null
					}
						
						
					if(typeof value[path[i]] === 'string' && value[path[i]].substr(0, 2) === "__") {
						
						//value[path[i]] = value[path[i]].substr(2, value[path[i]].length - 2)
						
						// is a foreign key
						if((i+1) == path.length && get_key === true) {
							// we only want the foreign_key itself
							if(value[path[i]] !== null) {
								return getID(value[path[i]])
							} else {
								return ""
							}

						} else if((i+1) == path.length && get_key === false) {
							// we're deleting the object to which the foreign key refers to
							var parent_path = value[path[i]].split('.');
							var key = parent_path.pop();
							value = fin.util.getDot(parent_path.join('.'))
							delete value[key]
							return
						} else {
							// do lookup

							value = fin.util.getDot(value[path[i]]);
						}
					} else {
						// even if it's not a foreign key, we may still want to delete it
						if ((i+1) == path.length && get_key === false) {
							delete value[path[i]]
							return
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
			// TODO: this should be a global function of "approved variables"
			var path = obj_path.split('.');
			if(object === undefined) {
				switch(path[0]) {
					case 'data':
						object = data;
						break;
					case 'bindings':
						object = bindings;
						break;
					case 'navigate':
						object = navigate;
						break;
					default:
						object = data
				}
			}
			fin.util.getDot(obj_path, null, data, new_value)
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
			for(var i=0; i<key_to_path.length; i++) {
				key_to_path[i].replace(/^s$/, 'student').replace(/^p$/, 'professor')
			}
			key_to_path = key_to_path.join('/') 
			if(typeof _gaq !== 'undefined') {
				_gaq.push(['_trackPageview', key_to_path]);
			}

			

			//clear field errors
			$('input').parent().removeAttr('original-title')
			$('.tipsy').hide()


			if(fin.settings.navigate[key] === undefined) {
				log(key + ": The page you were navigating to has not been implemented yet.")
				return;
			}


			// run before functions
			if(fin.settings.navigate[key]['before_func'] !== undefined) {
				for (var i = 0; i < fin.settings.navigate[key]['before_func'].length; i++) {
					var before_func_obj = fin.settings.navigate[key]['before_func'][i]
					before_func_obj[0].args(before_func_obj[1])
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
								fin.util.render('#' + fin.settings.containers[c], template_name, false)
							} else {
								log('Template does not exist: ' + fin.settings.navigate[key][fin.settings.containers[c]][template_name])
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
					after_func_obj[0].args(after_func_obj[1])
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
			fin._meta.hashbang = fin.util.removeEndSlashes(fin._meta.hashbang);
			//split
			segments = fin._meta.hashbang.split("/");
			
			// try load route
			// search routes for match, to determine page to render
			// if hashbang is #!/news/search, will try `news/search`, and then `news` in fin.settings.routes until it finds a match
			var match_bang = fin._meta.hashbang;
			for(var i=0; i < segments.length; i++) {
				
				if(typeof fin.settings.routes[match_bang] !== 'undefined') {
					fin.util.nav(fin.settings.routes[match_bang]);
					return;
				} else {
					//log('route ' + match_bang + ' not found')
				}
				match_bang = match_bang.replace(/\/[^\/]*$/, "")
			}
			
			// show default screen unless user just navigated somewhere via url
			//if(fin._meta.last_nav() === "" && typeof fin.settings.default_page !== 'undefined') {		
				fin.util.nav(fin.settings.default_page)		
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

			fin.util.getData(params, function(){				
				// Trigger the event (useful on page load).
  				$(window).hashchange();								
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
			$.post(fin._meta.domain+"/0", params, function(res, status, xhr) {
					
					// if there are templates, then process the into locally cached templates
					for(var i in res.templates) {
						try {
							fin.util.cacheTemplate(i, $.parseJSON(res.templates[i]))
						} catch(err) {
							log('Error: parsing template: ' + i + ' ( ' + err.message + " )") 
							if(err.message.match(/ILLEGAL/)) {
								log("Solve Error: make sure you're using backticks for strings correctly, double quotes outside of a backtick or single quote delineated string, are ILLEGAL tokens")	
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
						fin.util.nav('login')
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
					if(typeof res.meta.onSuccess !== "undefined" && typeof fin.util.getDot(res.meta.onSuccess) === "function") {
						// dev is handling this form's success
						fin.util.getDot(res.meta.onSuccess)(res)
					} else {
						// let user know if they specified an onSuccess handler for the form, but forgot to define it.
						if(typeof res.meta.onSuccess !== "undefined" && typeof fin.util.getDot(res.meta.onSuccess) !== "function") {
							log(res.meta.onSuccess + "() is not defined. Using global onSuccess handler")
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
				  	if(typeof res.meta.onError !== "undefined" && typeof fin.util.getDot(res.meta.onError) === "function") {
				  		// dev is handling this form's error
				  		fin.util.getDot(res.meta.onError)(res)

				  	} else {
				  		// let user know if they specified an onError handler for the form, but forgot to define it.
				  		if(typeof res.meta.onError !== "undefined" && typeof fin.util.getDot(res.meta.onError) !== "function") {
							log(res.meta.onError + "() is not defined. Using global onError handler")
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
				
				$('.tipsy').hide()

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
		loginResultHandler: function(res) {
			nav('login_success');
			login(res)
		},
		// takes a server timestamp as argument, and returns the XDate equivalent using the offset calculated at loginn
		GETaslocaltime: function(xdate) {
			return new XDate(xdate).addMilliseconds(data.meta.time_diff)
		},
		// takes a server timestamp and returns the time since or until eg: "5 mins ago", eg: "in 5 mins"
		// note: this function is intentionally verbose in anticipation of a great multitude of changes to copy and output
		GETasprettytime: function(xdate) {
			var currentDate = new XDate()
			var targetDate = data.util.GETaslocaltime(xdate) // server time converted to local time
			var tense = ''
			var before = ''
			var after = ''
			var output = ""
			var s = ""

			// calculate time difference
			var diff = {
				millisecond: currentDate.diffMilliseconds(targetDate),
				seconds: currentDate.diffSeconds(targetDate),
				minutes: currentDate.diffMinutes(targetDate),
				hours: currentDate.diffHours(targetDate),
				days: currentDate.diffDays(targetDate),
				weeks: currentDate.diffWeeks(targetDate),
				months: currentDate.diffMonths(targetDate),
				years: currentDate.diffYears(targetDate)
			}
			
			// round
			if(diff.millisecond > 0) {
				// is in the future
				tense = "next"
				before = "in "
				for (var item in diff) {
					diff[item] = Math.floor(diff[item])
				}
			} else {
				tense = "last"
				after = " ago"
				for (var item in diff) {
					diff[item] = Math.ceil(diff[item]) * -1
				}
			}

			if(diff.years !== 0) {
				if (diff.years === 1) {
					//" next year", or "last year"
					return tense + " year"
				} else if(diff.years > 1) {
					s = "s"
				} 
				// "in 5 year(s)", or "5 year(s) ago"
				output = before + diff.years + " year" + s + after

			} else if(diff.months !== 0) {
				if (diff.months === 1) {
					//" next month", or "last month"
					return tense + " month"
				} else if(diff.months > 1) {
					s = "s"
				} 
				// "in 5 month(s)", or "5 month(s) ago"
				output = before + diff.months + " month" + s + after
			} else if(diff.weeks !== 0) {
				if (diff.weeks === 1) {
					//" next week", or "week year"
					return tense + " week"
				} else if(diff.weeks > 1) {
					s = "s"
				} 
				// "in 5 week(s)", or "5 week(s) ago"
				output = before + diff.weeks + " week" + s + after
			} else if(diff.days !== 0) {
				if (diff.days === 1) {
					//"yesterday", or "tomorrow"
					if(tense === "last") {
						return output = "yesterday"
					} else {
						return output = "tomorrow"
					}
				} else if(diff.days > 1) {
					s = "s"
				} 
				// "in 5 day(s)", or "5 day(s) ago"
				output = before + diff.days + " day" + s + after
			} else if(diff.hours !== 0) {
				if (diff.hours === 1) {
					//"in an hour", or "an hour ago"
					diff.hours = "an"
				} else if(diff.hours > 1) {
					s = "s"
				} 
				// "in 5 hour(s)", or "5 hour(s) ago"
				output = before + diff.hours + " hour" + s + after
			} else if(diff.minutes !== 0) {
				if (diff.minutes === 1) {
					//"in a minute", or "a minute ago"
					diff.minutes = "a"
				} else if(diff.minutes > 1) {
					s = "s"
				} 
				// "in 5 minute(s)", or "5 minute(s) ago"
				output = before + diff.minutes + " minute" + s + after
			} else if(diff.seconds !== 0) {
				if (diff.seconds === 1) {
					//"in a moment", or "a moment ago"
					diff.seconds = "a"
				} else if(diff.seconds > 1) {
					s = "s"
					diff.seconds = "a few"
				} 
				// "in mere moments(s)", or "moment(s) ago"
				output = before + diff.seconds + " moment" + s + after
			} else {
				output = "now"
			}


			return output
		},
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
	        var rootNode = fin.ce('div', {class:'block block_'+selector}, fragment)
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
	        		log("*")
	        		log("Error: Template ( " + template_name + " ) not found,")
	        		log("Solve Error: there may be an error within the template that will be printed after this,")
	        		log("Solve Error: if not, specify " + template_name + " within the navigate object when instantiating HighFin, either under a container or the async_templates array for any page so that it gets requested from the server at runtime.")
	        		log("*")
	        	} else {
	        		log("*")
	        		log("Error: Template ( " + template_name + " ) not found,") 
					log("Solve Error: create "+ template_name.replace(/.*_/, "") +".js OR "+template_name.replace(/.*_/, "")+".html in ( " + file_path.replace(/[a-z_\.]*$/, "").replace(/[a-z]*\/\.\.\//, "") + " )")
					log("*")
	        	}
	        }
			setTimeout(function(){ 
				fin.util.attachEventListeners();
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
			tmpl = tmpl.replace(/exports\.([^ \r\n]+)[ ]*= function[ ]*([^(]*)\(/g, "fin.util.getDot(`fin.fn."+dot_location_midpath+".$1`); fin.fn."+dot_location_midpath+".$1 = function $2(")
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
				log(template_string)
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
				scrpt = "fin.ce(`script`, {type: `text/javascript`}, rootNode, `setTimeout(function(){ try{ " + scrpt + " }catch(err){log('Error Rendering: "+template_location+" (' + err.message + ')')} },0);`);";
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
					"line_array[1] = parseInt(line_array[1], 10) -"+num_lines_remove+"; "+ 
					"line = line_array.join(':');"+
					"log('Error Rendering: "+template_location+" (' + err.message + ')' + line);}"; 

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
				e.setAttribute('action', '/0')
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
			// date & local timezone helper
			// TODO replace jquery-dateFormat with xDate
			@datestamp - UTC timestamp produced by new Date().toString();
			@format - string format see https://github.com/phstc/jquery-dateFormat
		*/
		formatDate: function(datestamp, format) {
			if(format == undefined) {
				format = "ddd, MMMM dd, yyyy";
			}
			if(format == "datestamp") {
				format = "dd/MM/yyyy";	
			}
			return $.format.date(new Date(datestamp).toString(), format);
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
	    	@list: [string] or [object] or [array] like 'fin.data.news.posts' = {338293: {}, 23894723: {}}, uses getDot() function to retrieve the object
	    	@sort_paths: [array] of [strings] indicating the dot path within the object representing nodes to compare for sort,
	    				specify multiple sort_paths listed by priority.
	    				[['object.comments.author', 'desc']]
			@direction: [string] 'asc' or 'desc'
	    */
	    sort: function(list, sort_paths) {
	    	// if list is a string fetc the referenced object
	    	if(typeof list === "string") {
	    		list = fin.util.getDot(list);	
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
	        		var _a = fin.util.getDot(sort_paths[i][0], null, a);
	        		var _b = fin.util.getDot(sort_paths[i][0], null, b);
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
	                            searchable_content += fin.util.getDot(search_paths[l][j], null, tree[i]);
	                        } else {
	                            must_matched_searchabled_content += fin.util.getDot(search_paths[l][j], null, tree[i])
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

	            


	           
	          
	        
	        //fin.util.getDot('data.meta.current_section.apps.multichoice')['filtered_questions']
	        setDot(cache, sorted_tree)
	       
	        return sorted_tree
	        

	    }

	}


}
// refine HighFin object
// shortcuts to minimize typing
$.extend(true, fin, {
	ce: fin.util.createElement,
	ach: fin.util.appendChild,
	log: fin.util.log,
})

fin._meta.pathname = fin.util.removeEndSlashes(window.location.pathname.toString())	

}

// ajax form capture

// @parseValidate has to be a string reference to a function that returns true or false, it is passed the jquery selected form object
$('form[ajaxform]').live('submit', function(e) {
	var form = $(e.target);

	if(arguments[1] === true) {
		var validator = fin.util.getDot(form.attr('parseValidate'))
		if(typeof validator === "function") {
			//fin.util.log('no! ' + validator(form))
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
			log("Error: " + err.message)
			log('Solve Error: If submit is not a function, do not set the name or id of any inputs in your ajaxform "submit"')
		}
	},500)

	return false
})




$(document).ready(function(){
	window.onbeforeunload = fin.util.onbeforeunload;
  	
  	$(window).hashchange(fin.util.onHashchange)

  	// cache embedded templates
  	$("script[type='text/template']").each(function(i) {
  		fin.util.cacheTemplate($(this).attr('id').replace(/template_/, ""))
  	})

  	// fetch templates * will also trigger hashchange event
  	fin.util.fetchTemplates()

	fin.util.loading(false)

	
	
});

















