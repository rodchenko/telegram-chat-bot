import { Meteor } from 'meteor/meteor';
import TelegramBot from 'node-telegram-bot-api';

Meteor.startup(() => {
  // true
  // "ffasdfaa adf adf"
  // 'e'
  // var value = 121323223 + "string" // "121323223string"
  // {
  //   key: function() {
  //     return;
  //   }
  // }
  console.log( "photo please".indexOf('photo') );
});

var token = '191390975:AAG2c4_JHIRtH7Jq4s2ogEzgzS7pAC-QeSw';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
  // console.log(msg);
  var chatId = msg.chat.id;
  if(msg.text.toLowerCase().indexOf('photo') >= 0) {
    bot.sendMessage(chatId, "no photo");
  } else {
    // bot.sendMessage(chatId, "");
  }
});