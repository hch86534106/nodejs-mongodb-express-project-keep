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
//注册接口 判断用户名是否重复 用mongoose进行保存
router.post('/regist', function(req,res,next){
  var user = new UsersModel({ 
    username: req.body.username, 
    password: req.body.password,
    sex:req.body.sex,
    phone: req.body.phone, 
    height: req.body.height, 
    weight: req.body.weight
  });
   //  //数据校验
   UsersModel.find({ 'username': req.body.username }, function (err, docs) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    if(docs.length>0)
    {
      console.log(person+'已有相应的账号')
      res.redirect('/regist')
    }
    else{
      user.save(function (err) {
        if (err) {
                console.log("注册时数据库连接失败")
                res.redirect('/regist')
              }
        else{
          console.log(user)
          res.redirect('/login')
        }
    })
  }
    // console.log(person+'已有相应的账号')
  });
 
})
//登录接口
router.post('/login', function(req,res,next){
  var data={
    username: req.body.username,
    password: req.body.password,
  }
  console.log(req.body.role)
   if(req.body.role=='user')
   {
    console.log('735')
    UsersModel.findOne({username: req.body.username,
      password: req.body.password},function(err,doc){
        
        if(err){
          console.log("登录时数据库连接失败")
          res.redirect('/login')
        }
        else{
          if(doc){ 
            //登陆成功 进行session会话存储
            req.session.user = doc
            res.redirect('/')
            //也顺便查找一下 session orderlist
          }
          else{
            console.log("登录失败")
            res.redirect('/login')
          }
          
        }
      })
   }
  else if(req.body.role=='coach'){
    TrainModel.findOne({name: req.body.username,
      password: req.body.password},function(err,doc){
        // console.log(doc)
        if(err){
          console.log("登录时数据库连接失败")
          res.redirect('/login')
        }
        else{
          if(doc){ 
            //登陆成功 进行session会话存储
            req.session.coach = doc
            res.redirect('/')
            //也顺便查找一下 session orderlist
          }
          else{
            console.log("登录失败")
            res.redirect('/login')
          }
          
        }
      })
  }
})

//进行预约
router.post('/user_order', function(req,res,next){

  var order = new OrderModel({ 
    coachname: req.body.coachname, 
    classname: req.body.classname,
    placename:req.body.placename,
    user_id:req.session.user._id,
  });
  order.save(function (err) {
    if (err) {
            console.log("预约失败")
            res.redirect('/user_order')
          }
    else{
      console.log(order)//预约成功之后再进行orderlist的更新
      res.redirect('/user_order')
    }
})
})

 //进行个人信息修改
router.post('/Updateuserinfo', function(req,res,next){

  var user = new UsersModel({ 
    username: req.body.username, 
    password: req.body.password,
    sex:req.body.sex,
    phone: req.body.phone, 
    height: req.body.height, 
    weight: req.body.weight
  });
  
  UsersModel.updateOne({_id:req.session.user._id},{username: req.body.username, 
    password: req.body.password,
    sex:req.body.sex,
    phone: req.body.phone, 
    height: req.body.height, 
    weight: req.body.weight},function(err,raw){
    if(err)console.log("修改时数据库连接失败")
    else{
      console.log(raw+'修改成功');
      //进行session的更新
      UsersModel.findOne({_id:req.session.user._id},function(err,doc){
          console.log(doc)
          if(err){
            console.log("修改时数据库连接失败")
            res.redirect('/user_info')
          }
          else{
            if(doc){ 
              req.session.user = doc
              res.redirect('/user_info')
            }
          }
        })
    }           
    
                        //{ n: 1, nModified: 1, ok: 1 }
                    })

})       
      
    
router.post('/edit_news',function(req, res) {
  var news = new NewModel({ 
      coach_id: req.session.coach._id, //定义一个属性发布人的id
      title: req.body.title, //定义一个属性标题，类型为String
      src: 'assets/images/body-builder/07.jpg', //定义图片路径
      content: req.body.content, //定义内容
    });
    async function eNews(news){
      news.save(function(err){
      if(err) console.log('发表新闻时报错')
  })
  setTimeout(() => {
    res.redirect('/news')
  }, 500);   
}
eNews(news)
});

//退出登录
router.get('/logout',function(req,res,next){
  req.session.user=null
  req.session.coach=null
  res.redirect('/login')
})

module.exports = router;
