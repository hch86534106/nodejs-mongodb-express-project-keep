
var MongoClient = require('mongodb').MongoClient;
    var  assert = require('assert');
    // Connection URL
    var url = 'mongodb://localhost:27017';
    var dbname = 'project'
    //数据库连接方法
    function connect(callback){
        MongoClient.connect(url,function(err,client){
            if(err){
                console.log('连接数据库错误',err)

            }
            else{
                var db =client.db(dbname)
                callback && callback(db)
                client.close()
            }
        })
    }


module.exports ={
        connect 
     }