/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-07-26 16:59:58
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-06 19:07:25
 */
'use-trict'
const fs = require('fs');
const path = require('path');
const FILEPATH = path.resolve('/Users/xieyezi/Desktop/NodeLearn/chinese-poetry/json/song');
const REG = /\b\w+(?=.json\b)/;

//按照正则表达式来判断文件是否为.json文件
function isJosnFile(filename: string): boolean {
    let flag = false;
    if (REG.test(filename)) {
        flag = true;
    }
    return flag;
}
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