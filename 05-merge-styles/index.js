const fs = require('fs');
const path = require('path');

const writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'), 'utf-8');

fs.promises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
.then(files => {
  for (const file of files) {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.on('data', data => writeableStream.write(data));
    }
  }
})


