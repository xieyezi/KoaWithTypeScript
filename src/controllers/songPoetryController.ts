'use-trict';
import { BaseContext } from 'koa';
// const { decodeToken, parseAuth } = require('../utils/account');
import { Poetry_SongModel } from '../models/Poetry_Song';
import { request, summary, query } from 'koa-swagger-decorator';
const DEFAULT_SEARCH_POETRY: string = '宋太祖';

export default class SongCiController {
    //搜索宋诗的接口
    @request('get', '/searchSongPoetry')
    @summary('搜索宋诗的接口')
    @query({
        author: { type: 'string', required: true,description: '作者名字' },
    })
    public static async SearchSongPoetry(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_POETRY;
        const data = await Poetry_SongModel.find({ author: query });
        if (data.length > 0) {
            console.log("搜索宋诗成功!" + query);
            const result = {
                code: 200,
                response: data,
            };
            ctx.response.body = result;
        } else {
            const result = {
                code: 404,
                response: '暂无数据',
            };
            ctx.response.body = result;
        }
        // console.log(data);

    };

}