'use-strict'
import { BaseContext } from 'koa';
import { Author_TangModel } from '../models/Author_Tang';
import { request, summary, query } from 'koa-swagger-decorator';

const DEFAULT_SEARCH_AUTHOR: string = '李白';
export default class Author_SongPoetry_Controller {
    @request('get', '/searchTangPoetryAuthor')
    @summary('搜索唐诗作者的接口')
    @query({
        author_tangpoetry: { type: 'string', required: true, description: '作者名字' },
    })
    public static async SearchTangPoetryAuthor(ctx: BaseContext, next) {
        let query = ctx.request.query.author_tangpoetry ? ctx.request.query.author_tangpoetry : DEFAULT_SEARCH_AUTHOR;
        // console.log(query);
        const data = await Author_TangModel.findOne({ name: query });
        // console.log(data);
        if (data) {
            console.log("搜索唐诗作者成功!" + query);
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