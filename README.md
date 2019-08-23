<h1 align="center">KoaWithTypeScript</h1>

 ![](https://img.shields.io/badge/koa-v2.7.0-brightgreen) ![](https://img.shields.io/badge/TypeScript-v3.5.2-orange) ![](https://img.shields.io/badge/build-passing-brightgreen)

  近来在学习node.js和TypeScript，同时也接触了Koa这个框架，循序渐进的搭了这个项目框架。此项目的主要目的是构建一个良好的项目设置和工作流，以便使用KOA和MongoDB在TypeScript中编写Node api GraphQL。


  Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

token Authorization(仅限七天):
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieGlleWV6aSIsIl9pZCI6IjVkNTQxYjBhNjRlYjhlYjE3MDdiNjU1NiIsImlhdCI6MTU2NTg3NzE5NiwiZXhwIjoxNTY2NDgxOTk2fQ.CCkvk0tv_XhJN3_mPWZlKfIcsu4EtB_yh4dR7k4Nfhk
```

### 已实现的接口
 method | resource | description
 ---- | --- | ----
 POST |	/signup	          |   用户注册(密码加密)
 POST |	/signin	          |      用户登录(jwt鉴权,路由拦截,返回token) 
 POST |	/updateuserifno	  |       用户更改信息
 POST |	/deleteuserifno	  |       用户注销
 GET  |	/   |  重定向至搜索宋词接口
 GET  |	/searchSongCi | 搜索宋词接口
 GET  |	/searchSongPoetryAuthor  |	 搜索宋词作者接口
 GET  |	/searchSongPoetry | 搜索宋诗接口
 GET  |	/searchSongPoetryAuthor  |	 搜索宋诗作者接口
 GET  |	/searchTangPoetry | 搜索唐诗接口
 GET  |	/searchTangPoetryAuthor  |	 搜索唐诗作者接口


### 数据库表结构

 name | description
 ---- | ---
 author_song_ci | 宋词作者
 ci_song     | 宋词
 author_song_poetry | 宋诗作者
 poet_song   | 宋诗
 author_tang | 唐代作者
 poet_tang   | 唐诗
 lunyu       | 论语
 shijing | 诗经
 baijiaxing  | 百家姓
 huajianji   | 花间集
 

### 具体想要实现的功能
  1. 使用TypeScript进行项目的实际开发
  2. 安装MongoDb数据库,
  3. 利用Koa开发一个GraphQl API,
  4. 使用PostMan测试我们的接口,
  5. 使用mongoose操作MongoDb数据库,
  6. 对前端提交的密码进行加密与解密,
  7. 在Koa中使用JWT做登录鉴权,
  8. 过滤用户提交的数据，防止XSS攻击,
  9. 使用mocha进行同步、异步和接口的单元测试,
  10. 单元测试覆盖率
  11. 使用koa-swagger-decorator生成API文档



### 已实现的功能
  1. 使用mongoose对数据库进行基本的操作;
  2. 获取用户输入的字段，对搜索关键词进行查询并封装结果返回给用户;
  3. 进入根路径的时候默认重定向至search接口,默认搜索关键词为“晏殊”;
  4. 根据MVC模式搭建数据结构和项目结构;
  5. 实现了古诗和作者的搜索接口（2019-08-05）
  6. 实现了用户的注册、更改信息、注销功能，剩下登录功能（2019-08-06）
  7. 实现了用户注册时密码的加密功能，以及登录验证功能（2019-08-07 12:34:29
  8. 利用TypeScript 对项目完成了重构


###  目标
  通过Koa+MongoDB搭建一个古诗词的 GraphQl API，然后用flutter 开发一个关于古诗词学习的APP,循序渐进！!


### 安装前提
1. Node.js v7.6.0及其以上版本
2. 全局安装TypeScript : `npm install -g typescript`

### 快速开始

* clone 项目
`git clone https://github.com/xieyezi/KoaWithTypeScript.git `

* 安装依赖
```
cd <projectName>
npm install
```
* 运行和打包
```
npm run start
npm run build
```
### 命令预览

 Npm Script | description
 ---- | ---
 npm run start | 和'npm run serve' 一样，运行项目
 npm run serve | 运行项目
 npm run watch | 利用Nodemon实时监听项目
 npm run bulid | 打包项目

###  TypeScript 配置文件

```
{
  "compilerOptions": {
    /* Basic Options */
    "target": "ES2017",                       /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "sourceMap": true,                        /* Generates corresponding '.map' file. */
    "outDir": "./dist",                         /* Redirect output structure to the directory. */
    "moduleResolution": "node",               /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": ".",                           /* Base directory to resolve non-absolute module names. */
    "esModuleInterop":true,
    "experimentalDecorators": true,           /* Enables experimental support for ES7 decorators. */
  },
  "include": [
      "./src/**/*"
  ]
}
```
### 用到的中间件(middleware)

packageName | description
 ---- | ---
 koa-router | 实现接口路由
 koa-bodyparser | 解析post请求数据
 bcrypt | 对用户提交的密码进行“加盐”加密
 koa-jwt | 用户登录鉴权(路由拦截)
 jsonwebtoken | 生成token
 CORS | 跨域处理
 koa-swagger-decorator | 生成API文档
 mongoose | 操作mongoDB数据库


### 问题总结
  1. 在读文件的时候，出现了内存泄漏的情况，解决方法：
 ```
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsc && node --max-old-space-size=8192 dist/app.js",
    "watch-server": "nodemon --watch 'src/**/*' -e ts,tsx --exec 'ts-node' ./src/app.ts"
  }
 ```
 将node --max-old-space-size=8192 设置为8G即可.