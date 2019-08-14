'use strict';
// 诗经的数据库模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShijingSchema = new Schema(
    {
        title: String,
        chapter:String,
        section:String,
        content: Array,

    }
)
export const ShijingModel = mongoose.model('Shijing', ShijingSchema);