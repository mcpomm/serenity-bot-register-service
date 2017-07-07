'use strict'

const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const urljoin = require('url-join');


const imageService = 'https://robohash.org/';
const localPath = './assets/images/bots';

function _fileExist(path, cb){

  fs.access(path, fs.constants.R_OK, (err) => {
    if(err){
      return cb(false);
    }
    return cb(true);
  });
};

function _download(bot, localPath, cb){
  let options = {
    url: urljoin(imageService, bot),
    dest: localPath
  }
  download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename)
      cb(null, filename);
    }).catch((err) => {
      console.log(options);
      cb(err);
    });
};


function getListImage(bot, cb){
  let file = path.join(localPath, `list_${bot}.png`);
  _fileExist(file, (exist) => {
    if(exist){
      console.log(`list images for bot ${bot} exist`);
      return cb(null, file);
    }
    // return cb(`list images for bot ${bot} doesn't exist`);
    _download(bot, file, (err, savedFile) => {
      if(err){
        return cb(err)
      }
      return cb(null, savedFile)
    });
  });
};

module.exports = Object.create({
  getListImage
});
