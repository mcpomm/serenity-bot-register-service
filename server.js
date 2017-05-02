'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Botdb');
require('./api/models/botListModel');

const routes = require('./api/routes/botListRoutes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);