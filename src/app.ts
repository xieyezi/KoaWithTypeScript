import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from "mongoose";
import cors from 'koa2-cors';
import { router } from './routes/router';
import { systemConfig } from './config/config';


const app = new Koa();
mongoose.connect(systemConfig.databaseUrl, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log('数据库连接成功！地址为: ' + systemConfig.databaseUrl);
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

app.use(bodyParser());// 解析request的body
// 处理跨域的配置
app.use(cors());
app.use(router.routes());//引入路由
app.use(router.allowedMethods());
app.listen(systemConfig.port);
console.log(`Server running on port ${systemConfig.port}`);
export default app;