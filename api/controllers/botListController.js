'use strict';


const mongoose = require('mongoose');
const Bot = mongoose.model('Bots');

exports.list_all_bots = function(req, res) {
  Bot.find({}, function(err, Bot) {
    if (err)
      res.send(err);
    res.json(Bot);
  });
};


exports.create_a_bot = function(req, res) {
  var new_bot = new Bot(req.body);
  new_bot.save(function(err, Bot) {
    if (err)
      res.send(err);
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