/* extras.fin.js v1.0.0
 * Copyright 2012-2013, Yoav Givati ( hello@yoavgivati.com )
 * http://highf.in ~ http://chalkhq.com
 *
 * Released under the MIT license
 * http://highf.in/license
 *
 * 
 * Updated: 15-11-2014
 */
;(function($, fin) {

if(typeof fin.prototype.plugins === 'undefined') {
	fin.prototype.plugins = {};
}

$.extend(true, fin.prototype.plugins, {
	/*
		// date & local timezone helper
		// TODO replace jquery-dateFormat with xDate
		@datestamp - UTC timestamp produced by new Date().toString();
		@format - string format see https://github.com/phstc/jquery-dateFormat
	*/
	/*formatDate: function(datestamp, format) {
		if(format == undefined) {
			format = "ddd, MMMM dd, yyyy";
		}
		if(format == "datestamp") {
			format = "dd/MM/yyyy";	
		}
		return $.format.date(new Date(datestamp).toString(), format);
	}*/
	// note: app code not critical for fin.js.. save it in a blog post or something
	// takes a server timestamp as argument, and returns the XDate equivalent using the offset calculated at loginn
	/*GETaslocaltime: function(xdate) {
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
	},*/
	/* 
        See if a checkbox is checked or not  
        @element = [String] element's css selector
        returns: [Boolean] true or false
    */
   /* is_checked: function (element) {
        return $(element + ":checked").length > 0;
    },*/

    /* 
        returns a truncated string, and appends an ellipsis  
        @str = [String] the string to truncate
        @len = [int] the displayed length of the concatenated output
        returns: [String] concatenated result
    */
    /*truncate: function (str, len) {
        var _len = len - 3;
        if(str.length > _len) {
            str = $.trim(str.substring(0, _len)) + '&hellip;';
        }
        return str;
    },*/
    /*
    // counts the keys in an object
    */
    /*countKeys: function(obj, noun) {
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
    },*/


    /*
    // converts newline characters to <br />
    */
    /*convertNewlines: function(str) {
        str = str.replace(/\n/g, '<br />');
        return str
    },*/

    /*
    // returns first argument if plural, or second argument if singular
    */
    /*pluralize: function(quantity, plural, singular) {
        if(quantity == 0 || quantity > 1) {
            return plural
        } else {
            if(singular !== undefined) {
                return singular
            } else {
                return ""
            }
        }
    },*/

    /*
    // returns the contraction for an integer as a string. eg: 3 becomes 3rd
    */
    /*getIntegerContraction: function(integer){
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
    },*/

    /* 
    // converts 16:00 to 4pm
    */
    /*convertFromMilitaryTime: function(military_time) {
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

    },*/
    /*
    // show modal alert
        @message: html for the message of the alert
        @buttons: array of buttons "ok", "cancel", "continue" and corresponding click events as strings [["ok", "alert('what')"]]
        leave arguments blank to clear alert
    */
    /*alert: function(message, buttons) {
        if(message === undefined && buttons === undefined) {
            // hide alert
            $('#alert_content').html('').css('display', 'none');
            return;
        }
        
        $('#alert_content').html( _.template( $('#alert_modal').html(), {message: message, buttons: buttons} ) ).css('display', 'block')
        

        setTimeout(function(){
            $('#alert_content .content').removeClass('before')
        }, 10)
        
    },*/
    /*
		strip html tags
		note: if b is specified as an allowable tag, it will preserve <b></b> tags, but will remove tag params ie: <b onclick="javascript()">bold text</b> 
				will be converted into <b>bold text</b>, this prevents javascript injection in allowable tags
		@input - html string
		@allowed "b,i", comma separated string of alloweable tags
	*/
	/*strip_tags: function(input, allowed) {
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
	}*/
})

// note: we're passing in the fin.init constructor here. the rest of the fin object shouldn't exist yet.
})(jQuery, fin.init);

