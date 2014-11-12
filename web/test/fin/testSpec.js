describe("A suite", function() {
  beforeEach(function(){
  	Fin();
  });
  
  afterEach(function(){
  	fin = void 0;
  });

  it("contains spec with an expectation", function() {
    expect(fin).toBe(fin);
  });

});