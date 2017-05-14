'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);



require('./db').connect;

const routes = require('./api/routes/botRoutes');

const bodyParser = require('body-parser');
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

server.listen(3000);


console.log('todo list RESTful API server started on: ' + 3000);