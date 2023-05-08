const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uname: String,
    password: String
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;