'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  notifier: {
    defaults: {
      title: 'Gulp Notification',
      sound: false
    },
    success: {
      contentImage: _path2.default.join(__dirname, 'assets/gulp-success.png')
    },
    error: {
      sound: 'Purr',
      contentImage: _path2.default.join(__dirname, 'assets/gulp-error.png')
    }
  }
};