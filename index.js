const {spawn, spawnSync} = require("child_process");
const apng2gifBinPath = require("apng2gif-bin");

function parseArgs(inPath, outPath = null, options = {}) {
  const args = [inPath];

  if (outPath != null) {
    args.push(outPath);
  }
  if (options.transparencyThreshold) {
    args.push("-t");
    args.push(options.transparencyThreshold);
  }
  if (options.backgroundColor) {
    args.push("-b");
    args.push(options.backgroundColor);
  }

  return args;
}

const defaultOptions = {
  stdio: 'ignore',
  windowsHide: true,
};

function apng2gif(inPath, outPath, options) {
  const args = parseArgs(inPath, outPath, options);

  return new Promise((resolve, reject) => {
    const child = spawn(apng2gifBinPath, args, Object.assign({}, defaultOptions, options));
    child.on("error", (err) => {
      reject(err);
    });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject("Subprocess failed: " + code);
      }
    });
  });
}

apng2gif.sync = function apng2gifSync(inPath, outPath, options = {}) {
  const args = parseArgs(inPath, outPath, options);

  const {status, error} = spawnSync(apng2gifBinPath, args, Object.assign({}, defaultOptions, options));
  if (error) {
    throw error;
  } else {
    if (status === 0) {
      return;
    } else {
      throw new Error("Subprocess failed: " + status);
    }
  }
}

module.exports = apng2gif;