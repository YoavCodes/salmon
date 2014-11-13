function definePaths(_base_path) {    
    tail.config = tail.util.extend({}, {
        _base_path: _base_path,
        _templates: {}, // used for storing the cached templates
        _application_path: _base_path + "app/",
        _configuration_path: _base_path + "config/",
        _template_path: _base_path + "templates/", // requres trailing slash
        _public_path: _base_path + "public/",
        //_css_path: _base_path + "public/assets/css/",
        //_less_path: _base_path + "public/assets/less/",
        /*less: {
            dev: {
                compress: false,
                yuicompress: false,

            },
            prod: {
                yuicompress: true,
            }
        }*/
    }, require(_base_path + "config/config.js").config)
}

/*
    exports
*/
module.exports = definePaths

