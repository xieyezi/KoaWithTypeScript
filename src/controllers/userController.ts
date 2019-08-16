/*
 * @Author: xieyezi
 * @Github: https://github.com/xieyezi
 * @Date: 2019-08-06 10:24:30
 * @LastEditors: xieyezi
 * @LastEditTime: 2019-08-07 16:57:00
 */
'user strict';
import { UserModel } from '../models/User';
import { createToken,decodeToken, parseAuth } from '../utils/account';
const UerInstance: any = new UserModel();
export default class UserController {
    //用户注册
    public static async signUp(ctx, next) {
        let newUser = ctx.request.body;
        console.log(newUser);
        //判断用户是否已经存在
        if (newUser) {
            let isExist = await userIsExist(newUser.name);
            // console.log(isExist);
            if (!isExist) {
                let user: any = new UserModel(newUser);
                let info = await user.save(user);
                // console.log(info);
                if (info.name) {
                    console.log("新建用户成功!" + info.name);
                    let result = {
                        code: 200,
                        message: "新建用户成功!"
                    }
                    ctx.response.body = result;
                }
            } else {
                console.log('用户已经存在!');
                let result = {
                    code: 403,
                    message: '用户已经存在!请换个用户名!'
                }
                ctx.response.body = result;
            }
        } else {
            let result = {
                code: 400,
                message: '提交参数不完整!'
            }
            ctx.response.body = result;
        }
    };
    //用户登录
    public static async signIn(ctx, next) {
        let userSignIn = ctx.request.body;
        // console.log(userSignIn);
        if (userSignIn) {
            let isExist: any = await userIsExist(userSignIn.name);//判断用户是否存在，若存在，则返回user的所有信息，否则返回null
            if (isExist) {
                //将用户输入的密码和加密密码进行比对
                let isMatch: boolean = await UerInstance.comparePassword(userSignIn.password, isExist.password);
                // console.log(isMatch);
                if (isMatch) {
                    console.log("登录成功!" + userSignIn.name);
                    let token = createToken(isExist);
                    let tokenNew = 'Bearer ' + token;
                    let result = {
                        code: 200,
                        message: "ok",
                        token: tokenNew
                    }
                    ctx.response.body = result;
                } else {
                    console.log("账户名或密码错误!" + userSignIn.name);
                    let result = {
                        code: 400,
                        message: "账户名或密码错误!"
                    }
                    ctx.response.body = result;
                }
            } else {
                let result = {
                    code: 404,
                    message: "用户不存在!"
                }
                ctx.response.body = result;
            }
        }
    };
    //用户修改个人信息
    public static async updateUserInfo(ctx, next) {
        let userUpdate = ctx.request.body;
        //console.log(userUpdate);
        if (userUpdate) {
            let isExist = await userIsExist(userUpdate.name);//判断用户是否存在，若存在，则返回user的所有信息，否则返回null
            //console.log(isExist);
            if (isExist) {
                let conditions = { name: userUpdate.name };//查询条件
                let state = await UserModel.findOneAndUpdate(conditions, userUpdate, { useFindAndModify: false, new: true });
                console.log(state);
                if (state._id) {
                    console.log("用户信息修改成功!" + state.name);
                    let result = {
                        code: 200,
                        response: state
                    }
                    ctx.response.body = result;
                }
            } else {
                let result = {
                    code: 404,
                    message: "用户不存在!"
                }
                ctx.response.body = result;
            }
        } else {
            let result = {
                code: 400,
                message: '提交参数不完整!'
            }
            ctx.response.body = result;
        }

    };
    //用户注销
    public static async deleteUserInfo(ctx, next) {
        let userDelete = ctx.request.body;
        // console.log(userDelete);
        if (userDelete) {
            let isExist = await userIsExist(userDelete.name);//判断用户是否存在，若存在，则返回user的所有信息，否则返回null
            if (isExist) {
                let conditions = { name: userDelete.name };//查询条件
                let state = await UserModel.deleteOne(conditions);
                if (state.ok === 1) {
                    console.log("用户信息删除成功!" + userDelete.name);
                    let result = {
                        code: 200,
                        message: "用户信息删除成功!"
                    }
                    ctx.response.body = result;
                }
            } else {
                let result = {
                    code: 404,
                    message: "用户不存在!"
                }
                ctx.response.body = result;
            }
        } else {
            let result = {
                code: 400,
                message: '提交参数不完整!'
            }
            ctx.response.body = result;
        }
    };
}

//定义私有方法判断用户是否已经存在
/**查询用户是否已经存在
 * @description: 
 * @param {String} 
 * @return: boolean
 */
function userIsExist(userName) {
    // console.log(userName);
    return new Promise((resolve, reject) => {
        let userData = UserModel.findOne({ name: userName });
        if (userData) {
            resolve(userData);
        } else {
            reject('error');
        }
    })

}
//以下是解析token获得用户ID的操作
 // const authorization = parseAuth(ctx);
 // // 根据token解析出token中的用户_id
 // const tokenDecoded = decodeToken(authorization);
// const { _id } = tokenDecoded;
// // console.log(_id);     