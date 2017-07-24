'use strict'

const path = require('path');
const download = require('image-downloader');
const urljoin = require('url-join');
const Promise = require('bluebird');

const imageService = 'https://robohash.org/';
const localPath = './assets/images/bots';

function _download(bot, localPath, params, cb){
  if (params){
    localPath = localPath.replace('.png', '_detail.png').replace('list_', '');
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
  let download = Promise.promisify(_download);
  let file = path.join(localPath, `list_${bot}.png`);
  let images = {};

  download(bot, file, null)
    .then(savedListFile => {
      images.listImage = savedListFile.replace('assets/','http://localhost:3000/');
      return download(bot, file, '?bgset=bg2')
    })
    .then(savedDetailFile => {
      images.detailImage = savedDetailFile.replace('assets/','http://localhost:3000/');
      return cb(null, images)
    })
    .catch(e => {
      return cb(e);
    });
};

module.exports = Object.create({
  getImages
});
