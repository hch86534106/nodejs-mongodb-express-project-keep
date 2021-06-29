var express = require('express');
var router = express.Router();
var model = require('../model')
var URL = require('url'); //引入URL中间件，获取req中的参数需要
var db = require('../db'); //引入对象
var UsersModel = db.user;
var OrderModel = db.order;
var TrainModel = db.trainer;
var NewModel = db.news;
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.post('/edit_news',function(req, res) {
    var news = new NewModel({ 
        coach_id: req.session.coach._id, //定义一个属性发布人的id
        title: req.body.title, //定义一个属性标题，类型为String
        src: 'assets/images/body-builder/07.jpg', //定义图片路径
        content: req.body.content, //定义内容
      });
      news.save(function(err){
          if(err) console.log('发表新闻时报错')
      })
    res.redirect('/news')
  });