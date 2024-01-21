const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
fs.writeFile(path.join(__dirname, "version.txt"), "Create new file!",
(err) => {
  if(err) throw err;
  console.log("Hello, student!");
});
stdin.on("data", (info) => {
  const newTextEntry = info.toString();
  fs.appendFile(path.join(__dirname, "version.txt"), `\nYou introduced: ${newTextEntry}`,
    function (error) {
      if(error) throw error;
      if (`${newTextEntry}` === "exit") {
        process.exit();
      }
    });        
});

process.on("SIGINT", () => {
  process.exit();
});
process.on("exit", () => stdout.write("Thank You! Goodbye! Good luck with your studies!"));
