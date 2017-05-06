
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let BotSchema = new Schema({
  title: {
    type: String,
    index: true,
    Required: 'Kindly enter the title of the bot'
  },
  ip: {
    type: String,
    default: 'unknown'
  },
  status: {
    type: String,
    default: 'offline'
  }
});

module.exports = mongoose.model('Bots', BotSchema);