'use strict';
// 作者信息的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AuthorTangSchema = new Schema(
    {
        desc: String,
        name: String
    }
)
export const Author_TangModel = mongoose.model('Author_Tang', AuthorTangSchema);