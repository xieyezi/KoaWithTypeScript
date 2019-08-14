'use strict';
// 宋诗作者信息的数据库模型
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthorSongPoetrySchema = new Schema(
    {
        name: String,
        desc: String
    }
)
export const Author_SongPoetryModel = mongoose.model('Author_Song_Poetry', AuthorSongPoetrySchema);