describe("A suite", function() {
  beforeEach(function(){
  	Fin();
  });
  
  afterEach(function(){
  	fin = void 0;
  });
  
  it("this should fail", function() {
    expect(fin).toBe(fin);
  });

  
});