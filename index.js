import fs from "node:fs";

const commands = ["a", "append", "r", "read"];
const cliInput = process.argv.slice(2);
const outputFile = "output.txt";

cliInput.forEach((input, index) => {
  if (commands.includes(input)) {
    console.log(`Processing ${input}...`);
    if ((input == "a") | (input == "append")) {
      if (cliInput[index + 1]) {
        if (!fs.existsSync(outputFile)) {
          console.log("Creating file: 'output.txt'");
        }
        try {
          fs.appendFile(outputFile, `\n${cliInput[index + 1]}`, (err) => {
            if (err) {
              throw new Error(err);
            }
            console.log(`Appended: ${cliInput[index + 1]} to output.txt`);
          });
        } catch (err) {
          throw new Error(err);
        }
      } else {
        console.log(`No argument provided for ${cliInput[index]}`);
      }
    }

    if ((input == "r") | (input == "read")) {
      if (cliInput[index + 1]) {
        if (fs.existsSync(cliInput[index + 1])) {
          try {
            fs.readFile(cliInput[index + 1], "utf-8", (err, data) => {
              if (err) {
                throw new Error(err);
              } else {
                console.log(data);
              }
            });
          } catch (err) {
            throw new Error(err);
          }
        } else {
          console.log(`File path doesn't exist at ${cliInput[index + 1]}`);
        }
      } else {
        try {
          if (fs.existsSync(outputFile)) {
            fs.readFile(outputFile, "utf-8", (err, data) => {
              if (err) {
                throw new Error(err);
              }
              console.log(data);
            });
          } else {
            console.log(
              `No argument provided for ${cliInput[index]} or output.txt doesn't exist.`,
            );
          }
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  } else if (commands.includes(cliInput[index - 1])) {
  } else {
    console.log(`Incorrect arg at ${index}: ${cliInput[index]}`);
  }
});
