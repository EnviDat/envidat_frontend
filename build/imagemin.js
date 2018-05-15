'use strict'
const ora = require('ora')
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const imageminSpinner = ora('minimize images for production...')

const inputDest = path.join(__dirname, '../dist/static/img/');
const outputDest = path.join(__dirname, '../dist/static/img/');

imageminSpinner.start()

imagemin([inputDest + '*.{jpg,png}'], outputDest, {
  plugins: [
    imageminJpegtran({progressive: true}),
    imageminPngquant({quality: '75'}),
  ],
  verbose: true,
}).then(files => {
  imageminSpinner.stop();
  console.log("Imagemin finished " + files.length);
  // console.log(files);

  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});

