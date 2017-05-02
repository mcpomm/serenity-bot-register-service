'use strict';
module.exports = function(app) {
  const botList = require('../controllers/botListController');


  // todoList Routes
  app.route('/bots')
    .get(botList.list_all_bots)
    .post(botList.create_a_bot);


  app.route('/bots/:botId')
    .get(botList.read_a_bot)
    .put(botList.update_a_bot)
    .delete(botList.delete_a_bot);
};