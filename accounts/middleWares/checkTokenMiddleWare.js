const jwt = require('jsonwebtoken');

const { secret } = require('../config/config');

function CheckTokenMiddleWare(req, res, next) {
    // 获取token
    const token = req.get('token');

    if (token) {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                return res.json({
                    code: '2004',
                    msg: '检验失败',
                    data: null
                });
            }
            // 保存用户信息
            req.user = data;
            next();
        });
    } else {
        res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        });
    }
}

module.exports = CheckTokenMiddleWare;