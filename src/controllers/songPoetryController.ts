'use-trict';
import { BaseContext } from 'koa';
// const { decodeToken, parseAuth } = require('../utils/account');
import { Poetry_SongModel } from '../models/Poetry_Song';
import { request, summary, query } from 'koa-swagger-decorator';
const DEFAULT_SEARCH_POETRY: string = '宋太祖';

export default class SongCiController {
    //搜索宋诗的接口
    @request('get', '/searchSongPoetryByAuthor')
    @summary('按照作者搜索宋诗的接口')
    @query({
        author: { type: 'string', required: true,description: '作者名字' },
    })
    public static async SearchSongPoetryByAuthor(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_POETRY;
        const data = await Poetry_SongModel.find({ author: query });
        if (data.length > 0) {
            console.log("搜索宋诗成功!" + query);
            ctx.response.body = data;
        } else {
            ctx.throw(404, '暂无数据');
        }
    };

    @request('get', '/searchSongPoetryByQuery')
    @summary('按照关键词搜索宋诗的接口')
    @query({
        search: { type: 'string', required: true,description: '关键词' },
    })
    public static async SearchSongPoetryByQuery(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.search;
        // console.log(query);
        const data = await Poetry_SongModel.find({ paragraphs: {$regex: query}});
        if (data.length > 0) {
            console.log("搜索宋诗成功!" + query);
            ctx.response.body = data;
        } else {
            ctx.throw(404, '暂无数据');
        }
    };
}