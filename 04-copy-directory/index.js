const fs = require('fs');
const path = require('path');

function copyDir () {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, err => {
    if(err) throw err;
  });
  
  fs.promises.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true})
  .then(files => {
    for (const file of files) {
      // let copyFile = path.join(__dirname, 'files-copy', file.name);
      fs.unlink((path.join(__dirname, 'files-copy', file.name)), err => {
        if(err) throw err;
        console.log(`Deleted ${file.name}`);
      });
    }
  });

  fs.promises.readdir(path.join(__dirname, 'files'), {withFileTypes: true})
  .then(files => {
  for (const file of files) {
  // let existFile = path.join(__dirname, 'files', file.name);
  // let copyFile = path.join(__dirname, 'files-copy', file.name);
    if (file.isFile()) {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), err => {
        if (err) throw err; 
        console.log(`Copied ${file.name}`);
      });
    }
  }});
};
copyDir();