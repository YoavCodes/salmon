/**
 Jasmine Reporter that outputs test results to the browser console.
 Useful for running in a headless environment such as PhantomJs, ZombieJs etc.

 Usage:
 // From your html file that loads jasmine:
 jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
 jasmine.getEnv().execute();
*/

(function(jasmine, console) {
  if (!jasmine) {
    throw "jasmine library isn't loaded!";
  }

 

  var ANSI = {}
  ANSI.color_map = {
      "green" : 32,
      "red"   : 31,
      "teal"  : 36
  }

  ANSI.colorize_text = function(text, color) {
    var color_code = this.color_map[color];
    return "\033[" + color_code + "m" + text + "\033[0m";
  }

  var indent = function(str, amount) {
    var indentation = "";
    var amount = amount || 2;

    for(var i = 0; i < amount; i++) {
      indentation += " ";
    }

    return indentation + str;
  }

  var ConsoleReporter = function(trace, format) {
    if (!console || !console.log) { throw "console isn't present!"; }
    this.status = this.statuses.stopped;
    this.finished = false;

    this.trace = trace;
    this.format = format;
  };
  var proto = ConsoleReporter.prototype;

  proto.statuses = {
    stopped : "stopped",
    running : "running",
    fail    : "fail",
    success : "success"
  };

  proto.reportRunnerStarting = function(runner) {
    this.status = this.statuses.running;
    this.start_time = (new Date()).getTime();

    var startMessage = '';

    if (this.format == 'doc') {
      startMessage = 'Specs:';
    }

    this.log(startMessage);
  };

  proto.reportRunnerResults = function(runner) {
    var results = runner.results();
    var failed = results.failedCount;
    var specs = runner.specs();
    var spec_str = specs.length + (specs.length === 1 ? " spec, " : " specs, ");
    var fail_str = failed + (failed === 1 ? " failure" : " failures");
    var color = (failed > 0)? "red" : "green";
    var dur = (new Date()).getTime() - this.start_time;

    if (failed) {
      this.log("\n\r");
      this.log("Failures:");
      this.log("\n\r");
    }

    var failCount = 0;

    for(var i = 0; i < specs.length; i++) {
      var spec = specs[i];

      if (spec.results().passed()) {
        continue;
      }

      failCount++;


      var resultText = failCount + ') ' + spec.getFullName();
      var indentLevel = failCount > 9 ? 1 : 2;
      this.log(indent(resultText, indentLevel));
      this.log("\n\r");
      var items = spec.results().getItems()
      for (var j = 0; j < items.length; j++) {
        var message = items[j].trace.stack || items[j].trace.message;

        if (message) {
          var lines = message.split("\n\r");

          if (this.trace) {
            this.log(indent(lines.shift(), 5), 'red');
            this.log(indent(lines.join("\n\r   "), 3), 'teal');
          }
          else {
            this.log(indent(lines[0]+"\n\r", 5), 'red');
          }
        }
      }

     // this.log("\n\r");
    }

    this.log("\n\r");
    this.log("Finished in " + (dur/1000) + " seconds \n\r");
    this.finished = true;
    this.log(spec_str + fail_str + "\n\r \n\r", color);
    

    this.status = (failed > 0)? this.statuses.fail : this.statuses.success;
  };

  proto.reportSuiteResults = function(suite) {
    var self = this;

    if (suite.parentSuite) {
      return false;
    }

    var logSpecs = function(specs, level) {
      var level = level || 0;

      specs.forEach(function(spec) {
        var color = spec.results().passed() ? 'green' : 'red';
        self.log(indent('- ' + spec.description, 4 + level), color);
      });
    };

    var logSuite = function(suite, level) {
      var level = level || 0;

      
      self.log(indent(suite.description, 4 + level));

      logSpecs(suite.specs(), level + 2);

      suite.suites().forEach(function(suite, index) {
        logSuite(suite, level + 2);
      });
    }

    if (this.format == 'doc') {
      logSuite(suite);
    }
  };

  proto.log = function(str, color) {
    var text = (color != undefined)? ANSI.colorize_text(str, color) : str;
    console.log(text)
  };

  jasmine.ConsoleReporter = ConsoleReporter;
})(jasmine, console);