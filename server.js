'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Botdb');
require('./api/models/botListModel');

const routes = require('./api/routes/botListRoutes');
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);


function start(client){
  setInterval(function(){
    client.emit('broad', "Bot registered " + Math.random())
  }, 1000);
}

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('messages', function(data) {
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
  });
  start(client);
});

server.listen(3000);

console.log('todo list RESTful API server started on: ' + port);