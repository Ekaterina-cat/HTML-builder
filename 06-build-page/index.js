const { log } = require("console");
const fs = require("fs");
const path = require("path");

fs.mkdir(
  path.join(__dirname, "project-dist"),
  {recursive: true},
    (err) => {
      if (err) throw err;
    }
);

fs.mkdir(
  "06-build-page/project-dist/assets",
  {recursive: true},
    (err) => {
      if (err) throw err;
    }
);

fs.writeFile(
  path.join(__dirname, "project-dist", "index.html"), "",
    (err) => {
      if (err) throw err;      
    },
);

const regexp = /\{([a-zA-Z]+)\}/ig;
function replaceInFileHtml () {
  fs.readFile(
    path.join(__dirname, "template.html"), "utf-8",
    (err, data) => {
      if(err) throw err;      
      fs.readdir(
        path.join(__dirname, "components"), {withFileTypes:true},
        (err, fileHtmls) => {
          if(err) throw err;
          let arrFileReplaces = data.match(regexp);
          arrFileReplaces.forEach(arrFileReplace => {
          
          fileHtmls.forEach(fileHtml => {
          if(fileHtml.isFile()){
            fs.stat(`06-build-page/components/${fileHtml.name}`,
            (err) => {
              if(err) throw err;
              // console.log(arrFileReplace);
              let name = path.parse(fileHtml.name).name
              // console.log(name);
              let dataText;
              if(arrFileReplace === `{${name}}`){
                dataText = data.replace(`{${arrFileReplace}}`,
                fs.readFile(`06-build-page/components/${fileHtml.name}`, "utf-8",
                  (err, data) => {
                    if (err) throw err;
                    return;
                  }
                ));
                fs.writeFile(path.join(__dirname, "project-dist", "index.html"), dataText,
                (err) => {
                  if(err) throw err;
                });
              }
              
            })
          }
        })
      })
          
        }
      )
      
  });
}
replaceInFileHtml();

fs.writeFile(
  path.join(__dirname, "project-dist", "style.css"), "",
    (err) => {
      if (err) throw err;
    },
);

function fileInFolderStyle(){
  fs.readdir(path.join(__dirname, "styles"), {withFileTypes:true},
  (err, filesStyles) => {
    if(err) throw err;
    filesStyles.forEach(filesStyle => {
      if(filesStyle.isFile()){
        fs.stat(`06-build-page/styles/${filesStyle.name}`,
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          if(`${path.parse(filesStyle.name).ext}` === ".css"){
            fs.readFile(`06-build-page/styles/${filesStyle.name}`, "utf-8",
            (error,data) => {
              if(error) throw err;
              fs.appendFile(path.join(__dirname, "project-dist", "style.css"), data,
              (err) => {
                if(err) throw err;
            });
          });
          };
        });
      };
    })
  })
};
fileInFolderStyle();

function fileInFolderAssets () {
  fs.readdir(path.join(__dirname, "assets"),
    (err, folders) => {
      if(err) throw err; 
      folders.forEach(folder => {
        fs.mkdir(
          `06-build-page/project-dist/assets/${folder}`,
          {recursive: true},
            (err) => {
              if (err) throw err;
            }
        );
    fs.readdir(`06-build-page/assets/${folder}`,
      (err, fileInFolders) => {
        if(err) throw err;    
        fileInFolders.forEach(fileInFolder => {
          fs.copyFile(`06-build-page/assets/${folder}/${fileInFolder}`, `06-build-page/project-dist/assets/${folder}/${fileInFolder}`,
            (err) => {
              if(err) throw err;
           });
        })      
      }
    )     
  })  
});
};
fileInFolderAssets();