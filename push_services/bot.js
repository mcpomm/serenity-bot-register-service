class BotPusher {

  constructor(client) {
    this.client = client;
  }

  push(bot) {
    let client = this.client
    setInterval(function(){
      client.emit('broad', `${bot} registered ${Math.random()}`)
    }, 1000);
  }

};

module.exports = BotPusher;