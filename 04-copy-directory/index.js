const fs = require("fs");
const path = require("path");

fs.readdir(path.join(__dirname, "files-copy"), 
  (err, docs) => { 
    if (err) throw err;
      docs.forEach(doc => {
        fs.unlink(path.join(__dirname, "files-copy", doc), 
        (err) => {
          if(err) throw err;          
        });
      });
});

fs.mkdir(
  path.join(__dirname, "files-copy"),
  {recursive: true},
    (err) => {
      if (err) throw err;
    }
);

fs.readdir(path.join(__dirname, "files"), 
  (err, docs) => { 
    if (err) throw err;
      docs.forEach(doc => {
        fs.copyFile(path.join(__dirname, "files", doc), path.join(__dirname, "files-copy", doc),
        (err) => {
          if(err) throw err;
        });
      });
});