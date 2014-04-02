
var fs = require('fs');
var formidable = require('../node_modules/formidable');

function handleApi(req, res) {    
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //postHandler(req, res, function(req, res, post){
        /******/
        // modify the res

        // store the api response object that can be modified globally until the server actually sends it to the client
        res['response'] = {
            meta: {
                status: 200,
                errors: [],
            },
            data: {
                // result data goes here, will extend the tail global object tail.util.extend(tail.data, response.data) when it gets to the browser
                // so data paths must be consistent with the front-end
            }
        }
        // store headers we want to add
        res['headers'] = {}
        // pass fields on down
        res['fields'] = fields
        res['files'] = files
        // keep a reference to the request so we don't have to keep passing it over
        res['req'] = req
        // convenience function to handle api response
        res['kill'] = function(status, contentType) {
            if (typeof contentType === 'undefined') {
                contentType = 'application/json'
            }

            // authenticated actions kill(401) - not authenticated, kill(403) insufficient permissions
            if (typeof status === 'undefined') {
                status = 200;
            }
            res.response.meta.status = status

            var response = "";
            if (typeof fields.ajaxiframe_id !== 'undefined') {
                // ajaxforms are targetted at async iframes, use jsonp to trigger callback function on client.
                contentType = "text/html"

                res.response.meta.onSuccess = fields.onSuccess
                res.response.meta.onError = fields.onError
                res.response.meta.ajaxiframe_id = fields.ajaxiframe_id

                response = JSON.stringify(res.response);
                response = "<script type='text/javascript'>parent.fin.util.handleJsonp(" + response + ")</script>"
            } else {
                // regular responses are sent as json
                response = JSON.stringify(res.response);
            }


            res.headers['Content-Type'] = contentType

            this.writeHead(200, res.headers)
            this.end(response)
        }
        // pathname is used for admin areas, different apps, or beta versions of the site
        res['pathname'] = fields.pathname;

        res['hashbang'] = "/"; // default
        // command is used for non-url based actions
        res['command'] = fields.command;
        if (typeof fields.hashbang !== 'undefined') {
            res['segments'] = fields.hashbang.toString().split("/");;
        }
        
        // fetch templates if requested
        getTemplates(fields, res);

        // keep a reference to segments
        

        tail.router(res, res.req, res.pathname, res.segments, res.command);
    })
}

// fetch templates
function getTemplates(fields, res) {
    // template_list is a list of templates needed for the page to function
    var template_list = [];
    var template_name_onclient;
    if (typeof fields.template_list !== 'undefined') {
        template_list = fields.template_list.split(',') // convert string back into array
        res.response['templates'] = {}
        // get templates
        for (var i = 0; i < template_list.length; i++) {
            var template_name = template_list[i];
            // if the template is undefined or we're in development mode, get the template from the file system
            if (typeof tail.config._templates[template_name] === 'undefined' || tail.config.env === 'dev') {
                // not in cache, so grab it from the file system
                var file_path = tail.config._template_path + template_name.replace(/_/g, '/');

                // check if .js or .html template
                // we favour .js templates in cases where a .js and .html template both exist with the same name
                var ext = ""
                if (fs.existsSync(file_path + '.js')) {
                    ext = "js"
                }
                if (fs.existsSync(file_path + '.html')) {
                    ext = "html"
                }
                if (fs.existsSync(file_path + '.fn.js')) {
                    ext = "fn.js"
                }
                file_path += "." + ext
                template_name_onclient = template_name + "-" + ext

                try {
                    tail.config._templates[template_name] = {
                        template: JSON.stringify(fs.readFileSync(file_path, 'utf8')),
                        ext: ext
                    }
                } catch (err) {
                    // template wasn't found
                    // make sure it's no longer in the cache
                    delete tail.config._templates[template_name]
                    log("*")
                    log("Error: Template ( " + template_name + " ) not found,")
                    log("Solve Error: create " + template_name.replace(/.*_/, "") + ".js OR " + template_name.replace(/.*_/, "") + ".html in ( " + file_path.replace(/[a-z_\.]*$/, "").replace(/[a-z]*\/\.\.\//, "") + ")")
                    log("*");
                    return
                }
            } else {
                template_name_onclient = template_name + '-' + tail.config._templates[template_name].ext
            }
            // if the template is not in the cache now, the file wasn't found with any of the valid extensions, 
            // template is in cache so grab it from the cache
            res.response.templates[template_name_onclient] = tail.config._templates[template_name].template

        }
    }
}


/*
    exports
*/
module.exports = handleApi;

