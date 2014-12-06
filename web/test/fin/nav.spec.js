describe("fin.nav", function(){
	
	beforeEach(function(){
		// add a container
		$('body').append("<div id='container'></div>")
		// add three inline templates
				.append('<script type="text/template" class="cleanup" id="template_welcome-html">welcome template</script>')
				.append('<script type="text/template" class="cleanup" id="template_thanks-html">thanks template</script>')
				.append('<script type="text/template" class="cleanup" id="template_goodbye-html">goodbye template</script>')
				.append("<script type='text/template' class='cleanup' id='template_nestedcontainers-html'>nestedcontainers template<div id='nestedcontainer'></div></script>")
				.append("<script type='text/template' class='cleanup' id='template_newline-html'>newline template<pre>preserve\nnewlines</pre></script>")
				// ensure support for multiple inline vars, empty inline vars, and multi-line inline vars
				.append('<script type="text/template" class="cleanup" id="template_inlinevar-html">inlinevar template {{ fin.meta.val }}{{}}{{ fin.meta.val }}{{ \nfin.meta.val \n}}</script>') 
				// ensure support for multiple inlilne js, empty inline js, and multi-line inlinejs
				.append('<script type="text/template" class="cleanup" id="template_inlinejs-html">inlinejs template\n[[ \nfor(var k=0; k<5; k++){ \nprint(k); \n}; \n ]][[ for(var k=0; k<5; k++){ print(k); };  ]][[ ]]</script>')
				.append('<script type="text/template" class="cleanup" id="template_disjointed-html">disjointed template[[ for(var k=0; k<5; k++){ ]]{{k}}[[}]]</script>')
				// nested templates
				.append('<script type="text/template" class="cleanup" id="template_inlinerenderparent-html">inlinerenderparent template[[ render(`inlinerenderchild1`, {test: `toast`}) ]] [[ render(`inlinerenderchild2`, {test: `fight`}) ]] [[ render(`inlinerenderchild2`, {test: `feast`}) ]]</script>')
				.append('<script type="text/template" class="cleanup" id="template_inlinerenderchild1-html">inlinerenderchild1 template<button class="clickme">click me {{data.test}}</button>[[ addEvent(`click`, `.clickme`, {what: `mop`}, fin.fn.clickhandler) ]]</script>')
				.append('<script type="text/template" class="cleanup" id="template_inlinerenderchild2-html">inlinerenderchild2 template<button class="clickme">click me {{data.test}}</button>[[ addEvent(`click`, `.clickme`, {what: `mo`}, fin.fn.clickhandler) ]]</script>')
				.append('<script type="text/template" class="cleanup" id="template_inlinerenderopentags-html">inlinerenderopentags template <b>[[ render(`inlinerenderchild2`, {test: `fight`}) ]]</b></script>')





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
				nestedcontainers: {
					container: ['nestedcontainers'],
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
				},
				disjointed: {
					container: ['disjointed']
				},
				inlinerender: {
					container: ['inlinerenderparent']
				},
				opentags: {
					container: ['inlinerenderopentags']
				}

			},
			routes: {

			},
			default_page: 'home'
		});	

		fin.meta.clicklog = "";

		fin.fn.clickhandler = function(event) {
			fin.meta.clicklog += event.data.what
		}

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

		$('#container, .cleanup').remove();
	});


	it("should render the default page on start", function(){				
		// todo: upgrade phantomjs to version with window.onhashchange
		//expect(fin._meta.last_nav()).toBe("home");
	});
	// todo: test routes when phantomjs is upgraded

	it("should navigate to a page, render templates replacing contents of the container", function(){				
		fin.nav("home");
		expect($("#container .block.block_welcome").html()).toBe("welcome template"); // rendered home page
		fin.nav("thanks");			
		expect($("#container .block.block_welcome").length).toBe(0); // removed home page templates
		expect($("#container .block.block_thanks").html()).toBe("thanks template"); // rendered thanks page
	});

	it("should store the last page navigated to", function(){				
		fin.nav("home");	
		expect(fin._meta.last_nav()).toBe("home");	
	});

	it("should render multiple templates into a single container", function() {
		fin.nav("multi");
		// welcome and thanks templates should both have been rendered inside #container
		expect($("#container .block.block_welcome").html()).toBe("welcome template");
		expect($("#container .block.block_thanks").html()).toBe("thanks template");
	});

	it("should render templates into nested containers", function() {
		fin.nav("nestedcontainers");
		// should render nested template into container, then thanks template into #nestedcontainer
		expect($("#container .block.block_nestedcontainers #nestedcontainer").length).toBe(1);		
		expect($("#container #nestedcontainer .block.block_thanks").html()).toBe("thanks template");
	});

	it("should print inline vars", function() {		
		fin.nav("inlinevar");
		expect($("#container .block.block_inlinevar").html()).toBe("inlinevar template 000") 
	});

	it("should run before_func before rendering the template", function() {		
		fin.nav("before");
		expect(fin.meta.val).toBe(1); // before func executed change fin.meta.val to 1
		expect($("#container .block.block_inlinevar").html()).toBe("inlinevar template 111") 
	});

	it("should run after_func after rendering the template", function() {		
		fin.nav("after");
		expect($("#container .block.block_inlinevar").html()).toBe("inlinevar template 000") 
		expect(fin.meta.val).toBe(1); // after func
	});

	it("should preserve newlines in html", function() {
		fin.nav("newline");		
		expect($("#container .block.block_newline pre").html()).toBe("preserve\nnewlines");
	})

	it("should execute inlinejs blocks in templates, supporting loops, and expose a print function to inlinejs", function() {
		fin.nav("inlinejs");		
		expect($("#container .block.block_inlinejs").html()).toBe("inlinejs template\n0123401234") // render the template and execute the for loop		
	});

	it("should run disjointed inline_js", function() {
		fin.nav("disjointed");		
		expect($("#container .block.block_disjointed").html()).toBe("disjointed template01234");
	});

	it("should render inline templates", function() {
		fin.nav("inlinerender");
		expect($("#container .block.block_inlinerenderchild1").html()).toBe('inlinerenderchild1 template<button class="clickme">click me toast</button>');
		expect($("#container .block.block_inlinerenderchild2").eq(0).html()).toBe('inlinerenderchild2 template<button class="clickme">click me fight</button>');
		expect($("#container .block.block_inlinerenderchild2").eq(1).html()).toBe('inlinerenderchild2 template<button class="clickme">click me feast</button>');
	});

	it("should delegate events declared using addEvents in templates to each template's rootNode", function() {
		fin.nav("inlinerender");				
		$("#container .block.block_inlinerenderchild2 .clickme").eq(0).click();
		expect(fin.meta.clicklog).toBe("mo")
		$("#container .block.block_inlinerenderchild2 .clickme").eq(1).click();
		expect(fin.meta.clicklog).toBe("momo")
		$("#container .block.block_inlinerenderchild1 .clickme").click();
		expect(fin.meta.clicklog).toBe("momomop")
	});

	it("should not close open tags when rendering inline templates", function() {
		fin.nav("opentags");
		expect($("#container .block.block_inlinerenderopentags b").html()).toBe('<div class="block block_inlinerenderchild2">inlinerenderchild2 template<button class="clickme">click me fight</button></div>')
	})

	// todo: updating docs https://github.com/YoavGivati/salmon/wiki/Templating-Overview
	// todo: remove .js templates and simplify code.




});