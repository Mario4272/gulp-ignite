import gulp from 'gulp';
import gHelp from 'gulp-help';
import gUtil from 'gulp-util';
import runSequence from 'run-sequence';
import defaultsDeep from 'lodash/defaultsDeep';
import watchTask from './watch';
import { IGNITE_UTILS } from './utils';

/**
 * Instance of gulp help to use
 * @type {Object}
 */
export const instance = gHelp(gulp, {});

/**
 * Extend a premade template
 */
export const extend = (name, ...args) => defaultsDeep({}, { name }, ...args.reverse());

/**
 * Create a task from a template
 */
export const task = (name, taskTemplate = {}, options = {}) => {
  if (typeof name === 'object') {
    return createGulpTask(name, taskTemplate);
  }

  return createGulpTask(extend(name, taskTemplate), options);
};

/**
 * Create a run task
 */
export const run = (name, tasks = []) => (
  task(name, {
    description: `Runs the following tasks: ${gUtil.colors.cyan(`[${tasks}]`)}`,
    fn: (config, end) => runSequence.apply({}, [...tasks, end]),
  })
);

/**
 * Create a gulp watch
 */
export const watch = (name, files, tasks) => {
  const template = extend(name, watchTask, {
    description: `${watchTask.description}: ${gUtil.colors.cyan(`[${tasks}]`)}`,
  });

  return task(template, { files, tasks });
};

/**
 * Bulk register tasks
 */
export const start = (tasks = [], options = {}) => tasks.forEach((t) => task(t, options[t.name]));

/**
 * @private
 */
const createGulpTask = (taskTemplate, options = {}) => {
  const { name, description, help, fn } = taskTemplate;
  const config = defaultsDeep({}, options, taskTemplate.config);

  if (!name) {
    throw Error('Task does not contain a name property.');
  }

  if (typeof fn !== 'function') {
    throw Error('Task does not contain a function (fn) or a run (run) property.');
  }

  return instance.task(
    name,
    description,
    config.deps || [],
    (end) => fn(config, end, gulpErrorFn, instance),
    { options: help }
  );
};

/**
 * @private
 */
const gulpErrorFn = (message, fatal = true) => {
  if (message) IGNITE_UTILS.log(message, 'red');
  if (fatal) process.exit(1);
};
