/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-08-06 09:32:20
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-07 17:12:56
 */
'use-trict';
import { BaseContext } from 'koa';
// const { decodeToken, parseAuth } = require('../utils/account');
import { Ci_SongModel } from '../models/Ci_Song';
import { request, summary, query } from 'koa-swagger-decorator';
const DEFAULT_SEARCH_POETRY: string = '苏轼';

export default class SongCiController {
    //搜索宋诗的接口
    @request('get', '/searchSongCi')
    @summary('搜索宋词的接口')
    @query({
        author: { type: 'string', required: true, default: DEFAULT_SEARCH_POETRY, description: '作者名字' },
    })
    public static async SearchSongCi(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_POETRY;
        const data:string[] = await Ci_SongModel.find({ author: query });
        // console.log(data.length);
        if (data.length > 0) {
            console.log("搜索宋词成功!" + query);
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