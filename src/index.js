import _ from 'lodash';
import gulp from 'gulp';
import gulpHelp from 'gulp-help';
import { IGNITE_UTILS } from './utils';

const gHelp = gulpHelp(gulp, {});

/**
 * Register all the tasks with configs
 * @param  {Array} tasks
 * @param  {Object} configs
 */
function start(tasks = [], configs = {}) {
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].name) {
      IGNITE_UTILS.log('Task does not contain a name property.', 'red');

      continue;
    }

    if (typeof tasks[i].fn !== 'function') {
      IGNITE_UTILS.log('Task does not contain a function (fn) property.', 'red');

      continue;
    }

    const config = _.defaultsDeep(
      configs[tasks[i].name] || {}, tasks[i].config || {}
    );

    task(
      tasks[i].name,
      config.deps || [],
      tasks[i].fn,
      tasks[i].description,
      tasks[i].help,
      config
    );
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
function task(name, deps, fn, description = false, help = {}, config = {}) {
  gHelp.task(name, description, deps, gulpFn, { options: help });

  function gulpFn(cb) {
    const startTime = IGNITE_UTILS.startTime();
    const promise = fn.call({}, config, end, error);
    let endCalled = false;

    if (promise && typeof promise.on === 'function') {
      promise.on('end', end);
    }

    function error(e) {
      IGNITE_UTILS.notify(`${name} complete --- ${IGNITE_UTILS.getDuration(startTime)}`, false);

      if (e && e.message) {
        IGNITE_UTILS.log(e.message, 'red');

        return;
      }

      cb();
    }

    function end(e) {
      if (endCalled) return;

      endCalled = true;

      IGNITE_UTILS.notify(`${name} complete --- ${IGNITE_UTILS.getDuration(startTime)}`);
      cb(e);
    }
  }
}

export default { start, task };
