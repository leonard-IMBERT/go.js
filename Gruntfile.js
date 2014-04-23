module.exports = function(grunt) {
  grunt.initConfig({
    bower_concat: {
      all: {
        dest: "dependencies.js"
      }
    },
    concat: {
      all: {
        src: ["dependencies.js", "src/board.js", "src/game.js"],
        dest: "go.js"
      }
    },
    jasmine: {
      src: "go.js",
      options: {
        specs: "tests/**/*.spec.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask("default", ["bower_concat", "concat", "jasmine"]);
};
