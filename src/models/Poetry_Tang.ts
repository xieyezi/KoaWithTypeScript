'use strict';
// 唐诗的数据库模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Poetry_TangSchema = new Schema(
    {
        author: String,
        paragraphs: Array,
        strains:Array,
        title: String
    }
)
export const Poetry_TangModel = mongoose.model('Poetry_Tang', Poetry_TangSchema);
