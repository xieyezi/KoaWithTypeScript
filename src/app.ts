import * as Koa from 'koa';
import * as cors from 'koa2-cors';
import * as  bodyParser from 'koa-bodyparser';
import { router } from './routes/router';

const app = new Koa();
app.use(bodyParser());// 解析request的body
// 处理跨域的配置
app.use(cors());
app.use(router.routes());//引入路由
app.use(router.allowedMethods());
app.listen(9000);

console.log('Server running on port 9000');