'use strict';

const Promise = require('bluebird');
const request = require('request');

class BotListPusher {

  constructor(client) {
    this.client = client;
  }

  push() {
    let client = this.client
    request('http://localhost:3000/bots', (err, bots) => {
      if(err){
        return console.log(err);
      }
      console.log(bots.body);
    })
  }

};

module.exports = BotListPusher;