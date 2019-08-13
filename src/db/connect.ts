'use-trict';
// db/db.js
//配置数据库的连接
import * as mongoose from "mongoose";
const DB_URL: string = "mongodb://localhost/ci";
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功！地址为: ' + DB_URL);
});
/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error', function (err) {
  console.log('数据库连接失败: ' + err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected', function () {
  console.log('数据库异常断开！');
});


module.exports = mongoose;