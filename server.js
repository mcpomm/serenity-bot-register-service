'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./db').connect;

const routes = require('./api/routes/botRoutes');
const BotPusher = require('./push_services/bot');
const BotListPusher = require('./push_services/botlist');
const bodyParser = require('body-parser');
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);



io.on('connection', function(client) {
  let botPusher = new BotPusher(client);
  let botListPusher = new BotListPusher(client);

  client.on('getBotList', function(data) {
    console.log('botList required');
    botListPusher.push();
  });

  botPusher.push('bot1');
});

server.listen(3000);

console.log('todo list RESTful API server started on: ' + 3000);