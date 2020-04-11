/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:40
 功能: 关于用户的控制器
 */

// 引入 service 文件
const userservice = require( '../service/userservice.js' )
const common = require( '../common/common.js' )
const { CreateToken } = require( '../common/jwttoken.js' )

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

        let obj = await userservice.AddUser( postData );

        if ( obj != null ) {
            ctx.body = true;
        }
        else {
            ctx.body = false;
        }

    } ,
    UpdateUserAvatar : async ( ctx , next ) => {
        //  http://localhost:3001/api/user/updateuseravatar

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        // console.log( postData )
        let { mobile , avatar } = postData;

        let obj = await userservice.UpdateUserAvatar( mobile , avatar );

        if ( obj != null ) {
            ctx.body = true;
        }
        else {
            ctx.body = false;
        }

    } ,
    UpdatePassWord : async ( ctx , next ) => {
        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { mobile , oldpassword , newpassword } = postData;

        let _user = await userservice.GetUserByMobile( mobile , true );

        if ( _user == null ) {
            result = {

                isok : false ,
                errmsg : '手机号码不存在' ,

            }
        }
        else {

            if ( _user.password != common.EncryptPassWord( oldpassword ) ) {
                result = {

                    isok : false ,
                    errmsg : '现有密码不正确' ,

                }
            }
            else {
                //修改密码

                let obj = await userservice.UpdatePassWord( mobile , newpassword );

                if ( obj != null ) {
                    result = {

                        isok : true ,
                        errmsg : '' ,

                    }
                }
                else {
                    result = {

                        isok : false ,
                        errmsg : '密码修改失败' ,

                    }
                }

            }
        }

        ctx.body = result
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
        // console.log( 'Login' , postData )

        let _user = await userservice.GetUserByMobile( mobile , true );

        if ( _user == null ) {
            result = {
                isok : false ,
                errmsg : '手机号码不存在' ,
                data : null
            }
        }
        else {
            //判断密码是否一样
            // console.log( '_user' , _user )
            let _EncryptPassWord = common.EncryptPassWord( password );
            // console.log( '_EncryptPassWord' , _EncryptPassWord )
            if ( _user.password != _EncryptPassWord ) {
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

                let tokendata = CreateToken( newuser );

                result = {

                    isok : true ,
                    errmsg : '' ,
                    data : newuser ,
                    tokendata

                }
            }
        }

        ctx.body = result

    } ,
    GetUserList : async ( ctx , next ) => {
        let obj = await userservice.GetUserList();
        ctx.body = obj
    } ,
    GetUserByMobile : async ( ctx , next ) => {
        //先接收参数
        let params = ctx.params;

        let { mobile } = params;

        let obj = await userservice.GetUserByMobile( mobile , false );

        ctx.body = {
            data : obj
        }
    }
}


