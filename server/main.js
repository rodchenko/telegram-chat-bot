import { Meteor } from 'meteor/meteor';
import TelegramBot from 'node-telegram-bot-api';
import Flickr from 'flickrapi';

var flickr;
Flickr.tokenOnly({
  api_key: "720dc6be11c683f7351772045c4ed4c9",
  secret: "1f8ec837ddc37e06"
}, function(error, result) {
  flickr = result;
});

var token = '191390975:AAG2c4_JHIRtH7Jq4s2ogEzgzS7pAC-QeSw';
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {

  // console.log(msg);
  var chatId = msg.chat.id;

  flickr.photos.search({
    text: msg.text
  }, function(err, result) {
    if(err) { throw new Error(err); }
    var photo = result.photos.photo[1]
    console.log('result', 'http://www.flickr.com/photos/' + photo.id + "_" + photo.secret + ".jpg");
    console.log('result', 'http://www.flickr.com/photos/eric/'+photo.id+'/');
    // http://www.flickr.com/photos/132375_0ca82ae31e.jpg
    var link = 'http://www.flickr.com/photos/' + photo.id + "_" + photo.secret + ".jpg";
    bot.sendMessage(chatId, '<a href="'+link+'">'+photo.title+'</a>', {parse_mode: "HTML"});
  });

});