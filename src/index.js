'use strict';

import gulp from 'gulp';
import help from 'gulp-help';

const gulpHelp = help(gulp, {});

export default { start, task };

function start(tasks = [], config = {}) {
  for (let i = 0; i < tasks.length; i++) {
    register(tasks[i], config[tasks[i].name]);
  }
}

function register(igniteTask, config = {}) {
  task(igniteTask.name, [], igniteTask.fn, igniteTask.description, igniteTask.help, config);
}

function task(...args) {
  gulpHelp.task(args[0], args[3], args[1], args[2].bind({}, args[5]), { options: args[4] });
}
