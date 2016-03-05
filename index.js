'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulpHelp = (0, _gulpHelp2.default)(_gulp2.default, {});

/**
 * Register all the tasks with configs
 * @param  {Array} tasks
 * @param  {Object} configs
 */
function start() {
  var tasks = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var configs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].name) {
      _utils.IGNITE_UTILS.log('Task does not contain a name property.', 'red');

      continue;
    }

    if (typeof tasks[i].fn !== 'function') {
      _utils.IGNITE_UTILS.log('Task does not contain a function (fn) property.', 'red');

      continue;
    }

    var config = _lodash2.default.defaultsDeep(configs[tasks[i].name] || {}, tasks[i].config || {});

    task(tasks[i].name, config.deps || [], tasks[i].fn, tasks[i].description, tasks[i].help, config);
  }
}

/**
 * Register a single task on the custom instance of gulp
 * @param  {string}   name
 * @param  {Array}    deps
 * @param  {Function} fn
 * @param  {string}   description
 * @param  {Object}   help
 * @param  {Object}   config
 */
function task(name, deps, fn) {
  var description = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
  var help = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
  var config = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

  gulpHelp.task(name, description, deps, gulpFn, { options: help });

  function gulpFn(cb) {
    var startTime = _utils.IGNITE_UTILS.startTime();
    var promise = fn.call({}, config, end, error);
    var endCalled = false;

    if (promise && typeof promise.on === 'function') {
      promise.on('end', end);
    }

    function error(e) {
      _utils.IGNITE_UTILS.log(e.message, 'red');
    }

    function end(e) {
      if (endCalled) return;

      endCalled = true;

      _utils.IGNITE_UTILS.notify(name + ' complete --- ' + _utils.IGNITE_UTILS.getDuration(startTime));
      cb(e);
    }
  }
}

exports.default = { start: start, task: task };