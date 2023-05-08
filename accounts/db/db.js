const mongoose = require('mongoose');

module.exports = function(success, error) {
    if (error !== 'function') {
        error = () => {
            console.log('数据库连接失败');
        }
    }

    const { BDHOST, DBPORT, DBNAME, DBHOST } = require('../config/config');
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.connection.once('open', () => {
        success();
    });

    mongoose.connection.on('error', () => {
        error();
    })
    mongoose.connection.on('error', () => {
        console.log('连接关闭');
    })
}