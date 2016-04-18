//
// importing all needed libraries
//
import { Meteor } from 'meteor/meteor';
import TelegramBot from 'node-telegram-bot-api';


var telegram = new TelegramBot(Meteor.settings.telegram.token, {polling: true});


telegram.on('message', Meteor.bindEnvironment(telegram_onmessage_callback));

var previousId;
function telegram_onmessage_callback(msg) {

  msg.createAt = new Date();
  console.log(msg);

  if(previousId == msg.chat.id+'-'+msg.message_id) return;
  previousId = msg.chat.id+'-'+msg.message_id;

  if(msg.text == "/start") {
    telegram.sendMessage(msg.chat.id, 'привет! мы собираем ответы');
    var text = 'первый вопрос?';
    telegram.sendMessage(msg.chat.id, text);
    Messages.insert({chatId: msg.chat.id, question: text, createAt: new Date()});
  } else {
    var text = 'второй вопрос?';
    telegram.sendMessage(msg.chat.id, text);
    var prev = Messages.findOne({chatId: msg.chat.id}, {sort: {createAt: -1}});
    Messages.update(prev._id, {$set: {answer: msg}});
  }

}
