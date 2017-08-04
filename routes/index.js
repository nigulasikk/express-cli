var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('open!')
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/**
 * 伪静态的尝试
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {             res.render('index', { title: 'Express' });} [description]
 * @return {[type]}       [description]
 */
router.get('/static.html', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST method route
router.post('/saveSong', function (req, res) {
  console.log(req.body)
  res.send('get request to the homepage')
});

module.exports = router;
