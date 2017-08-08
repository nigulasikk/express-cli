var express = require('express');
var router = express.Router();
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
    lyrics: String
});
/**
 * 这里可以定义Schema方法
 * @return {[type]} [description]
 */
SongSchema.methods.speak = function () {
  console.log('hello:' + this.name)
}
var Song = mongoose.model('Song', SongSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/**
 * 伪静态的尝试
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) 
 * * @return {[type]}       [description]
 */
router.get('/static.htm', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/songs', function(req, res, next) {
  Song.find(function (err, allSongs) {
    if (err) return console.error(err);
    res.render('songs', { title:'歌曲列表', songs: allSongs });
  })
});

router.get('/songDetail/:songId', function(req, res, next) {
  var songId = req.params.songId
  console.log(songId)
  Song.find({ _id: songId }, function (err, songDetail) {
    if (err) return console.error(err);
    res.render('songDetail', { title:'songDetail', song: songDetail[0] });
  })
});

// POST method route
router.post('/saveSong', function (req, res) {
  console.log(req.body)
  var littleCat = new Song({ name: req.body.name, lyrics: req.body.lyrics });
  littleCat.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('存储成功！')
    res.send('存储成功！')
  });
});

//搜索词库
router.get('/search', function (req, res) {
  res.send({message: 'success'})
  const exec = require('child_process').exec;
  var options={
    cwd: '/Users/kaijieqian/kkProject/express-cli/spider',
    env: process.env
  },
  child2 = exec("casperjs spider/searchSong.js " + req.query.keyWord,
    function (error, stdout, stderr) {
      if (error !== null) {
      } else {
        console.log('exec error: ' + error);
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
  });
});



module.exports = router;
