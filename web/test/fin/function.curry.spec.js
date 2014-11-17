describe("Function.prototype.curry", function() {
	

		function test(one, two, three) {
			var str = ""+one+two+three;
			if(arguments.length > 3) {
				for(var i=3; i<arguments.length; i++) {
					str += arguments[i];
				}
			}
			return str
		}
		
		Fin();		
	

	it("should allow using named arguments with a function", function() {
		var output = test.curry({one: "1", two: "2", three: "3"})();
		expect(output).toBe("123");
	});

	it("in any order", function() {
		var output = test.curry({two: "2", one: "1", three: "3"})();
		expect(output).toBe("123");
	});

	it("expected params without a matching key should be undefined", function() {
		var output = test.curry({one: "1", three: "3"})();
		expect(output).toBe("1undefined3");		
	});

	it("unnamed params should be passed on in the same order", function() {
		var output = test.curry({two: "2", one: "1", three: "3"}, "4", "5")();
		expect(output).toBe("12345");
	});

	it("currying a curried function should replace only specified named params", function() {
		var x = test.curry({one: "1", two: "2", three: "3"});
		var output = x.curry({two: "9"})();
		expect(output).toBe("193");
	});

	it("currying a curried function using unnamed params should concat unnamed params from each curry", function(){
		var x = test.curry({one: "1", two: "2", three: "3"}, 4, 5);
		var output = x.curry({}, 6, 7)();
		expect(output).toBe("1234567")
	});

});