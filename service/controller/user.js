/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:40
 功能: 关于用户的控制器
 */

// 引入 service 文件
const userservice = require( '../service/userservice.js' )

module.exports = {
    IsExistsMobile : async ( ctx , next ) => {
        //  http://localhost:3001/api/user/IsExistsMobile

        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { mobile } = postData;

        //这里不验证是否为空
        //判断是否唯一
        let isexists = await userservice.IsExistsMobile( mobile );

        if ( isexists ) {
            result.isok = false;
            result.errmsg = "手机号码";
        }

        ctx.body = result

    } ,
    AddUser : async ( ctx , next ) => {
        //  http://localhost:3001/api/user/

        // let result = {
        //     isok : true ,
        //     errmsg : '' ,
        //     data : null
        // }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        // let { mobile } = postData;

        let obj = await userservice.AddUser( postData );

        ctx.body = obj

    } ,
}
