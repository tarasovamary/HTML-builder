const fs = require('fs');
const path = require('path');
const projectFolder = (path.join(__dirname, 'project-dist')); 

async function createHTML() {
  await fs.promises.rm(path.join(projectFolder), {recursive:true, force:true});
  await fs.promises.mkdir((projectFolder), {recursive:true});
  const writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'), 'utf-8');
  const files = await fs.promises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
  for (const file of files) {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.on('data', data => writeableStream.write(data));
    };
  }
  let templateFile = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
  const componentsFolder = await fs.promises.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
  for (const file of componentsFolder) {
      if (file.isFile() && path.extname(path.join(__dirname, 'components', file.name)) === '.html') {
          let htmlFile = await fs.promises.readFile(path.join(__dirname, 'components', file.name));
          templateFile = templateFile.replace(`  {{${file.name.split('.')[0]}}}`, htmlFile);
      }
  }
  await fs.promises.writeFile(path.join(__dirname, 'project-dist/index.html'), templateFile);
  
  async function copyDir(input, output) {
    const assetsFolder = await fs.promises.readdir(input, { withFileTypes: true });
    await fs.promises.mkdir(output, { recursive: true });
    for (file of assetsFolder) {
        if (file.isDirectory()) {
            await copyDir(path.join(input , file.name), path.join(output, file.name));
        } else {
            await fs.promises.copyFile(path.join(input , file.name), path.join(output, file.name));
        }
    }
}
copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets'));
}

createHTML();