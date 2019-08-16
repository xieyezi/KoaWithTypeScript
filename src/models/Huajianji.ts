'use strict';
// 花间集的数据库模型
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const HuajianjiSchema = new Schema(
    {
        title: String,
        author:String,
        tags:String,
        rhythmic:String,
        paragraphs: Array,
        notes:Array
    }
)
export const HuajianjiModel = mongoose.model('Huajianji', HuajianjiSchema);