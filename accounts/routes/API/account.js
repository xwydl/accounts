const express = require('express');
const ejs = require('ejs');
const shortid = require('shortid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const AccountModel = require('../../models/AccountModel');
const CheckTokenMiddleWare = require('../../middleWares/checkTokenMiddleWare');

var router = express.Router();

/* GET home page. */
// 获取账单列表
router.get('/account', CheckTokenMiddleWare, function(req, res, next) {
    console.log(req.user);
    AccountModel.find()
        .sort({ time: -1 })
        .then(data => {
            console.log('读取成功');
            res.json({
                code: '0000',
                msg: '读取成功',
                data: data
            });
        });
});

// 获取单个账单信息
router.get('/account/:id', CheckTokenMiddleWare, function(req, res) {
    AccountModel.find({ _id: req.params.id }).then((data) => {
        res.json({
            code: '0000',
            msg: '读取单条数据成功',
            data: data
        });
    })
});

// 更新账单
router.patch('/account/:id', CheckTokenMiddleWare, function(req, res) {
    AccountModel.updateOne({ _id: req.params.id }, req.body);
    AccountModel.findById(req.params.id).then((data) => {
        res.json({
            code: '0000',
            msg: '更新成功',
            data: data
        });
    });
});

// 新增账单
// router.get('/account/create', function(req, res, next) {
//     res.render('create');
// });

// 删除账单
router.delete('/account/:id', CheckTokenMiddleWare, function(req, res, next) {
    const id = req.params.id;
    AccountModel.deleteOne({ _id: id })
        .then(data => {
            res.json({
                code: '0000',
                msg: '删除成功',
                data: {}
            });
            // res.render('success', {
            //     msg: '删除成功',
            //     url: '/account'
            // });
        });
});

// 提交账单，将新增数据添加到数据库
router.post('/account', CheckTokenMiddleWare, function(req, res, next) {
    AccountModel.create({
            ...req.body,
            time: moment(req.body.time).toDate()
        })
        .then(data => {
            console.log(data);
            res.json({
                code: '0000',
                msg: '创建成功',
                data: data
            });
            // res.render('success', { msg: '添加成功', url: '/account' });
        });

});

module.exports = router;