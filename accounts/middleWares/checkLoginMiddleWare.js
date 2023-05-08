// 声明中间件检测登录
const checkLoginMiddleWare = (req, res, next) => {
    if (!req.session.uname) {
        return res.redirect('/users/login');
    }
    next();
};

module.exports = checkLoginMiddleWare;