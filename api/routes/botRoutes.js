'use strict';
module.exports = function(app) {
  const bot = require('../controllers/botController');


  // todoList Routes
  app.route('/bots')
    .get(bot.list_all_bots)
    .post(bot.create_a_bot);


  app.route('/bots/:botId')
    .get(bot.read_a_bot)
    .put(bot.update_a_bot)
    .delete(bot.delete_a_bot);
};