/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-07-30 14:49:08
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-06 19:07:05
 */
'use-trict';
require('../db/connect');
const fs = require('fs');
import { Ci_SongModel } from '../models/Ci_Song';
import { Author_SongCiModel } from '../models/Author_Song_Ci';

import { readFilePath } from '../utils/readFile';

const DEFAULT_SEARCH_POETRY: string = '晏殊';
//封装API对数据库进行基本的操作
export default class Ctroller {
    //进入api时默认调用搜索接口,默认进入“搜索古诗接口”，关键词为晏殊
    public static async poetrydefault(ctx, next) {
        ctx.status = 302;
        // console.log('/poetry?poetry=' + DEFAULT_SEARCH_POETRY);
        //这里要解决中文乱码的问题
        ctx.redirect('/poetry?poetry=' + encodeURIComponent(DEFAULT_SEARCH_POETRY));
    };
    //读取文件，向数据库新增数据
    public static async addToDB(ctx, next) {
        const responseMessage = {
            code: '',
            response: '',
        };
        let fileArr:any = await readFilePath();
        console.log("异步返回的结果数组：");
        console.log(fileArr);
        fileArr.forEach(filepath => {
            //如果是作者，则新建一个表，将作者信息插入数据库
            if (filepath === 'D:\\NodeLearn\\chinese-poetry\\ci\\author.song.json') {
                let authorArr = JSON.parse(fs.readFileSync(filepath));
                // console.log(authorArr);
                if (authorArr) {
                    Author_SongCiModel.insertMany(authorArr);
                    // console.log('插入成功！');
                    responseMessage.code = '200';
                    responseMessage.response = '插入成功！';
                }
            }
            else {
                let poetryArr = JSON.parse(fs.readFileSync(filepath));
                if (poetryArr) {
                    Ci_SongModel.insertMany(poetryArr);
                    // console.log('插入成功！');
                    responseMessage.code = '200';
                    responseMessage.response = '插入成功！';
                }
            }
        });
        ctx.body = responseMessage;
    };
}