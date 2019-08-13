import * as Router from 'koa-router';
import controller = require('../controllers');


const router = new Router();
router
    //根路由和增加数据的接口
    .get('/', controller.controll.poetrydefault)
    .get('/add', controller.controll.addToDB)
    //用户路由
    .post('/signup', controller.user.signUp)
    .post('/signin', controller.user.signIn)
    .post('/updateuserifno', controller.user.updateUserInfo)
    .post('/deleteuserifno', controller.user.deleteUserInfo)
    //搜索古诗的路由
    .get('/poetry', controller.poetry.SearchPoetry)
    //搜索作者的路由
    .get('/author', controller.author.SearchAuthor);


export { router };