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
