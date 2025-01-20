/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir('06-build-page/project-dist/assets', { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
  if (err) throw err;
});

function replaceInFileHtml() {
  fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, dataBasicFile) => {
      if (err) throw err;

      fs.readdir(
        path.join(__dirname, 'components'),
        { withFileTypes: true },
        (err, fileTags) => {
          if (err) throw err;

          let filesRead = 0;
          let totalFiles = fileTags.filter(fileTag => fileTag.isFile()).length;

          fileTags.forEach((fileTag) => {
            if (fileTag.isFile()) {
              fs.readFile(
                path.join(__dirname, 'components', fileTag.name),
                'utf-8',
                (err, add) => {
                  if (err) throw err;

                  dataBasicFile = dataBasicFile.replace(
                    `{{${fileTag.name.split('.')[0]}}}`,
                    add
                  );

                  filesRead++;
                  if (filesRead === totalFiles) {
                    fs.writeFile(
                      path.join(__dirname, 'project-dist', 'index.html'),
                      dataBasicFile,
                      (err) => {
                        if (err) throw err;
                      }
                    );
                  }
                }
              );
            }
          });
        }
      );
    }
  );
}
replaceInFileHtml();

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  if (err) throw err;
});

function fileInFolderStyle(){
  fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, filesStyles) => {
      if (err) throw err;
      filesStyles.forEach((filesStyle) => {
        if (filesStyle.isFile()) {
          fs.stat(`06-build-page/styles/${filesStyle.name}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            if (`${path.parse(filesStyle.name).ext}` === '.css') {
              fs.readFile(
                `06-build-page/styles/${filesStyle.name}`,
                'utf-8',
                (error, data) => {
                  if (error) throw err;
                  fs.appendFile(
                    path.join(__dirname, 'project-dist', 'style.css'),
                    data,
                    (err) => {
                      if (err) throw err;
                    }
                  );
                }
              );
            };
          });
        };
      });
    },
  );
};
fileInFolderStyle();

function fileInFolderAssets() {
  fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
    if (err) throw err; 
    folders.forEach((folder) => {
      fs.mkdir(
        `06-build-page/project-dist/assets/${folder}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      fs.readdir(`06-build-page/assets/${folder}`, (err, fileInFolders) => {
        if (err) throw err;
        fileInFolders.forEach((fileInFolder) => {
          fs.copyFile(
            `06-build-page/assets/${folder}/${fileInFolder}`,
            `06-build-page/project-dist/assets/${folder}/${fileInFolder}`,
            (err) => {
              if (err) throw err;
            },
          );
        });
      });
    });
  });
};
fileInFolderAssets();
