grunt.initConfig({
  sass: {
    dist: {
      files: {
        'css/style.css': 'src/style.sass'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass']);