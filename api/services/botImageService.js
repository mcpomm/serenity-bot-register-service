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

function _download(bot, localPath, params, cb){
  if (params){
    localPath = localPath.replace('.png', '_detail.png');
  }
  let options = {
    url: urljoin(imageService, bot, params).replace(/\/$/, ""),
    dest: localPath
  }
  download.image(options)
    .then(({ filename, image }) => {
      cb(null, filename);
    }).catch((err) => {
      cb(err);
    });
};


function getImage(bot, cb){
  let file = path.join(localPath, `list_${bot}.png`);
  let images = {};
  _fileExist(file, (exist) => {
    if(exist){
      console.log(`list images for bot ${bot} already exist`);
      return cb(null, file);
    }
    _download(bot, file, null, (err, savedListFile) => {
      if(err){
        return cb(err)
      }
      images.listImage = savedListFile;
      _download(bot, file, '?bgset=bg2', (err, savedDetailFile) => {
        if(err){
          return cb(err)
        }
        images.detailImage = savedDetailFile;
        return cb(null, images)
      });
    });
  });
};

module.exports = Object.create({
  getImage
});
