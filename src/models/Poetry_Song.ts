'use strict';
// 宋诗的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Poetry_SongSchema = new Schema(
    {
        author: String,
        paragraphs: Array,
        strains:Array,
        title: String
    }
)
export const Poetry_SongModel = mongoose.model('Poetry_Song', Poetry_SongSchema);
