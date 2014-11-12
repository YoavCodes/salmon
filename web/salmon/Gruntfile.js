module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jasmine: {
			fin: {
				src: ['../public/assets/js/jquery.js', '../public/assets/js/fin.js', '../public/assets/js/*.fin.js'],
				options: {
					specs: '../test/fin/*Spec.js',
					helpers: '../test/fin/*Helper.js'
				}
			}
		},
		less: {
			src: {
				expand: true,
				cwd: "../public/assets/less",
				src: ["*"],
				dest: "../public/assets/css"
			}
		},
		watch: {
			styles: {
				files: ["../public/assets/less/*"],
				tasks: ["less"],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	//grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	//grunt.registerTask("dev", ["less", "watch"]);
	grunt.registerTask("dev", ["less"]);


}