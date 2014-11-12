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
;(function($, Fin) {

if(typeof Fin.prototype.plugins === 'undefined') {
	Fin.prototype.plugins = {};
}

$.extend(true, Fin.prototype.plugins, {
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
})

})(jQuery, Fin);

