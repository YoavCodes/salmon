describe("a suite", function(){
	beforeEach(function(){
		require("../../salmon.js")
	});

	it("should pass", function(){
		tail.test = "hi"
		expect(typeof tail).toBe('object')
	})

	it("should pass", function(){
		expect(tail.test).toBe("hi");
		expect(typeof tail).toBe('object')
	})
})