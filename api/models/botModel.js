
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let BotSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: 'unknown'
  },
  ip: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: 'offline'
  },
  control: {
    type: Boolean,
    default: false
  },
  remote: {
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Bots', BotSchema);
