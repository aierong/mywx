/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:40
 功能: 关于用户的控制器
 */

// 引入 service 文件
const userservice = require( '../service/userservice.js' )
const common = require( '../common/common.js' )

module.exports = {
    IsExistsMobile : async ( ctx , next ) => {
        //  http://localhost:3001/api/user/isexists

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
            result.errmsg = "手机号码已存在";
        }

        ctx.body = result

    } ,
    AddUser : async ( ctx , next ) => {
        //  http://localhost:3001/api/user/add

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        // console.log( postData )

        let flag = await userservice.AddUser( postData );

        ctx.body = flag

    } ,
    Login : async ( ctx , next ) => {
        //  http://localhost:3001/api/user/login

        let result = {

            isok : true ,
            errmsg : '' ,
            data : null
        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { mobile , password } = postData;
        // console.log( postData )

        let _user = await userservice.GetUserByMobile( mobile );

        if ( _user == null ) {
            result = {

                isok : false ,
                errmsg : '手机号码不存在' ,
                data : null
            }
        }
        else {
            //判断密码是否一样
            if ( _user.password != common.EncryptPassWord( password ) ) {
                result = {

                    isok : false ,
                    errmsg : '密码不正确' ,
                    data : null
                }
            }
            else {
                //操作一下
                let newuser = await userservice.RunLogin( mobile );
                newuser.password = '';  //密码置空一下

                result = {

                    isok : true ,
                    errmsg : '' ,
                    data : newuser
                }
            }
        }

        ctx.body = result

    } ,
}
