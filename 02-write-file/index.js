const fs = require('fs');
const path = require('path');
const process = require('node:process');
const { stdin, stdout } = process;
fs.writeFile(
  path.join(__dirname, '02-write-file.txt'),
  'Create new file!',
  (err) => {
    if (err) throw err;
    console.log('Hello, student!');
  },
);
stdin.on('data', (info) => {
  const newTextEntry = info.toString();
  if (newTextEntry.trim() === 'exit') {
    process.exit();
  }
  fs.appendFile(
    path.join(__dirname, '02-write-file.txt'),
    `\nYou introduced: ${newTextEntry}`,
    function (error) {
      if (error) throw error;
    },
  );
});
process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () =>
  stdout.write('Thank You! Goodbye! Good luck with your studies!'),
);
