const path = require("path");
const fs = require("fs");
const { readdir, copyFile, mkdir, rm } = require("fs/promises");
const { stdout } = require("process");
const copyForm = path.join(__dirname, "styles");
const copyToFile = path.join(__dirname, "files-copy", "bundle.css");
const output = fs.createWriteStream(copyToFile);

async function copyCSSFiles(copyForm, output) {
  try {
    const dirFiles = await readdir(copyForm, { withFileTypes: true });
    for (const el of dirFiles) {
      if (el.isFile() && path.extname(el.name) === ".css") {
        const stream = fs.createReadStream(
          path.join(__dirname, copyForm, el.name),
          "utf-8"
        );
        stream.on("data", (data) => {
          output.write(data);
        });
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
  /*   await rm(copyTo, { recursive: true, force: true });
  await mkdir(copyTo, { recursive: true }); */
  await copyCSSFiles(copyForm, output);
})();
