const path = require("path");
const { readdir, copyFile, mkdir, rm } = require("fs/promises");
const { stdout } = require("process");
const copyForm = path.join(__dirname, "files");
const copyTo = path.join(__dirname, "files-copy");

async function copy(copyForm, copyTo) {
  try {
    const dirFiles = await readdir(copyForm, { withFileTypes: true });
    for (const el of dirFiles) {
      if (el.isFile()) {
        await copyFile(
          path.join(copyForm, el.name),
          path.join(copyTo, el.name)
        );
      } else if (el.isDirectory()) {
        await mkdir(path.join(copyForm), el.name);
        await copy(path.join(copyForm, el.name), path.join(copyTo, el.name));
      }
    }
  } catch (error) {
    stdout.write(`Error: ${error.massage}\n`);
  }
}

(async function () {
  await rm(copyTo, { recursive: true, force: true });
  await mkdir(copyTo, { recursive: true });
  await copy(copyForm, copyTo);
})();
