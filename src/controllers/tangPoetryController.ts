'use-trict';
import { BaseContext } from 'koa';
// const { decodeToken, parseAuth } = require('../utils/account');
import { Poetry_TangModel } from '../models/Poetry_Tang';
import { request, summary, query } from 'koa-swagger-decorator';
const DEFAULT_SEARCH_POETRY: string = '李白';

export default class SongCiController {
    //搜索宋诗的接口
    @request('get', '/searchTangPoetryByAuthor')
    @summary('按照作者搜索唐诗的接口')
    @query({
        author: { type: 'string', required: true,description: '作者名字' },
    })
    public static async SearchTangPoetryByAuthor(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_POETRY;
        const data = await Poetry_TangModel.find({ author: query });
        if (data.length > 0) {
            console.log("搜索唐诗成功!" + query);
            ctx.response.body = data;
        } else {
            ctx.throw(404, '暂无数据');
        }
    };

     //搜索宋诗的接口
     @request('get', '/searchTangPoetryByQuery')
     @summary('按照关键词搜索唐诗的接口')
     @query({
         search: { type: 'string', required: true,description: '关键词' },
     })
     public static async SearchTangPoetryByQuery(ctx: BaseContext, next) {
         //从request里面获取参数
         //获取来自浏览器的输入，输入关键词进行查询
         let query: string = ctx.request.query.search;
         const data = await Poetry_TangModel.find({ paragraphs: {$regex: query}});
         if (data.length > 0) {
             console.log("搜索唐诗成功!" + query);
             ctx.response.body = data;
         } else {
             ctx.throw(404, '暂无数据');
         }
     };
}