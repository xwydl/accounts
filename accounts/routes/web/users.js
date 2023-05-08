var express = require('express');
var router = express.Router();
const md5 = require('md5');
const UserModel = require('../../models/UserModel');

/* GET users listing. */

// 用户注册
router.get('/register', (req, res) => {
    res.render('users/register');
});

// 注册用户
router.post('/register', (req, res) => {
    const { uname, password } = req.body;
    if (uname !== '' && password !== '') {
        UserModel.create({...req.body, password: md5(password) }).then((data) => {
            res.render('success', { msg: '注册成功,快去登录吧', url: '/users/login' });
        });
    } else {
        res.render('fail', { msg: '数据为空，注册失败', url: '/users/register' });
    }
});

//登录页面
router.get('/login', (req, res) => {
    res.render('users/login');
});

// 验证用户数据是否正确
router.post('/login', (req, res) => {
    const { uname, password } = req.body;

    // 从数据库中取出相应用户名的用户的数据
    UserModel.findOne({ uname: uname }).then(data => {
        console.log(data);
        // 判断用户是否存在
        if (data) {
            // 验证用户密码是否正确
            if (md5(password) === data.password) {
                // 写入session
                req.session.uname = data.uname;
                req.session._id = data._id;
                res.render('success', { msg: '登录成功!', url: '/account' });
            } else {
                res.render('fail', { msg: '密码错误，请重新登录', url: '/users/login' });
            }
        } else {
            res.render('fail', { msg: '用户不存在，请注册', url: '/users/resgister' });
        }
    });

});

// 退出登录
router.post('/logout', (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '已退出登录', url: '/users/login' });
    });
});

module.exports = router;