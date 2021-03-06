module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      all: [
        "Gruntfile.js",
        "public/js/**/*.js"
      ]
    },
    watch: {
      scripts: {
        files: [
          "public/js/**/*.js"
        ],
        tasks: ["jshint"],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jshint"]);
  grunt.registerTask("listen", ["watch"]);
};