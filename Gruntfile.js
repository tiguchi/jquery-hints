module.exports = function(grunt) {
	var pkg = grunt.file.readJSON("package.json");

	grunt.initConfig({
		uglify : {
			options : {
				banner : '/*! jQuery Hints ' + pkg.version + ' - ' + pkg.copyright + ', https://github.com/tiguchi/jquery-hints - MIT license */\n',
			},
			my_target : {
				files : {
					'build/jquery.hints.min.js' : [ 'src/jquery.hints.js' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', [ 'uglify' ]);
};
