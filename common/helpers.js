'use strict';

import _ from 'lodash';
import loadPlugins from 'gulp-load-plugins';
import notifier from 'node-notifier';
import pretty from 'pretty-hrtime';
import config from './config';

const $ = loadPlugins(config.loadPlugins);

export default {
  /**
   * Get the duration of hrtime
   * @param  {string} startTime = '0'
   * @return {string}
   */
  getDuration(startTime = '0') {
    return pretty(process.hrtime(startTime));
  },

  /**
   * Log a message to the console
   * @param  {string} msg
   * @param  {string} color = 'blue'
   */
  log(msg, color = 'blue') {
    if (typeof msg === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          this.log(msg[item]);
        }
      }
    } else {
      $.util.log($.util.colors[color](msg));
    }
  },

  /**
   * Show OS level Notification
   * @param  {string} message
   * @param  {Boolean} success = true
   */
  notify(message, success = true) {
    var options = _.extend(
      { message },
      config.notifier.defaults,
      config.notifier[success ? 'success' : 'error']
    );

    notifier.notify(options);
  }
};
