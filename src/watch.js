export default {
  name: 'watch',
  description: 'Watch files for changes and trigger tasks',
  config: {
    files: [],
    tasks: [],
  },
  fn(options, end, error, gulp) {
    gulp.watch(options.files, options.tasks);
  },
};
