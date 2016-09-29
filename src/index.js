import gulp from 'gulp';
import gulpHelp from 'gulp-help';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import watchTask from './watch';
import { IGNITE_UTILS } from './utils';

/**
 * Instance of gulp help to use
 * @type {Object}
 */
export const instance = gulpHelp(gulp, {});

/**
 * @private
 */
const createRunSequence = (tasks) => (config, end) => runSequence.apply({}, [...tasks, end]);

/**
 * @private
 */
const createGulpTaskFn = (fn, config) => (end) => {
  const promise = fn(
    config,
    end,
    (message, fatal = true) => {
      if (message) IGNITE_UTILS.log(message, 'red');
      if (fatal) process.exit(1);
    },
    instance
  );

  if (promise) return promise;
};

/**
 * @private
 */
const createGulpTask = (task) => {
  const { name, description, config, help, fn, run } = task;
  let taskFn = fn;

  if (!name) {
    throw Error('Task does not contain a name property.');
  }

  if (Array.isArray(run)) {
    taskFn = createRunSequence(run);
  }

  if (typeof taskFn !== 'function') {
    throw Error('Task does not contain a function (fn) or a run (run) property.');
  }

  return instance.task.apply({}, [
    name,
    description,
    config && config.deps ? config.deps : [],
    createGulpTaskFn(taskFn, config),
    { options: help },
  ]);
};

/**
 * Create a gulp task
 */
export const task = (name, taskTemplate = {}, options = {}) => {
  if (typeof name === 'object' && name.name && (name.fn || name.run)) {
    return createGulpTask({ ...name, config: { ...name.config, ...taskTemplate } });
  }

  if (Array.isArray(taskTemplate)) {
    const description = gutil.colors.cyan(`[${taskTemplate}]`);

    return createGulpTask({ name, description: `Runs the following tasks: ${description}`, run: taskTemplate });
  }

  return createGulpTask({ ...taskTemplate, config: { ...taskTemplate.config, ...options }, name });
};

/**
 * Create a gulp watch
 * @param {string} name
 * @param {string[]} files
 * @param {string[]} tasks
 * @return {Object}
 */
export const watch = (name, files, tasks) => {
  const description = gutil.colors.cyan(`[${tasks}]`);

  return task(name, { ...watchTask, description: `${watchTask.description}: ${description}` }, { files, tasks });
};
