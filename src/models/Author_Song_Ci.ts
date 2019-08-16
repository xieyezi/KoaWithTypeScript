'use strict';
// 宋词作者信息的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AuthorSongCiSchema = new Schema(
    {
        description: String,
        name: String,
        short_description: String
    }
)
export const Author_SongCiModel = mongoose.model('Author_Song_Ci', AuthorSongCiSchema);