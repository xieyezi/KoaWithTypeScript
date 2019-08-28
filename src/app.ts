import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from "mongoose";
import cors from 'koa2-cors';
import jwt from 'koa-jwt';
import errorHandle from './middleware/errorHandle';
import router from './routes/router';
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
//错误处理
// app.use(errorHandle());
/**
 * jwt验证错误的处理
 * jwt会对验证不通过的路由返回401状态码
 * 我们通过koa拦截错误，并对状态码为401的返回无权限的提示
 * 注意：需要放在jwt中间件挂载之前
 */
app.use(function (ctx, next) {
	// console.log(ctx.request);
	return next().catch((err) => {
		if (401 === err.status) {
			ctx.status = 401;
			ctx.body = {
				code: 401,
				message: '对不起,你暂无权限'
			};
		} else {
			throw err;
		}
	});
});
// 挂载jwt中间件
// secret参数是用于验证的密钥
// unless方法，设置不需要拦截的接口
app.use(
	jwt({ secret: systemConfig.jwtSecret }).unless({
		path: [
			/^\/add/,
			/^\/signup/,
			/^\/signin/,
			/^\/swagger-/
		]
	})
);
app.use(router.routes());//引入路由
app.use(router.allowedMethods());
app.listen(systemConfig.port);
console.log(`Server running on port ${systemConfig.port}`);
export default app;