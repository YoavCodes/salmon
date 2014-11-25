describe("fin.nav", function(){
	
	beforeEach(function(){
		// add a container
		$('body').append("<div id='container'></div>")
		// add three inline templates
				.append('<script type="text/template" id="template_welcome-html">welcome template</script>')
				.append('<script type="text/template" id="template_thanks-html">thanks template</script>')
				.append('<script type="text/template" id="template_goodbye-html">goodbye template</script>')
				.append("<script type='text/template' id='template_nested-html'>nested template<div id='nestedcontainer'></div></script>")
				.append("<script type='text/template' id='template_newline-html'>newline template<pre>preserve\nnewlines</pre></script>")
				// ensure support for multiple inline vars, empty inline vars, and multi-line inline vars
				.append('<script type="text/template" id="template_inlinevar-html">inlinevar template {{ fin.meta.val }}{{}}{{ fin.meta.val }}{{ \nfin.meta.val \n}}</script>') 
				// ensure support for multiple inlilne js, empty inline js, and multi-line inlinejs
				.append('<script type="text/template" id="template_inlinejs-html">inlinejs template\n[[ \nfor(var k=0; k<5; k++){ \nprint(k); \n}; \n ]][[ for(var k=0; k<5; k++){ print(k); };  ]][[ ]]</script>');



		Fin({
			containers: ['container', 'nestedcontainer'],
			navigate: {
				home: {
					container: ['welcome']
				},
				thanks: {
					container: ['thanks']
				},
				multi: {
					container: ['welcome', 'thanks']
				},
				nested: {
					container: ['nested'],
					nestedcontainer: ['thanks']
				},
				newline: {
					container: ['newline']
				},
				inlinevar: {
					container: ['inlinevar']
				},
				before: {
					before_func: [ [test_before_func, {}] ],
					container: ['inlinevar']
				},
				after: {
					container: ['inlinevar'],
					after_func: [ [test_after_func, {}] ]
				},
				inlinejs: {
					container: ['inlinejs']
				}
			},
			routes: {

			},
			default_page: 'home'
		});	
		


		fin.meta.val = 0;
		fin.meta.check = 8;

		function test_before_func() {
			fin.meta.val++;
		}

		function test_after_func() {
			fin.meta.val++;
		}
	});


	afterEach(function(){
		fin = {};

		$('#container, #template_welcome-html, #template_thanks-html, #template_goodbye-html, #template_nested-html, #template_newline-html, #template_inlinevar-html, #template_inlinejs-html').remove();
	});


	it("should render the default page on start", function(){				
		// todo: upgrade phantomjs to version with window.onhashchange
		//expect(fin._meta.last_nav()).toBe("home");
	});
	// todo: test routes when phantomjs is upgraded

	it("should navigate to a page, render templates replacing contents of the container", function(){				
		fin.nav("home");
		expect($("#container .block.block_welcome div").html()).toBe("welcome template"); // rendered home page
		fin.nav("thanks");			
		expect($("#container .block.block_welcome").length).toBe(0); // removed home page templates
		expect($("#container .block.block_thanks div").html()).toBe("thanks template"); // rendered thanks page
	});

	it("should store the last page navigated to", function(){				
		fin.nav("home");	
		expect(fin._meta.last_nav()).toBe("home");	
	});

	it("should render multiple templates into a single container", function() {
		fin.nav("multi");
		// welcome and thanks templates should both have been rendered inside #container
		expect($("#container .block.block_welcome div").html()).toBe("welcome template");
		expect($("#container .block.block_thanks div").html()).toBe("thanks template");
	});

	it("should render nested templates", function() {
		fin.nav("nested");
		// should render nested template into container, then thanks template into #nestedcontainer
		expect($("#container .block.block_nested #nestedcontainer").length).toBe(1);		
		expect($("#container #nestedcontainer .block.block_thanks div").html()).toBe("thanks template");
	});

	it("should print inline vars", function() {		
		fin.nav("inlinevar");
		expect($("#container .block.block_inlinevar div").html()).toBe("inlinevar template 000") 
	});

	it("should run before_func before rendering the template", function() {		
		fin.nav("before");
		expect(fin.meta.val).toBe(1); // before func executed change fin.meta.val to 1
		expect($("#container .block.block_inlinevar div").html()).toBe("inlinevar template 111") 
	});

	it("should run after_func after rendering the template", function() {		
		fin.nav("after");
		expect($("#container .block.block_inlinevar div").html()).toBe("inlinevar template 000") 
		expect(fin.meta.val).toBe(1); // after func
	});

	it("should preserve newlines in html", function() {
		fin.nav("newline");		
		expect($("#container .block.block_newline pre").html()).toBe("preserve\nnewlines");
	})

	it("should execute inlinejs blocks in templates, supporting loops, and expose a print function to inlinejs", function() {
		fin.nav("inlinejs");		
		expect($("#container .block.block_inlinejs div").html()).toBe("inlinejs template\n0123401234") // render the template and execute the for loop		
	});


	// todo: updating docs https://github.com/YoavGivati/salmon/wiki/Templating-Overview
	// todo: remove .js templates and simplify code.




});