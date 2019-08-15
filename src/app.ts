import * as Koa from 'koa';
import * as cors from 'koa2-cors';
import * as  bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';
import { router } from './routes/router';
import { JWT_SECRET } from './utils/account';

const app = new Koa();
app.use(bodyParser());// 解析request的body
// 处理跨域的配置
app.use(cors());
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
	jwt({ secret: JWT_SECRET }).unless({
		path: [
			/^\/add/,
			/^\/signup/,
			/^\/signin/
		]
	})
);
app.use(router.routes());//引入路由
app.use(router.allowedMethods());
app.listen(9000);

console.log('Server running on port 9000');