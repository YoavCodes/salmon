module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
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
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("dev", ["less", "watch"]);


}