# `apng2gif`

Node wrapper around [`apng2gif`](http://apng2gif.sourceforge.net/). Supports Windows, Mac, and Linux.

## Usage

```js
const apng2gif = require("apng2gif");

const promise = apng2gif("file.png", "file.gif");
promise.then(() => {
  // file.gif exists
});

apng2gif.sync("file.png", "file2.gif");
// file2.gif exists

const options = {
  backgroundColor: "#ff0000",
};
apng2gif("file.png", "file.gif", options);
// or: apng2gif.sync("file.png", "file.gif", options);

const options2 = {
  transparencyThreshold: 256
};
apng2gif("file.png", "file.gif", options2);
// or: apng2gif.sync("file.png", "file.gif", options2);
```

## API

### `apng2gif(inputPath[, outputPath[, options]]) => Promise`

Convert the animated PNG at `inputPath` to GIF and write it to `outputPath`.
Returns a Promise which is resolved when `outputPath` exists.

If `outputPath` is omitted, it defaults to `inputPath` but with ` .gif` extension.

#### `options`

- `backgroundColor` - Background color string to blend semi-transparent pixels with (`#rrggbb` format).
- `transparencyThreshold` - Threshold against which to omit transparent pixels (0-256).

You may also pass any valid [`child_process.spawn` options](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options), notably:
- `cwd` - Directory to run `apng2gif` in

### `apng2gif.sync(inputPath[, outputPath[, options]]) => undefined`

Synchronously convert the animated PNG at `inputPath` to GIF and write it to `outputPath`.

If `outputPath` is omitted, it defaults to `inputPath` but with ` .gif` extension.

#### `options`

- `backgroundColor` - Background color string to blend semi-transparent pixels with (`#rrggbb` format).
- `transparencyThreshold` - Threshold against which to omit transparent pixels (0-256).

You may also pass any valid [`child_process.spawnSync` options](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options), notably:
- `cwd` - Directory to run `apng2gif` in

## License

MIT