
//配置信息
export interface IConfig  {
    port: number,
    jwtSecret: string,
    databaseUrl:string
}

const systemConfig:IConfig = {
    port: 3000,   //服务端口号
    jwtSecret: 'user-token', // 自定义生成token的密钥(随意定义的字符串)
    databaseUrl:'mongodb://localhost/ChinesePoetry' //数据库连接地址
}
export { systemConfig }