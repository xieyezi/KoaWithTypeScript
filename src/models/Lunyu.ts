'use strict';
// 论语的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LunyuSchema = new Schema(
    {
        chapter: String,
        paragraphs: Array
    }
)
export const LunyuModel = mongoose.model('Lunyu', LunyuSchema);