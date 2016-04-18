module.exports = function(grunt){
    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ["app.js","app/*.js"],
                tasks: ["build-dist"]
            }
        }
    });

    grunt.registerTask("build-dist","Building distribution file from sources with require-js",function(){
        var requirejs = require('requirejs'),
            options = grunt.file.readJSON("require_build_options.json");

        var done = this.async();
        requirejs.optimize(options,function(output){
            grunt.log.writeln(output);
            grunt.log.ok("Main build complete.");
            done();
        }, function( err ) {
            grunt.fatal( "Main build failure: " + err );
        });
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("default",["build-dist"]);
};
