/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-07-26 16:56:02
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-07-26 16:56:02
 */
'use strict';
// 宋词的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Ci_SongSchema = new Schema(
    {
        author: String,
        paragraphs: Array,
        rhythmic: String
    }
)
export const Ci_SongModel = mongoose.model('Ci_Song', Ci_SongSchema);
