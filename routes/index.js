var express = require('express');
var router = express.Router();
var Song = require('../model/Song');

router.get('/', function(req, res, next) {
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
  Song.find({ name: req.body.name }, function (err, songByName) {
    if (err) return console.error(err);
    /**
     * 检查歌曲是否已在数据库里
     * @param  {[type]} songByName.length >             0 [description]
     * @return {[type]}                   [description]
     */
    if (songByName.length > 0) {
      console.log('此歌曲已录入--'+req.body.name)
      res.send('此歌曲已录入--'+req.body.name)
    } else {
      /**
       * 歌曲录入
       * @type {Song}
       */
      var littleSong = new Song({ name: req.body.name, lyrics: req.body.lyrics, photo: req.body.photo  });
      littleSong.save(function (err, fluffy) {
        if (err) return console.error(err);
        console.log('录入歌曲成功！--'+req.body.name)
        res.send('录入歌曲成功！--'+req.body.name)
      });
    }
  })
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
