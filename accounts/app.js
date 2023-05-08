const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/web/index');
const usersRouter = require('./routes/web/users');
// 导入 account 接口路由文件
const accountRouter = require('./routes/API/account');
const authApiRouter = require('./routes/API/auth');

// 导入配置文件
const { DBHOST, DBPORT, DBNAME } = require('./config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'sid',
    secret: 'atguigu',
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
        mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // 响应404
    res.render('404');
    // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;