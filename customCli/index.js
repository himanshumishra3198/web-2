const { Command } = require("commander");
const program = new Command();
const fs = require("fs");

program.name("count words").description("CLI to read file").version("0.8.0");

program
  .command("count_words")
  .description("counts the words in given file")
  .argument("<file>", "file to count words")
  .action((file) => {
    fs.readFile(file, "utf-8", function (err, data) {
      //   const words = data.split("");
      console.log(data.split(" ").length);
    });
  });

program
  .command("count_sentences")
  .description("counts the number of sentences in given file")
  .argument("<file>", "file to count words")
  .action((file) => {
    fs.readFile(file, "utf-8", function (err, data) {
      //   const words = data.split("");
      console.log(data.split("\n").length);
    });
  });
program.parse();
