# gulp-ignite

### WIP &mdash; No work even close to usable.

However if you dare feel brave you can try it like so:

```js
import ignite from 'gulp-ignite';

let options = {
  browserify: {
    src:      './src/js/index.js',
    dest:     './public/js',
    filename: 'main.js'
  }
}

// Include all tasks
ignite.all(options);

// Include specific tasks by task name
ignite.only(['browserify'], options);

// Include all tasks except by task name
ignite.except(['browserify'], options);
```
