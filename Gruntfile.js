var fs = require('fs');
var marked = require('marked');

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'compressed',
        },
        files: {
          'style.min.css': 'assets/style.scss'
        }
      }
    },

    notify: {
      build: {
        options: {
          title: 'SASS Livereloaded',  // optional
          message: 'SASS compiled and web reloaded', //required
        }
      }
    },

    copy: {
      main: {
        src: './index.raw.html',
        dest: './index.html',
        options: {
          process: function (content, srcpath) {
            var html = marked(fs.readFileSync('readme.md', 'utf8'));
            return content.replace('<main></main>', '<main>' + html + '</main>');
          }
        }
      }
    },

    watch: {
      scripts: {
        files: [ 'index.html', 'package.js', 'Gruntfile.js', 'assets/**/*.*', 'readme.md' ],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true,
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['sass', 'copy', 'notify:build']);
};
