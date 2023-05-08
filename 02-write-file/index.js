const path = require("path");
const fs = require("fs");
const { stdin, stdout, exit } = process;

const file = path.join(__dirname, "output.txt");
const output = fs.createWriteStream(file);

stdout.write("Введиие текст\n");

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    exit();
  }
  output.write(data);
});

process.on("exit", () => stdout.write("Удачи в изучении Node.js!"));
