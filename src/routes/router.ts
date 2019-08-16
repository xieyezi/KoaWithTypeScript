import Router from 'koa-router';
import * as controller from '../controllers';
const router = new Router();
router
    //根路由和增加数据的接口
    .get('/', controller.controll.poetrydefault)
    // .get('/add', controller.controll.addToDB)
    //用户路由
    .post('/signup', controller.user.signUp)
    .post('/signin', controller.user.signIn)
    .post('/updateuserifno', controller.user.updateUserInfo)
    .post('/deleteuserifno', controller.user.deleteUserInfo)
    //搜索宋词
    .get('/searchSongCi', controller.songci.SearchSongCi)
    //搜索宋词作者的路由
    .get('/searchSongCiAuthor', controller.author_songci.SearchSongCiAuthor)
    //搜索宋诗
    .get('/searchSongPoetry', controller.songpoetry.SearchSongPoetry)
    //搜索宋诗作者
    .get('/searchSongPoetryAuthor', controller.author_songpoetry.SearchSongPoetryAuthor)
    //搜索唐诗
    .get('/searchTangPoetry', controller.tangpoetry.SearchTangPoetry)
    //搜索唐诗作者
    .get('/searchTangPoetryAuthor', controller.author_tangpoetry.SearchTangPoetryAuthor)

export { router };