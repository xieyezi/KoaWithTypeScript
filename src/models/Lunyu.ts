'use strict';
// 论语的数据库模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LunyuSchema = new Schema(
    {
        title: String,
        paragraphs: Array
    }
)
export const LunyuModel = mongoose.model('Lunyu', LunyuSchema);