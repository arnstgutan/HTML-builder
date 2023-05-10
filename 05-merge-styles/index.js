const path = require("path");
const fs = require("fs");
const { readdir, copyFile, mkdir, rm } = require("fs/promises");
const { stdout } = require("process");

const copyForm = path.join(__dirname, "styles");
fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), "", (err) => {
  if (err) throw err;
});
const copyToFile = path.join(__dirname, "project-dist", "bundle.css");
const output = fs.createWriteStream(copyToFile);

async function copyCSSFiles(copyForm, output) {
  try {
    const dirFiles = await readdir(copyForm, { withFileTypes: true });
    for (const el of dirFiles) {
      if (el.isFile() && path.extname(el.name) === ".css") {
        const stream = fs.createReadStream(
          path.join(copyForm, el.name),
          "utf-8"
        );
        stream.on("data", (chunk) => output.write(chunk));
      }
    }
  } catch (error) {
    stdout.write(`Error: ${error.massage}\n`);
  }
}

(async function () {
  await copyCSSFiles(copyForm, output);
})();
