var express = require('express');
const { connect } = require('mongodb');
var async = require('async');
var router = express.Router();
var model = require('../model')
var Session = require('../session')
var session = require('express-session')
var db = require('../db'); //引入对象
var UsersModel = db.user;
var OrderModel = db.order;
var TrainModel = db.trainer;
var NewModel = db.news;
/* GET home page.主页*/
router.get('/', function(req, res) {
  model.connect(function(db){
    db.collection('users').find().toArray(function(err,docs){
      // console.log('用户列表',docs)
      res.render('index', { title: '超市后台管理系统' });
    })
  })
});

//渲染注册页
router.get('/regist',function(req,res,next){
  res.render('regist',{})
})
//渲染登录页
router.get('/login',function(req,res,next){
  res.render('login',{})
})
//渲染教练页
router.get('/trainers',function(req,res,next){
  res.render('trainers',{})
})
//渲染教练信息页
router.get('/coach_info',function(req,res,next){
  res.render('coach_info',{coach: req.session.coach})
})
//渲染课程信息页
router.get('/classes',function(req,res,next){
  res.render('classes',{})
})
//渲染场馆信息页
router.get('/places',function(req,res,next){
  res.render('places',{})
})
//渲染活动新闻页
router.get('/news',function(req,res,next){
  var newlist= []
  NewModel.find(function(err,docs){
    if(err) {
      console.log('查询错误 news')
    }
      
      if(docs.length>0) 
      {
        async function a (docs){
          docs.forEach(element => {
            var obj = new Object();
            TrainModel.findOne({_id:element.coach_id},function(err,doc){
              
              obj.coachname = doc.name
              obj.title = element.title
              obj.content = element.content
              obj.src=element.src
              newlist.push(obj)
            })
          });
         setTimeout(() => {
          res.render('news',{news:newlist,coach: req.session.coach})
         }, 500);
          
      }
      a(docs);
        
        
      } 
    })
})
//渲染关于页
router.get('/about',function(req,res,next){
  res.render('about',{})
})
//渲染个人信息页
router.get('/user_info',function(req,res,next){
  res.render('user_info',{user: req.session.user});
})
router.get('/user_order',function(req,res,next){
  res.render('user_order',{user: req.session.user});
})
router.get('/coach_news',function(req,res,next){
  res.render('coach_news',{coach: req.session.coach});
})
router.get('/user_orderlist',function(req,res,next){
  var orders=null;
  OrderModel.find({user_id:req.session.user._id},function(err,docs){
    if(err) console.log('查询错误orderlist')
    else{
      if(docs.length>0) 
      {
        orders = docs
        res.render('user_orderlist',{orders:orders,user: req.session.user});
      } 
    }
  })
})
//coach  order list
router.get('/coach_order',function(req,res,next){
  var orders=[];
  var username=null;
  OrderModel.find({coachname:req.session.coach.name},function(err,docs){
    if(err) console.log('查询错误orderlist')
    else{
      // console.log(docs.length)

      if(docs.length>0) 
      {
       
       
        
        // console.log(docs)
        async function a (docs){
            docs.forEach(element => {
              var obj = new Object();
              UsersModel.findOne({_id:element.user_id},function(err,doc){
                obj._id = element._id
                obj.username = doc.username
                obj.classname = element.classname
                obj.placename = element.placename
                obj.coachname = element.coachname
                orders.push(obj)
              })
            });
           setTimeout(() => {
            console.log(orders)
            res.render('coach_order',{orders:orders,coach: req.session.coach})
           }, 500);
            
        }
        a(docs);


      } 
    }
    
  })

})
module.exports = router;
