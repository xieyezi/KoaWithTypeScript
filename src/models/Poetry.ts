/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-07-26 16:56:02
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-07-26 16:56:02
 */
'use strict';
// 一首诗的数据库模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PoetrySchema = new Schema (
    {
        author: String,  
        paragraphs: Array,
        rhythmic: String
    }
)
export const PoetryModel = mongoose.model('Poetry', PoetrySchema);