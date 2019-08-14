# KoaWithTypeScript


近来在学习node.js和TypeScript，同时也接触了Koa这个框架，循序渐进的搭了这个项目框架。这里面涉及到的有，Koa对于MongoDB数据库的操作。
  目前我实现了模块化插入一条数据并查询对应数据。接下来会依次实现增删改查等基本操作，封装为模块，方便后面使用。

### 已实现的功能
  1. 使用mongoose对数据库进行基本的操作;
  2. 获取用户输入的字段，对搜索关键词进行查询并封装结果返回给用户;
  3. 进入根路径的时候默认重定向至search接口,默认搜索关键词为“晏殊”;
  4. 根据MVC模式搭建数据结构和项目结构;
  5. 实现了古诗和作者的搜索接口（2019-08-05）
  6. 实现了用户的注册、更改信息、注销功能，剩下登录功能（2019-08-06）
  7. 实现了用户注册时密码的加密功能，以及登录验证功能（2019-08-07 12:34:29
  8. 利用TypeScript 对项目完成了重构



### 已实现的接口
 method | resource | description
 ---- | --- | ----
 GET  |	/   |  重定向至搜索古诗接口
 GET  |	/poetry?author=苏轼 | 搜索古诗接口
 GET  |	/author?author=辛弃疾  |	 搜索作者接口
 POST |	/signup	          |   用户注册(密码加密)
 POST |	/signin	          |      用户登录(jwt鉴权,路由拦截,返回token) 
 POST |	/updateuserifno	  |       用户更改信息
 POST |	/deleteuserifno	  |       用户注销



### 数据库表结构

 name | description
 ---- | ---
 author_song | 宋代作者
 author_tang | 唐代作者
 ci_song     | 宋词
 poet_song   | 宋诗
 poet_tang   | 唐诗
 lunyu       | 论语
 baijiaxing  | 百家姓
 huajianji   | 花间集
 youmengying | 幽梦影

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

###  目标
  通过Koa+MongoDB搭建一个古诗词的 GraphQl API，然后用flutter 开发一个关于古诗词学习的APP,循序渐进！!