'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulpHelp = (0, _gulpHelp2.default)(_gulp2.default, {});

exports.default = { start: start, task: task };


function start() {
  var tasks = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  for (var i = 0; i < tasks.length; i++) {
    register(tasks[i], config[tasks[i].name]);
  }
}

function register(igniteTask) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  task(igniteTask.name, [], igniteTask.fn, igniteTask.description, igniteTask.help, config);
}

function task() {
  gulpHelp.task(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 3 ? undefined : arguments[3], arguments.length <= 1 ? undefined : arguments[1], (arguments.length <= 2 ? undefined : arguments[2]).bind({}, arguments.length <= 5 ? undefined : arguments[5]), { options: arguments.length <= 4 ? undefined : arguments[4] });
}