/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-08-06 09:32:35
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-07 17:13:11
 */
'use-strict'
require('../db/connect');
import { BaseContext } from 'koa';
import { AuthorModel }  from '../models/Author';
const DEFAULT_SEARCH_AUTHOR:string = '苏轼';
// const { decodeToken, parseAuth } = require('../utils/account');

export default class AuthorController {
    //搜索作者的接口
    public static async SearchAuthor(ctx:BaseContext, next) {
        let query = ctx.request.query.author ? ctx.request.query.author : DEFAULT_SEARCH_AUTHOR;
        // console.log(query);
        // console.log(ctx.request);
        // const authorization = parseAuth(ctx);
        // // 根据token解析出token中的用户_id
        // const tokenDecoded = decodeToken(authorization);
        // const { _id } = tokenDecoded;  //TODO:这里要考虑一下获得用户ID之后做什么
        // // console.log(_id);
        const data = await AuthorModel.findOne({ name: query });
        // console.log(data);
        if (data) {
            console.log("搜索作者成功!" + query);
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
    }
}