# gulp-ignite
Simplifying gulp tasks.

[![Build Status](https://travis-ci.org/jscarmona/gulp-ignite.svg?branch=master)](https://travis-ci.org/jscarmona/gulp-ignite)
[![npm](https://img.shields.io/npm/dt/gulp-ignite.svg?maxAge=2592000)]()
[![GitHub tag](https://img.shields.io/github/release/jscarmona/gulp-ignite.svg?maxAge=2592000)]()

## install

**NPM**

```bash
$ npm install --save-dev gulp-ignite
```

## example

#### Install npm dependancies

```bash
$ npm i -D gulp-ignite gulp-ignite-browserify gulp-ignite-eslint babelify
```

#### Create `gulpfile.babel.js` and add the following:

```js
import ignite from 'gulp-ignite';
import browserify from 'gulp-ignite-browserify';
import eslint from 'gulp-ignite-eslint';
import babelify from 'babelify';

const tasks = [
  browserify,
  eslint,
];

const options = {
  browserify: {
    deps: ['eslint'],
    options: [
      transforms: [babelify]
    ],
  }
}

ignite.start(tasks, options);
```

## built-in tasks

### <a name="run"></a>run

Run tasks defined in sequence.

```
gulp run browserify sass
```

##### arguments
- Tasks to run.

---

## available packages

* [browserify](https://github.com/jscarmona/gulp-ignite-browserify)
* [eslint](https://github.com/jscarmona/gulp-ignite-eslint)
* [sass](https://github.com/jscarmona/gulp-ignite-sass)
* [sitecore](https://github.com/jscarmona/gulp-ignite-sitecore)

## contributing

Check out the [boilerplate](https://github.com/jscarmona/gulp-ignite-task-boilerplate)

## license

The MIT License (MIT)

Copyright (c) 2016 Javier Carmona

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
