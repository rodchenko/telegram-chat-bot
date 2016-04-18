//
// importing all needed libraries
//
import { Meteor } from 'meteor/meteor';
import TelegramBot from 'node-telegram-bot-api';


var telegram = new TelegramBot(Meteor.settings.telegram.token, {polling: true});
var text = Assets.getText('aristotel.txt');

telegram.on('message', Meteor.bindEnvironment(telegram_onmessage_callback));

var previousId;
function telegram_onmessage_callback(msg) {

  msg.createAt = new Date();
  console.log(msg);

  if(previousId == msg.chat.id+'-'+msg.message_id) return;
  previousId = msg.chat.id+'-'+msg.message_id;

  if(msg.text == "/start") {
    telegram.sendMessage(msg.chat.id, 'привет! я маркс-бот');
    // var text = 'первый вопрос?';
    // telegram.sendMessage(msg.chat.id, text);
    Messages.insert({chatId: msg.chat.id, question: text, createAt: new Date()});
  } else {

    var sentence = getSentence(msg.text);

    if (sentence === undefined) {
      telegram.sendMessage(msg.chat.id, "sorry, not found");
    } else {
      telegram.sendMessage(msg.chat.id, sentence);
    }

    // var text = 'второй вопрос?';
    // telegram.sendMessage(msg.chat.id, text);
    // var prev = Messages.findOne({chatId: msg.chat.id}, {sort: {createAt: -1}});
    // Messages.update(prev._id, {$set: {answer: msg}});
  }

}


function getSentence(word){

  var position = text.indexOf(' '+word);
  if (position < 0) {
    position = text.indexOf(word+' ');
  }
  if (position < 0) return;

  var rightPosition = text.indexOf('.', position);
  var leftPosition = text.lastIndexOf('.', position) + 1;

  if(rightPosition < 0) rightPosition = text.length;
  if(leftPosition < 0) leftPosition = 0;

  var sentence = text.slice(leftPosition, rightPosition) + '.';

  console.log('position', position, rightPosition, leftPosition, sentence);

  return sentence;
}

