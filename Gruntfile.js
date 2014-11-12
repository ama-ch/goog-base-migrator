'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js', '!test/fixture/**/*']
      }
    },
    mochacov: {
      options: {
        files: ['test/*.js'],
        require: ['intelli-espower-loader']
      },
      test: {
        options: {
          reporter: 'spec'
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cov');

  grunt.registerTask('coveralls', ['mochacov:coveralls']);
  var testTasks = ['mochacov:test'];
  if (process.env.TRAVIS_JOB_ID) {
    testTasks.push('coveralls');
  }
  grunt.registerTask('test', testTasks);

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};
