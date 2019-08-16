'use strict';
// 宋诗作者信息的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AuthorSongPoetrySchema = new Schema(
    {
        desc: String,
        name: String
    }
)
export const Author_SongPoetryModel = mongoose.model('Author_Song_Poetry', AuthorSongPoetrySchema);