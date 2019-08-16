'use strict';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
// 定义bcrip加密时的配置常量
const SALT_ROUNDS: number = 10;

const UserSchema = new Schema(
    {
        name: String,
        phone: String,
        email: String,
        password: String,
        signature: String, //个性签名
        readHistory: Array,//浏览历史
        collections: Array,//收藏
        like: Array,//喜欢
        message: Array,//个人消息
    }
)
//钩子函数，指定create()之前的操作,即是在将用户保存到数据库之前，为用户密码加密
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            // 将用户提交的密码替换成加密后的hash
            user.password = hash;
            console.log(user.password);
            next();
        });
    });
});
// 定义userSchema的实例方法
// 解密user password
// 注意mehtod要加s
const comparePassword = function(userPassword, passwordHash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(userPassword, passwordHash, (err, res) => {
            // 验证完成
            // res值为false|true，表示密码不同/相同
            if (!err) return resolve(res);
            // 验证出错
            return reject(err);
        });
    });
}
UserSchema.methods.comparePassword = comparePassword;

export const UserModel = mongoose.model('User', UserSchema);
