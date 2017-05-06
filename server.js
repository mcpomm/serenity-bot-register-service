'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./db').connect;

const routes = require('./api/routes/botListRoutes');
const BotPusher = require('./push_services/bot');
const bodyParser = require('body-parser');
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);


// function start(client){
//   setInterval(function(){
//     client.emit('broad', "Bot registered " + Math.random())
//   }, 1000);
// }

io.on('connection', function(client) {
  let botPusher = new BotPusher(client);

  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('messages', function(data) {
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
  });
  //start(client);
  botPusher.push('bot1');
});

server.listen(3000);

console.log('todo list RESTful API server started on: ' + 3000);