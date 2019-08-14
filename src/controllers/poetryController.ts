/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-08-06 09:32:20
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-07 17:12:56
 */
'use-trict';
require('../db/connect');
import { BaseContext } from 'koa';
// const { decodeToken, parseAuth } = require('../utils/account');
import { Ci_SongModel } from '../models/Ci_Song';
const DEFAULT_SEARCH_POETRY: string = '晏殊';

export default class PoetryController {
    //搜索古诗的接口
    public static async SearchPoetry(ctx: BaseContext, next) {
        //从request里面获取参数
        //获取来自浏览器的输入，输入关键词进行查询
        // console.log(ctx.request.query);
        let query: string = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_POETRY;
        // console.log(query);
        // 解析出用户token
        // // console.log(ctx.request);
        // const authorization = parseAuth(ctx);
        // // 根据token解析出token中的用户_id
        // const tokenDecoded = decodeToken(authorization);
        // const { _id } = tokenDecoded; //TODO:这里要考虑一下获得用户ID之后做什么
        // console.log(_id);
        const data = await Ci_SongModel.find({ author: query });
        if (data) {
            console.log("搜索古诗成功!" + query);
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