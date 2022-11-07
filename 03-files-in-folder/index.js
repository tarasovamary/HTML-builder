const fs = require('fs');
const path = require('path');

fs.promises.readdir((path.join(__dirname,'secret-folder')), {withFileTypes: true})

.then(filenames => {
  for (let filename of filenames) {
    if(filename.isFile()) {
      const pathFile = path.join(__dirname,'secret-folder', filename.name);
      const nameFile = path.basename(pathFile);
      const extFile = path.extname(pathFile);
      fs.promises.stat(pathFile)
      .then(result => {
        console.log(`${nameFile.split('.')[0]} - ${extFile.replace('.', '')} - ${(result.size/1024).toFixed(3)} kb`);
      })
    }
  }
})