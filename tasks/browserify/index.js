'use strict';

import _ from 'lodash';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import helpers from '../common/helpers';

export default {
  /**
   * Task name
   * @type {String}
   */
  name: 'browserify',

  /**
   * Task description
   * @type {String}
   */
  description: 'Build out the javascript files',

  /**
   * Task dependencies
   * @type {Array}
   */
  deps: [],

  /**
   * Task help options
   * @type {Object}
   */
  options: {
    '--min': 'Compress and minify the output (true|false). Default: false',
    '--sourcemap': 'Enable or Disable sourcemaps (true|false). Default: true',
  },

  /**
   * Task function
   * @param  {Object} gulp
   * @param  {Object} options
   * @return {Object}
   */
  fn(gulp, options = {}) {
    let _options = _.extend({
      src: './src/js/index.js',
      dest: './public/js',
      filename: 'main.js'
    }, options);
    let startTime = process.hrtime();

    return browserify(_options.src)
      .transform(babelify)
      .bundle()
        .on('error', (e) => helpers.log(e.message, 'red'))
      .pipe(source(_options.filename))
      .pipe(gulp.dest(_options.dest))
        .on('end', () => helpers.log(`Browserify Complete --- ${helpers.getDuration(startTime)}`));
  }
};
