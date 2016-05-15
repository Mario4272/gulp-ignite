import _ from 'lodash';
import pretty from 'pretty-hrtime';
import gutil from 'gulp-util';
import notifier from 'node-notifier';
import config from './config';

const IGNITE_UTILS = {
  log(msg, color = 'blue') {
    if (typeof msg === 'object') {
      Object.keys(msg).forEach((i) => {
        this.log(msg[i]);
      });
    } else {
      gutil.log(gutil.colors[color](msg));
    }
  },

  notify(message, success = true) {
    const options = _.extend(
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
