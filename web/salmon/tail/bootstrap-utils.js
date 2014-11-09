var fs = require('fs');
var less = require('less');

// recursively load all server-side application code onto the global tail object
function loadServerCode() {
    // load server-side application code
    var _path = tail.config._application_path;
    loopOverFolders([tail.config._application_path], function(file_name, root_path) {
        var rel_path = root_path.replace(tail.config._application_path, "");
        // load .js files 
        if (file_name.match(/.js$/)) {
            var object_path_array = String(rel_path + file_name).replace(/\.js$/, '').split('/');
            var object_branch = tail.app;

            for (var j = 0; j < object_path_array.length; j++) {
                if (j === object_path_array.length - 1) {
                    object_branch[object_path_array[j]] = require(root_path + file_name)
                } else {
                    if (typeof object_branch[object_path_array[j]] === 'undefined') {
                        object_branch[object_path_array[j]] = {};
                    }
                    object_branch = object_branch[object_path_array[j]]
                }
            }
        }
    })
}


// recursively operate on every file in a folder and its subfolders
// @folders: array of string folder paths
// @callback: function to call on every file, the callback gets two arguments
// @file_name: string name of the file
// @root_path: string full root path of the file not including the file_name, so root_path + file_name = full path to file
// @isDirectory: boolean
// @recursive: boolean: whether to recursively check subfolders or not
// @callback_on: 'files', 'folders', 'both' when to trigger a callback
function loopOverFolders(folders, callback, recursive, callback_on) {
    if (typeof folders === 'undefined') {
        return
    }
    if (typeof recursive === 'undefined') {
        recursive = true;
    }
    if (typeof callback_on === 'undefined') {
        callback_on = 'files'
    }

    var root_path = "";
    for (var j = 0; j < folders.length; j++) {
        root_path = folders[j];
        if (fs.statSync(root_path).isDirectory() === false) {
            continue;
        }
        (function(rel_path) {
            if (typeof rel_path === 'undefined') {
                rel_path = ""
            }
            var _path = root_path + rel_path;
            var folder_contents = fs.readdirSync(_path)
            for (var i = 0; i < folder_contents.length; i++) {
                var file_name = folder_contents[i];
                // ignore dot files
                if (file_name.charAt(0) === ".") {
                    continue
                }
                var isDirectory = fs.statSync(_path + file_name).isDirectory();

                if (isDirectory === true) {
                    if (callback_on === "folders" || callback_on === "both") {
                        callback(file_name, _path, true)
                    }

                    // call this function again for the newly discovered folder
                    if (recursive === true) {
                        arguments.callee(rel_path + file_name + "/")
                    }
                } else {
                    if (callback_on === "files" || callback_on === "both") {
                        callback(file_name, _path, false)
                    }
                }
            }
        })("")
    }
}

// load router
tail.router = require(tail.config._configuration_path + 'router.js').router;

loadServerCode();

/*
exports
*/
module.exports.loopOverFolders = loopOverFolders;
module.exports.loadServerCode = loadServerCode;
















