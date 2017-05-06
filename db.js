'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./api/models/botListModel');
exports.connect = mongoose.connect('mongodb://localhost/Botdb');
