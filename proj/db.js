var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost/bigwork',{ useNewUrlParser: true}); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 
 //用户表
var UserSchema = new mongoose.Schema({
    // user_id: String, //定义一个属性user_id，类型为String
    username: String, //定义一个属性content，类型为String
    password: String, //定义密码属性
    sex: String, //定义性别属性
    phone: String, //定义电话属性
    height: Number, //定义身高属性
    weight: Number, //定义体重属性
});
 var user = mongoose.model('users', UserSchema); //将该Schema发布为Model,users就是集合名称
//教练表
 var TrainerSchema = new mongoose.Schema({
    coach_id: String, //定义一个属性user_id，类型为String
    name: String, //定义一个属性content，类型为String
    password: String, //定义密码属性
});
var trainer = mongoose.model('trainers', TrainerSchema); //将该Schema发布为Model,user就是集合名称

var OrderSchema = new mongoose.Schema({
    user_id: String, //定义一个属性user_id，类型为String
    coachname: String, //定义一个属性教练名字，类型为String
    classname: String, //定义课程属性
    placename: String, //定义场地属性
});
var order = mongoose.model('orders', OrderSchema); //将该Schema发布为Model,user就是集合名称

var NewSchema = new mongoose.Schema({
    coach_id: String, //定义一个属性发布人的id
    title: String, //定义一个属性标题，类型为String
    src: String, //定义图片路径
    content: String, //定义内容
});
var news = mongoose.model('news', NewSchema); //将该Schema发布为Model,user就是集合名称

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('open!');
});
db.on('connected', () => {
	console.log('MongoDB connected success Mongoose')
})
db.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})



function user(callback){
    return user
}
function trainer(callback){
    return trainer
}
function order(callback){
    return order
}
function news(callback){
    return news
}
//exports导出
 module.exports ={
    user  ,
    order,
    trainer,
    news
 }

