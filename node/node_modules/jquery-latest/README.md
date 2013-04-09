Originally from https://github.com/coolaj86/node-jquery/
This is using latest jQuery 1.9.0

Node.JS
---
```
    npm install jquery-latest

    var $ = require('jquery-latest');
```

Examples
---
```javascript
    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());
```

In Node.JS you may also create separate window instances

```javascript
    var jsdom = require('jsdom').jsdom
      , myWindow = jsdom().createWindow()
      , $ = require('jquery')
      , jq = require('jquery').create()
      , jQuery = require('jquery').create(myWindow)
      ;

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jq("<h2>other test passes</h2>").appendTo("body");
    console.log(jq("body").html());

    jQuery("<h3>third test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());
```

Output:

```html
    <h1>test passes</h1>
    <h2>other test passes</h2>
    <h3>third test passes</h3>
```

JSONP Example
----

```javascript
    var $ = require('jquery');

    $.getJSON('http://twitter.com/status/user_timeline/treason.json?count=10&callback=?',function(data) {
      console.log(data);
    });
```