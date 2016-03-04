'use strict';

import _ from 'lodash';
import pretty from 'pretty-hrtime';
import gutil from 'gulp-util';
import notifier from 'notifier';
import config from './config';

const IGNITE_UTILS = {
  log(msg, color = 'blue') {
    if (typeof msg === 'object') {
      for (let item in msg) {
        if (msg.hasOwnProperty(item)) {
          this.log(msg[item]);
        }
      }
    } else {
      gutil.log(gutil.colors[color](msg));
    }
  },

  notify(message, success = true) {
    var options = _.extend(
      { message },
      config.notifier.defaults,
      config.notifier[success ? 'success' : 'error']
    );

    notifier.notify(options);
  },

  startTime() {
    return process.hrtime();
  },

  getDuration(startTime = 0) {
    return pretty(process.hrtime(startTime));
  },
};

export { IGNITE_UTILS };
