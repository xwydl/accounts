const jwt = require('jsonwebtoken');
const express = require('express');
const md5 = require('md5');
const UserModel = require('../../models/UserModel');

const { secret } = require('../../config/config');

const router = express.Router();

router.post('/login', (req, res) => {
    const { uname, password } = req.body;

    // 从数据库中取出相应用户名的用户的数据
    UserModel.findOne({ uname: uname }).then(data => {
        // console.log(data);
        // 判断用户是否存在
        if (data) {
            // 验证用户密码是否正确
            if (md5(password) === data.password) {
                // 创建当前用户的token
                const token = jwt.sign({
                    uname: data.uname,
                    _id: data._id
                }, secret, {
                    expiresIn: 60 * 60 * 24 * 7
                });
                res.json({
                    code: '0000',
                    msg: '登录成功',
                    data: token
                });
            } else {
                res.json({
                    code: '2001',
                    msg: '密码错误，请重新登录',
                    data: null
                });
            }
        } else {
            res.json({
                code: '2002',
                msg: '用户不存在，请注册',
                data: null
            });
        }
    });

});

module.exports = router;