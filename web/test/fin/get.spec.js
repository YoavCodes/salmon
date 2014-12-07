describe("fin.dot", function() {

	beforeEach(function(){
		fin.init();	
		fin.data = {
		    users: {
		        1: {
		            name: "Yoav",
		            email: "hello@yoavgivati.com",
		            friends: 20,
		            account_type: "basic",
		            id: 1
		        },
		        2: {
		            name: "Bill",
		            email: "bill@gmail.com",
		            friends: 21,
		            account_type: "basic",
		            id: 2
		        },
		        3: {
		            name: "Fred",
		            email: "fred@gmail.com",
		            friends: 19,
		            account_type: "admin",
		            id: 3
		        },
		        4: {
		            name: "Jamie",
		            email: "jamie@gmail.com",
		            friends: 2,
		            account_type: "basic",
		            id: 4
		        },
		        5: {
		            name: "Maddy",
		            email: "maddy@gmail.com",
		            friends: 200,
		            account_type: "admin",
		            id: 5
		        },
		        6: {
		            name: "Francine",
		            email: "francine@gmail.com",
		            friends: 4500,
		            account_type: "manager",
		            id: 6
		        }
		    },
		    posts: {        
		        1: {
		            title: "post 1",
		            content: "blah lorum ipsum post one relevant",
		            author: "__fin.data.users.1",
		            custom_sort: 8,
		            comments: [
		                {
		                    author: "__fin.data.users.1",
		                    comment: "commented on my own post"
		                },
		                {
		                    author: "__fin.data.users.6",
		                    comment: "I'm an admin, this is a great post!"
		                }
		            ]
		        },
		        2: {
		            title: "post 2",
		            content: "blah ipsum lorum ipsum ipsum post two relevant relevant",
		            author: "__fin.data.users.3",
		            custom_sort: 5,
		            truthy_test: 1,
		            comments: [
		                {
		                    author: "__fin.data.users.4",
		                    comment: "commented on my own post"
		                },
		                {
		                    author: "__fin.data.users.6",
		                    comment: "I'm an admin, this is another great post!"
		                }
		            ]
		        },
		        3: {
		            title: "post 3",
		            content: "blah lorum ipsum ipsum post three relevant relevant relevant",
		            author: "__fin.data.users.1",
		            custom_sort: 5,
		            truthy_test: 0,
		            comments: [
		                {
		                    author: "__fin.data.users.1",
		                    comment: "commented on my own post"
		                },
		                {
		                    author: "__fin.data.users.6",
		                    comment: "I'm an admin, this is a great post!"
		                }
		            ]
		        }
		    }

		};
	});

	it("should fetch all the objects", function() {
		var x = fin.get('fin.data.posts').sort()
		expect(x.length).toBe(3);
	});

	/* filters */
	it("should filter for strict equality", function() {
		var x = fin.get('fin.data.posts').where('title').is('post 2').sort()
		expect(x.length).toBe(1);
		expect(x[0].title).toBe("post 2");
	});

	it("should filter for truthy values", function() {
		// truthy
		var x = fin.get('fin.data.posts').where('truthy_test').truthyFalsey(true).sort()
		expect(x.length).toBe(1);
		expect(x[0].title).toBe("post 2");
		// falsey
		var y = fin.get('fin.data.posts').where('truthy_test').truthyFalsey(false).sort()
		expect(y.length).toBe(1);
		expect(y[0].title).toBe("post 3");
	});

	it("should filter a string for string or regexp matches", function() {
		var x = fin.get('fin.data.posts').where('content').contains('ipsum').sort()
		expect(x.length).toBe(3);
		expect(x[0].title).toBe("post 2"); // post two has 2 ipsum occurances, should be first

		var y = fin.get('fin.data.posts').where('content').contains(/ipsum/g).sort()
		expect(y.length).toBe(3);
		expect(y[0].title).toBe("post 2"); // post two has 2 ipsum occurances, should be first
	});

	it("should allow passing in custom filter functions", function() {
		var custom_filter_function = function(prop, val) {
			if(prop === val) {
				return 1
			} else {
				return false
			}
		}

		var x = fin.get('fin.data.posts').where('title').compare('post 2', custom_filter_function).sort()
		expect(x.length).toBe(1);
		expect(x[0].title).toBe("post 2");
	});

	/* misc */
	it("should fetch all the objects from a passed in object", function() {
		var x = fin.get('posts', fin.data).sort()
		expect(x.length).toBe(3);
	});

	it("should support dot notation referencing/key lookups", function() {
		var x = fin.get('fin.data.posts').where('author.name').is('Yoav').sort()
		expect(x.length).toBe(2);
	});

	/* and/or */
	it("should support multiple and filters", function() {
		var x = fin.get('fin.data.posts').where('author.name').is('Yoav').and('content').contains('three').sort()
		expect(x.length).toBe(1);
		expect(x[0].title).toBe("post 3");
	});

	it("should support multiple or filters", function() {
		var x = fin.get('fin.data.posts').where('author.name').is('Yoav').or('content').contains('two').sort()
		expect(x.length).toBe(3);		
	});

	it("should support multiple and/or filters", function() {
		var x = fin.get('fin.data.posts').where('author.name').is('Yoav').and('content').contains('three').or('content').contains('two').sort()
		expect(x.length).toBe(2);
		expect(x[0].title).toBe("post 3");
		expect(x[1].title).toBe("post 2");
	});

	/* sort */
	it("should sort matches based on relevance", function() {
		var x = fin.get('fin.data.posts').where('content').contains('ipsum').sort();
		expect(x.length).toBe(3);
		expect(x[0].title).toBe("post 2");
		expect(x[1].title).toBe("post 3"); 
	});

	it("should sort use a custom sort, with relevance as a secondary sort", function() {
		var custom_sort = function(a, b) {
			return a.custom_sort - b.custom_sort
		}
		var x = fin.get('fin.data.posts').where('content').contains('relevant').sort(custom_sort);
		expect(x.length).toBe(3);
		expect(x[0].title).toBe("post 3");
		expect(x[1].title).toBe("post 2"); 

		// if we reverse the custom sort function 1 should now be first, but secondary relevance sort still has 3 before 2
		var another_custom_sort = function(a, b) {
			return b.custom_sort - a.custom_sort
		}
		var x = fin.get('fin.data.posts').where('content').contains('relevant').sort(another_custom_sort);
		expect(x.length).toBe(3);
		expect(x[0].title).toBe("post 1");
		expect(x[1].title).toBe("post 3"); 
	});



});