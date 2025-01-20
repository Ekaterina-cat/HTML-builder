const fs = require('fs');
const path = require('path');
function readFolder() {
  fs.readdir(
    '03-files-in-folder/secret-folder',
    { withFileTypes: true },
    (err, fileInFolder) => {
      if (err) throw err;
      fileInFolder.forEach((fileInFolder) => {
        if (fileInFolder.isFile()) {
          fs.stat(
            `03-files-in-folder/secret-folder/${fileInFolder.name}`,
            (err, stats) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(
                `${path.parse(fileInFolder.name).name}
                -- ${path.parse(fileInFolder.name).ext}
                        -- ${Number(stats.size) / 1000} kB`,
              );
            },
          );
        }
      });
    },
  );
}
readFolder();
