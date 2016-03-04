'use strict';

import path from 'path';

export default {
  notifier: {
    defaults: {
      title: 'Gulp Notification',
      sound: false
    },
    success: {
      contentImage: path.join(__dirname, 'assets/gulp-success.png')
    },
    error: {
      sound: 'Purr',
      contentImage: path.join(__dirname, 'assets/gulp-error.png')
    }
  }
};
