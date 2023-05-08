const path = require("path");
const { readdir, stat } = require("fs/promises");
const { stdout } = require("process");

const sectetFolder = path.join(__dirname, "secret-folder");

(async function (dir) {
  try {
    const dirFiles = await readdir(dir, { withFileTypes: true });
    for (const el of dirFiles) {
      if (el.isFile()) {
        const stats = await stat(path.join(dir, el.name));
        stdout.write(
          `\n${path.parse(el.name).name} - ${path.extname(el.name)} - ${
            stats.size
          } b`
        );
      }
    }
  } catch (error) {
    stdout.write(`Error: ${error.massage}\n`);
  }
})(sectetFolder);
