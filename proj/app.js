var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('./db');
const { userInfo } = require('os');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

//session 配置
app.use(session({
    resave: true,  // 新增
    saveUninitialized: true,
    secret:'mall project',
    reverse:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*5} //指定登录会话有效期
}))


//登录拦截
app.get('*', function(req,res,next){
    var user = req.session.user
    var coach = req.session.coach
    // console.log(req.session.user+'111')
    var path = req.path

    if(path !='/login'&&path !='/regist'&&path !='/'){
        if(!user&&!coach)
        {
            console.log('还没登录')
            res.redirect('/login')
        }
    }
    else if(path =='/login' ||  path=='/regist')
    {
        if(user)
        {
            console.log('已经登录用户账户')
            res.redirect('/user_info')
        }
        if(coach)
        {
            console.log('已经登录教练账户')
            res.redirect('/coach_info')
        }
    }
    next()
})
app.use('/', routes);
app.use('/users', users);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
