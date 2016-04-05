//
// importing all needed libraries
//
import { Meteor } from 'meteor/meteor';
import TelegramBot from 'node-telegram-bot-api';
import Flickr from 'flickrapi';


//
// initialize telegram api
//
var telegram = new TelegramBot(Meteor.settings.telegram.token, {polling: true});


//
// initialize flickr api
//
Flickr.tokenOnly(Meteor.settings.flickr, flickr_initialized_callback);


//
// callback fired on flickr initialization
//
function flickr_initialized_callback(error, flickr) {
  if(error || typeof flickr == 'undefined') throw new Error(error);

  telegram.on('message', _.partial(telegram_onmessage_callback, flickr));
}


var previousId;
function telegram_onmessage_callback(flickr, msg) {
  // console.log(msg);

  if(previousId == msg.chat.id+'-'+msg.message_id) return;
  previousId = msg.chat.id+'-'+msg.message_id;

  flickr.photos.search({text: msg.text}, _.partial(flickr_search_callback, telegram, msg));
}


function flickr_search_callback(telegram, msg, err, result) {
  if(err) throw new Error(err);

  var photo = result.photos.photo[1]
  if(typeof photo == 'undefined') {
    telegram.sendMessage(msg.chat.id, 'no photos found');
  } else {
    var link = 'http://www.flickr.com/photos/' + photo.id + "_" + photo.secret + ".jpg";
    telegram.sendMessage(msg.chat.id, '<a href="'+link+'">'+msg.text+'!</a>', {parse_mode: "HTML"});
    console.log('request: "' + msg.text + '", sent to user:', 'http://www.flickr.com/photos/' + photo.id + "_" + photo.secret + ".jpg");
  }
}

