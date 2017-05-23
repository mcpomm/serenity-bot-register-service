'use strict';


const mongoose = require('mongoose');
const Bot = mongoose.model('Bots');
const axon = require('axon');
const socket = axon.socket('push');
const debug = require('debug')('Serenity:Bot:RegiserService:botController');

socket.connect(3010);

exports.list_all_bots = function(req, res) {
  Bot.find({}, function(err, Bot) {
    if (err)
      res.send(err);
    res.json(Bot);
  });
};


exports.create_a_bot = function(req, res) {
  debug('create a bot', req.body);
  let new_bot = new Bot(req.body);
  new_bot.save(function(err, Bot) {
    if (err)
      res.send(err);
    socket.send(JSON.stringify({message:"pushBotList"}));
    res.json(Bot);
  });
};


exports.read_a_bot = function(req, res) {
  Bot.findById(req.params.BotId, function(err, Bot) {
    if (err)
      res.send(err);
    res.json(Bot);
  });
};


exports.update_a_bot = function(req, res) {
  Bot.findOneAndUpdate(req.params.BotId, req.body, {new: true}, function(err, Bot) {
    if (err)
      res.send(err);
    res.json(Bot);
  });
};


exports.delete_a_bot = function(req, res) {
  Bot.remove({
    _id: req.params.BotId
  }, function(err, Bot) {
    if (err)
      res.send(err);
    res.json({ message: 'Bot successfully deleted' });
  });
};