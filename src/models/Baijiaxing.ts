'use strict';
// 百家姓的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BaijiaxingSchema = new Schema(
    {
        title: String,
        author:String,
        tags:String,
        paragraphs: Array,
        origin:Array
    }
)
export const BaijiaxingModel = mongoose.model('Baijiaxing', BaijiaxingSchema);