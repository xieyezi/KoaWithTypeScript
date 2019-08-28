'use-strict'
import { BaseContext } from 'koa';
import { Author_SongPoetryModel } from '../models/Author_Song_Poetry';
import { request, summary, query } from 'koa-swagger-decorator';

const DEFAULT_SEARCH_AUTHOR: string = '宋太祖';
export default class Author_SongPoetry_Controller {
    @request('get', '/searchSongPoetryAuthor')
    @summary('搜索宋诗作者的接口')
    @query({
        author_songpoetry: { type: 'string', required: true, description: '作者名字' },
    })
    public static async SearchSongPoetryAuthor(ctx: BaseContext, next) {
        let query = ctx.request.query.author_songpoetry ? ctx.request.query.author_songpoetry : DEFAULT_SEARCH_AUTHOR;
        // console.log(query);
        const data = await Author_SongPoetryModel.findOne({ name: query });
        // console.log(data);
        if (data) {
            console.log("搜索宋诗作者成功!" + query);
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