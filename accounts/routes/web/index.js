const express = require('express');
const ejs = require('ejs');
const shortid = require('shortid');
const moment = require('moment');

const AccountModel = require('../../models/AccountModel');

// const app = express();
const router = express.Router();

// 静态资源中间件
// router.use(__dirname + '/public');

const checkLoginMiddleWare = require('../../middleWares/checkLoginMiddleWare');

/* GET home page. */
router.get('/', (req, res) => {
    // 重定向
    res.redirect('/account');
});

// 获取账单列表
router.get('/account', checkLoginMiddleWare, function(req, res, next) {

    AccountModel.find()
        .sort({ time: -1 })
        .then(data => {
            const accounts = data;
            console.log('读取成功');
            // console.log(accounts);
            res.render('account/list', { accounts: accounts, moment: moment });
        });

});

// 新增账单
router.get('/account/create', checkLoginMiddleWare, function(req, res, next) {
    res.render('account/create');
});

// 删除账单
router.get('/account/:id', checkLoginMiddleWare, function(req, res, next) {
    const id = req.params.id;
    AccountModel.deleteOne({ _id: id })
        .then(data => {
            res.render('success', {
                msg: '删除成功',
                url: '/account'
            });
        });
});

// 提交账单，将新增数据添加到数据库
router.post('/account', checkLoginMiddleWare, function(req, res, next) {
    AccountModel.create({
            ...req.body,
            time: moment(req.body.time).toDate()
        })
        .then(data => {
            console.log(data);
            res.render('success', { msg: '添加成功', url: '/account' });
        });

});


module.exports = router;