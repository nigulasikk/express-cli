var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(' mongo connected! open!')
});
var SongSchema = mongoose.Schema({
    name: String,
    photo: String,
    lyrics: String
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;