'use-trict';
import { BaseContext } from 'koa';
// const { decodeToken, parseAuth } = require('../utils/account');
import { Ci_SongModel } from '../models/Ci_Song';
import { request, summary, query } from 'koa-swagger-decorator';
const DEFAULT_SEARCH_POETRY: string = '苏轼';

export default class SongCiController {
    //搜索宋诗的接口
    @request('get', '/searchSongCiByAuthor')
    @summary('按照作者搜索宋词的接口')
    @query({
        author: { type: 'string', required: true, description: '作者名字' },
    })
    public static async SearchSongCiByAuthor(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_POETRY;
        const data:string[] = await Ci_SongModel.find({ author: query });
        // console.log(data.length);
        if (data.length > 0) {
            console.log("搜索宋词成功!" + query);
            ctx.response.body = data;
        } else {
            ctx.throw(404, '暂无数据');
        }
    };
    //搜索宋诗的接口
    @request('get', '/searchSongCiByQuery')
    @summary('按照关键词搜索宋词的接口')
    @query({
        search: { type: 'string', required: true, description: '搜索关键字' },
    })
    public static async SearchSongCiByQuery(ctx: BaseContext, next) {
        let query: string = ctx.request.query.search;
        //console.log(query);
        const data:string[] = await Ci_SongModel.find({ paragraphs: {$regex: query}});
        // console.log(data);
        if (data.length > 0) {
            console.log("搜索宋词成功!" + query);
            ctx.response.body = data;
        } else {
            ctx.throw(404, '暂无数据');
        }
    };
}