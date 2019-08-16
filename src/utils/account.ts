'use strict'
import JWT from 'jsonwebtoken';
import { systemConfig } from '../config/config'

// 生成JWT Token
// 同时可以设置过期时间
export const createToken = (config = {}, expiresIn = '7 days') => {
    const { name, _id }: any = config;
    const options = { name, _id };
    const custom = { expiresIn };
    // 通过配置参数，然后调用JWT.sign方法就会生成token
    return JWT.sign(options,systemConfig.jwtSecret, custom);
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