/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '/*Style File*/',
  (err) => {
    if (err) throw err;
  },
);

function fileFolder() {
  fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file.isFile()) {
          fs.stat(`05-merge-styles/styles/${file.name}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            if (`${path.parse(file.name).ext}` === '.css') {
              fs.readFile(
                `05-merge-styles/styles/${file.name}`,
                'utf-8',
                (error, data) => {
                  if (error) throw err;
                  fs.appendFile(
                    path.join(__dirname, 'project-dist', 'bundle.css'),
                    data,
                    (err) => {
                      if (err) throw err;
                    },
                  );
                },
              );
            }
          });
        }
      });
    },
  );
}
fileFolder();
