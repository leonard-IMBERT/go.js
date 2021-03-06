module.exports = function(grunt) {
  var files = ["src/models/board.js", "src/models/game.js", "src/models/score.js", "src/models/webrtc-client.js", "src/models/ws-client.js", "src/models/client.js", "src/views/board.js", "src/views/pass.js", "src/views/status.js", "src/views/score.js", "src/controllers/game.js"];

  grunt.initConfig({
    bower_concat: {
      all: {
        dest: "dependencies.js",
        mainFiles: {
          "socket.io-client": "dist/socket.io.js"
        }
      }
    },
    concat: {
      all: {
        src: ["dependencies.js"].concat(files),
        dest: "go.js"
      }
    },
    jasmine: {
      src: "go.js",
      options: {
        host: "http://127.0.0.1:8080/",
        outfile: "tests.html",
        specs: "tests/**/*.spec.js"
      }
    },
    less: {
      all: {
        files: {
          "all.css": "less/all.less"
        }
      }
    },
    watch: {
      js: {
        files: files,
        tasks: ["concat"]
      },
      less: {
        files: "less/**/*.less",
        tasks: ["less"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");

  var server = require("./tests/server.js");
  grunt.registerTask("start-test-server", function() {
    server.start();
  });
  grunt.registerTask("stop-test-server", function() {
    server.stop();
  });

  grunt.registerTask("build", ["bower_concat", "concat", "less"]);
  grunt.registerTask("test", ["start-test-server", "jasmine", "stop-test-server"]);

  grunt.registerTask("default", ["build", "test"]);
};
