# gulp-ignite

### WIP &mdash; Nowhere even close to usable.

However if you dare feel brave you can try it like so:

```js
import ignite from 'gulp-ignite';
import browserify from 'gulp-ignite-browserify';

const tasks = [
  browserify,
];

let options = {
  browserify: {
    src:      './src/js/index.js',
    dest:     './public/js',
    filename: 'main.js'
  }
}

ignite.start(tasks, options);
```
