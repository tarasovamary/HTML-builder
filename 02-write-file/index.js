const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = require('process');

const pathFile = path.join(__dirname,'text.txt');
const writableStream = fs.createWriteStream(pathFile, 'utf-8');

stdout.write('Привет! Введи в консоль любой текст и я запишу его в файл. \n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
      stdout.write('Успехов в обучении в RS Scholl!');
      exit();
    }
  writableStream.write(data);
})

