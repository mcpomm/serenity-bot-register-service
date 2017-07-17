'use strict';


const mongoose = require('mongoose');
const Bot = mongoose.model('Bots');
const axon = require('axon');
const socket = axon.socket('push');
const debug = require('debug')('Serenity:Bot:RegiserService:botController');
const BotImageService = require('../services/botImageService')

socket.connect(3010);

exports.list_all_bots = function(req, res) {
  Bot.find({}, function(err, Bot) {
    if (err){
      return res.send(err);
    }
    return res.json(Bot);
  });
};


exports.create_a_bot = function(req, res) {
  debug('create a bot', req.body);
  _setImages(req.body, (err) => {
    let new_bot = new Bot(req.body);
    new_bot.save(function(err, Bot) {
      if (err){
        return res.send(err);
      }
      socket.send(JSON.stringify({message:"pushBot", botId:Bot._id}));
      return res.json(Bot);
    });
  });
};


exports.read_a_bot = function(req, res) {
  debug("req.params.BotId", req.params);
  Bot.findById(req.params.botId, function(err, Bot) {
    if (err){
      return res.send(err);
    }
    return res.json(Bot);
  });
};


exports.update_a_bot = function(req, res) {
  Bot.findByIdAndUpdate(req.params.botId, req.body, {new: true}, function(err, Bot) {
    console.log("BotId",req.params.botId);
    console.log("update Bot", Bot);
    if (err){
      return res.send(err);
    }
    socket.send(JSON.stringify({message:"updateBot", botId:Bot._id}));
    return res.json(Bot);
  });
};


exports.delete_a_bot = function(req, res) {
  Bot.remove({
    _id: req.params.botId
  }, function(err, Bot) {
    if (err){
      return res.send(err);
    }
    return res.json({ message: 'Bot successfully deleted' });
  });
};


const _setImages = (data, cb) => {
  BotImageService.getImage(data.title, function(err, images){
    if(err){
      return cb(err);
    }
    data.listImage = images.listImage;
    data.detailImage = images.detailImage;
    return cb(null);
  });
}
