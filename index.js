'use strict';

import gulp from 'gulp';
import includeAll from 'include-all';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';
import config from './common/config';

const $ = loadPlugins(config.loadPlugins);
const gulpHelp = $.help(gulp, config.help);
const tasks = includeAll({
  dirname: path.resolve(__dirname, 'tasks'),
  filter: /(.+)index\.js$/
});

export default {
  /**
   * Include all gulp tasks
   * @param  {Object} options Config overrides by task
   */
  all(options = {}) {
    for (var task in tasks) {
      if (tasks.hasOwnProperty(task)) {
        this.register(task, options[task.name] || {});
      }
    }
  },

  /**
   * Include only the specified gulp tasks
   * @param  {Array} tasksList An array of tasks name
   * @param  {Object} options  Config overrides by task
   */
  only(tasksList, options = {}) {
    for (var task in tasks) {
      if (tasks.hasOwnProperty(task) && tasksList.includes(task.name)) {
        this.register(task, options[task.name] || {});
      }
    }
  },

  /**
   * Include all gulp tasks except the specified tasks
   * @param  {Array} tasksList An array of tasks name to ignore
   * @param  {Object} options  Config overrides by task
   */
  except(tasksList, options = {}) {
    for (var task in tasks) {
      if (tasks.hasOwnProperty(task) && !tasksList.includes(task.name)) {
        this.register(task, options[task.name] || {});
      }
    }
  },

  /**
   * Register a gulp task
   * @param  {Object} task
   * @param  {Object} options
   */
  register(task, options = {}) {
    if (!task.hasOwnProperty('name') || !task.hasOwnProperty('fn')) throw 'A task must contain a name and fn.';

    let taskFn = task.fn.bind(this, gulpHelp, options);
    gulpHelp.task(task.name, task.description, task.deps, taskFn, task.options);
  }
};
