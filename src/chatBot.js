const listeners = [];
const emit = payload => {
  setTimeout(() => {
    listeners.forEach(fn => {
      fn(payload);
    });
  }, 450)
};
const welcomeBot = require('./botLogic')(emit);

module.exports = {
  /**
   * subscribes consumer to bot messages
   * @param  {Function} fn [description]
   * @return {[type]}      [description]
   */
  listen(fn) {
    listeners.push(fn);
  },

  /**
   * a user message to the bot
   * @param  {Object} data has text, maybe toher stuff
   */
  send(data) {
    welcomeBot.human(data.text);
  }
};