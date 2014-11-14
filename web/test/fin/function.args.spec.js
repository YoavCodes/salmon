describe("Function.prototype.args", function() {
	
	function test(one, two, three) {
		var str = ""+one+two+three;
		if(arguments.length === 5) {
			str += arguments[3] + arguments[4];
		}
		return str
	}

	beforeEach(function(){
		Fin();		
	});

	afterEach(function(){
		fin = void 0;
	});

	it("should allow using named arguments with a function", function() {
		var output = test.args({one: "1", two: "2", three: "3"});				
		expect(output).toBe("123");
	});

	it("in any order", function() {
		var output = test.args({two: "2", one: "1", three: "3"});				
		expect(output).toBe("123");
	});

	it("expected params without a matching key should be undefined", function() {
		var output = test.args({one: "1", three: "3"});				
		expect(output).toBe("1undefined3");		
	});

	it("unnamed params should be passed on in the same order", function() {
		var output = test.args({two: "2", one: "1", three: "3"}, "4", "5");				
		expect(output).toBe("12345");
	});

});