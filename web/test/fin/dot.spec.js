describe("fin.dot", function() {

	beforeEach(function(){
		Fin();	

		fin.data = {
			users: [
				{
					username: "yoav",
					email: "yoav@something.com",
					occupation: "software engineer"
				},
				{
					username: "Bob Sagget",
					email: "bob@something.com",
					occupation: "House filler"
				}
			],
			sections: [
				{
					name: "section 0",
					type: "radio"
				},
				{
					name: "section 1",
					type: "div"
				}
			],
			meta: {
				current_user: "__fin.data.users.1",
				current_day: "__fin.data.meta.day",
				day_alias: "__fin.data.meta.current_day",
				day: "Sunday"

			}
		}	
	});

	afterEach(function(){
		fin = {};
	});
	


	it("should fetch the value at the given location", function() {
		var day = fin.dot("fin.data.meta.day");
		expect(day).toBe("Sunday");

	});

	it("should follow foreign keys to a string value", function() {
		var current_day = fin.dot("fin.data.meta.current_day");
		expect(current_day).toBe("Sunday");
	});

	it("should follow foreign keys recursively", function() {
		var day_alias = fin.dot("fin.data.meta.day_alias");
		expect(day_alias).toBe("Sunday");
	});

	it("should create parents of an accessed child object if they don't already exist", function(){
		var new_object = fin.dot("fin.data.test.new.key.functionality");
		expect(new_object).toEqual({});
	})

	it("should be able to retrieve the key instead of the value it references", function() {
		var current_day_key = fin.dot("fin.data.meta.current_day", true);
		expect(current_day_key).toBe("__fin.data.meta.day");
	})

	it("should be able to do lookups on any arbitrary object", function(){
		var obj = {
			any: {
				dot: {
					path: "works"
				}
			}
		};
		var lookup = fin.dot("any.dot.path", null, obj);
		expect(lookup).toBe("works");
	})

	it("should allow shorthand syntax when specifying an arbitrary object", function(){
		var obj = {
			any: {
				dot: {
					path: "works"
				}
			}
		};
		var lookup = fin.dot("any.dot.path", obj);
		expect(lookup).toBe("works");
	})

	it("should be able to follow foreign keys in an arbitrary object that reference objects attached to window", function() {
		window.test_obj = {
			path: {
				here: "Monday"
			}
		}
		var obj = {
			fks: {
				path: "__test_obj.path.here"
			}
		};
		var lookup_fk = fin.dot("fks.path", null, obj);
		expect(lookup_fk).toBe("Monday");
	})

	it("should delete an key/value", function() {
		var obj = {
			any: {
				dot: {
					path: "works"
				}
			}
		};
		expect(obj.any.dot.path).toBe("works")
		
		fin.dot("any.dot.path", false, obj); // delete key/value
		
		expect(obj.any.dot.path).toBeUndefined() 
	})

	it("should follow foreign keys deleting the final key/value as well as all foreign keys in the lookup chain", function(){
		window.week = {
			days: {
				mon: "Monday"
			},
			meta: {
				today: "__week.days.mon"
			}
		}
		var obj = {
			alias: {
				current_day: "__week.meta.today"
			}
		};

		expect(obj.alias.current_day).toBe("__week.meta.today");
		expect(week.meta.today).toBe("__week.days.mon");
		expect(week.days.mon).toBe("Monday");
		
		fin.dot("alias.current_day", false, obj); // delete window.week.days.mon via two foreign key hops

		expect(obj.alias.current_day).toBe("");	// foreign key should be changed to empty string ie: unlinked
		expect(week.meta.today).toBe(""); // foreign key on 2nd hop should be changed to empty string ie: unlinked
		expect(week.days.mon).toBeUndefined(); // actual value linked to should be deleted from it's parent object
	})

	it("should set the value of a given key", function(){
		expect(fin.data.setobj).toBeUndefined();

		fin.dot("fin.data.setobj", null, null, "test");

		expect(fin.data.setobj).toBe("test");
	}) 

	it("should change the value of a given key on an arbitrary object", function(){
		var obj = {
			any: {
				path: "here"
			}
		}
		fin.dot("any.path", null, obj, "test");
		expect(obj.any.path).toBe("test")
	})

	it("should create a path if it doesn't already exist and set the value of the key created", function(){
		fin.dot("brand_new.obj.path", null, null, "toast");
		expect(brand_new.obj.path).toBe("toast")
	})

	it("should follow the foreign key chain setting the value of the object at the end of the chain", function() {
		window.tmp_obj = {
			any: {
				path: "peanut butter"
			}
		}

		var obj = {
			any: {
				fks: {
					fk: "__tmp_obj.any.path"
				}
			}
		}
		expect(tmp_obj.any.path).toBe("peanut butter")

		fin.dot("any.fks.fk", null, obj, "jam")
		
		expect(obj.any.fks.fk).toBe("__tmp_obj.any.path") // foreign key should be unchanged
		expect(tmp_obj.any.path).toBe("jam")
	})

	it("should handle foreign keys at any part of the dot notation string", function() {
		var obj = {
			any: {
				dot: {
					path: "__fin.data.meta.current_user.username"
				}
			}
		}
		var current_user_username = fin.dot("any.dot.path", null, obj)
		expect(current_user_username).toBe("Bob Sagget")
	})


	

});