/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-08-07 13:06:03
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-07 17:06:52
 */
'use strict'
import * as JWT from 'jsonwebtoken';
// 自定义生成token的密钥(随意定义的字符串)
const JWT_SECRET: string = 'user-token';

// 生成JWT Token
// 同时可以设置过期时间
export const createToken = (config = {}, expiresIn = '7 days') => {
    const { name, _id }: any = config;
    const options = { name, _id };
    const custom = { expiresIn };
    // 通过配置参数，然后调用JWT.sign方法就会生成token
    return JWT.sign(options, JWT_SECRET, custom);
};
// 从ctx中解析authorization
export const parseAuth = ctx => {
    if (!ctx || !ctx.header.authorization) return null;
    const parts = ctx.header.authorization.split(' ');
    if (parts.length < 2) return null;
    return parts[1];
}

// 解析JWT Token
export const decodeToken = (token) => {
    return JWT.decode(token);
};

// 将密钥暴露出去是为了后面验证的时候会用到
// export const JWT_SECRET=  JWT_SECRET;
export { JWT_SECRET }