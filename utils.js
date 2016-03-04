'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IGNITE_UTILS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _prettyHrtime = require('pretty-hrtime');

var _prettyHrtime2 = _interopRequireDefault(_prettyHrtime);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _notifier = require('notifier');

var _notifier2 = _interopRequireDefault(_notifier);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IGNITE_UTILS = {
  log: function log(msg) {
    var color = arguments.length <= 1 || arguments[1] === undefined ? 'blue' : arguments[1];

    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          this.log(msg[item]);
        }
      }
    } else {
      _gulpUtil2.default.log(_gulpUtil2.default.colors[color](msg));
    }
  },
  notify: function notify(message) {
    var success = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var options = _lodash2.default.extend({ message: message }, _config2.default.notifier.defaults, _config2.default.notifier[success ? 'success' : 'error']);

    _notifier2.default.notify(options);
  },
  startTime: function startTime() {
    return process.hrtime();
  },
  getDuration: function getDuration() {
    var startTime = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return (0, _prettyHrtime2.default)(process.hrtime(startTime));
  }
};

exports.IGNITE_UTILS = IGNITE_UTILS;