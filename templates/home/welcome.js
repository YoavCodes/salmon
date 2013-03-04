```h1`, {}, rootNode, `Welcome to HighFin.js`);

// define a counter if it doesn't already exist
fin.meta.count = fin.meta.count || 1;


```p`, {}, rootNode, `Hey, Hello World, this is a "multiline" string, <br />
						in Javascript. Double and single quotes don't have to be escaped. <br />
						Thanks to \`\` backticks <br /><br />
						Here, Javascript is being run "inline" the backtick string to increment the count: [[ fin.meta.count++ ]]` + fin.meta.count + ` 
						<p>... whenever templates/home/welcome.js is rendered</p>`);

var link_list = ```ul`, {class: `link_list`}, rootNode);
	```a`, {href: `#!/hashbang_test`}, ```li`, {}, link_list), `Hashbang link Test`);
	```a`, {href: `#!/hashbang_test/norerender`}, ```li`, {}, link_list), `Hashbang link Test - don't re-render main template`);
	```a`, {href: `/test_app/`}, ```li`, {}, link_list), `regular internal link`);