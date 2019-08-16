
'use-trict';
const DEFAULT_SEARCH_POETRY: string = '晏殊';
//封装API对数据库进行基本的操作
export default class redirectController {
    //进入api时默认调用搜索接口,默认进入“搜索古诗接口”，关键词为晏殊
    public static async poetrydefault(ctx, next) {
        ctx.status = 302;
        // console.log('/poetry?poetry=' + DEFAULT_SEARCH_POETRY);
        //这里要解决中文乱码的问题
        ctx.redirect('/searchSongCi?author=' + encodeURIComponent(DEFAULT_SEARCH_POETRY));
    };
}