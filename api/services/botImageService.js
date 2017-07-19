'use strict'

const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const urljoin = require('url-join');
const Promise = require('bluebird');
const imageService = 'https://robohash.org/';
const localPath = './assets/images/bots';

function _fileExist(path, cb){
  fs.access(path, fs.constants.R_OK, (err) => {
    if(err){
      return cb(null, false);
    }
    return cb(null, true);
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


function getImages(bot, cb){
  let fileExist = Promise.promisify(_fileExist);
  let download = Promise.promisify(_download);
  let file = path.join(localPath, `list_${bot}.png`);
  let images = {};

  fileExist(file)
    .then(exist => {
      console.log("exist", exist);
      return download(bot, file, null)
    })
    .then(savedListFile => {
      console.log("list", savedListFile);
      images.listImage = savedListFile;
      return download(bot, file, '?bgset=bg2')
    })
    .then(savedDetailFile => {
      console.log("detail", savedDetailFile);
      images.detailImage = savedDetailFile;
      console.log("images",images);
      return cb(null, images)
    })
    .catch(e => {
      return cb(e);
    });
};

module.exports = Object.create({
  getImages
});
