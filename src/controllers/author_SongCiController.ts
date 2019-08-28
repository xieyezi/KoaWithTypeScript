'use-strict'
import { BaseContext } from 'koa';
import { Author_SongCiModel } from '../models/Author_Song_Ci';
import { request, summary, query } from 'koa-swagger-decorator';

const DEFAULT_SEARCH_AUTHOR: string = '苏轼';
export default class Author_SongCi_Controller {
    @request('get', '/searchSongCiAuthor')
    @summary('搜索宋词作者的接口')
    @query({
        author_songci: { type: 'string', required: true, description: '作者名字' },
    })
    public static async SearchSongCiAuthor(ctx: BaseContext, next) {
        let query = ctx.request.query.author_songci ? ctx.request.query.author_songci : DEFAULT_SEARCH_AUTHOR;
        // console.log(query);
        const data = await Author_SongCiModel.findOne({ name: query });
        //console.log(data);
        if (data) {
            console.log("搜索宋词作者成功!" + query);
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