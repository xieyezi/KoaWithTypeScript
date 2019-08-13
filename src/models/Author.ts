/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-08-05 14:37:20
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-06 19:07:53
 */
'use strict';
// 作者信息的数据库模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema (
    {
        description: String,  
        name: String,
        short_description: String
    }
)
export const AuthorModel = mongoose.model('Author', AuthorSchema);