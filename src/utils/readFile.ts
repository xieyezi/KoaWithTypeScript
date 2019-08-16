'use-trict'
import fs from 'fs';
import path from 'path';
import { Ci_SongModel } from '../models/Ci_Song';
import { Author_SongCiModel } from '../models/Author_Song_Ci';
import { ShijingModel } from '../models/Shijing'
import { LunyuModel } from '../models/Lunyu'
import { Author_TangModel } from '../models/Author_Tang'
import { Poetry_TangModel } from '../models/Poetry_Tang'
import { Author_SongPoetryModel } from '../models/Author_Song_Poetry'
import { Poetry_SongModel } from '../models/Poetry_Song'
const FILEPATH = path.resolve('/Users/xieyezi/Desktop/NodeLearn/chinese-poetry/json/song');
const REG = /\b\w+(?=.json\b)/;


//根据文件路径读取文件，返回文件列表
export const readFilePath = function () {
    return new Promise((resolve, reject) => {
        let filePathArray: string[] = [];
        fs.readdir(FILEPATH, (err, files) => {
            if (err) {
                console.warn(err);
            } else {
                //遍历读取到的文件列表
                files.forEach(filename => {
                    //获取当前文件的绝对路径
                    let filedir = path.join(FILEPATH, filename);
                    if (isJosnFile(filedir)) {
                        filePathArray.push(filedir);
                    }
                });
                resolve(filePathArray);
            }
        });
    })
}
//读取文件，向数据库新增数据
export const addToDB = async function  () {
    let fileArr: any = await readFilePath();
    console.log("异步返回的结果数组：");
    console.log(fileArr);
    fileArr.forEach(filepath => {
        //如果是作者，则新建一个表，将作者信息插入数据库
        if (filepath === 'D:\\NodeLearn\\chinese-poetry\\json\\tang\\authors.tang.json') {
            let authorArr = JSON.parse(fs.readFileSync(filepath).toString());
            // console.log(authorArr);
            if (authorArr) {
                Author_TangModel.insertMany(authorArr);
                console.log('插入成功！');
            }
        }
        else {
            let poetryArr = JSON.parse(fs.readFileSync(filepath).toString());
            if (poetryArr) {
                console.log('插入成功！');

            }
        }
    });
};
//按照正则表达式来判断文件是否为.json文件
function isJosnFile(filename: string): boolean {
    let flag = false;
    if (REG.test(filename)) {
        flag = true;
    }
    return flag;
}
