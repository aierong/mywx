/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:41
 功能: 用户的相关服务
 */

var mongoose = require( 'mongoose' );
const usermodel = require( './modules/user.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 * 判断手机号码是否存在
 * @param mobile
 * @returns {Promise<*>}
 * @constructor
 */
async function IsExistsMobile ( mobile = '' ) {

    //构建条件
    let where = {
        mobile : mobile
    }

    let isexists = await usermodel.exists( where );

    return isexists;
}

/**
 * 添加用户
 * @param postData
 * @returns {Promise<any>}
 * @constructor
 */
async function AddUser ( postData ) {
    //数据解构出来
    let { mobile , avatar , password , name , email } = postData;

    // console.log( '收到password' , password )

    //密码要再次加密一次
    password = common.EncryptPassWord( password );

    //构建数据
    var newuser = new usermodel( {

        mobile ,
        avatar ,
        password ,
        name ,
        email ,
        lastlogindate : '' ,
        logintimes : 0 ,

        // 最新时间
        adddate : common.GetNowString() ,
        // 搞一个guid
        ids : common.GetGuid()
    } );

    var result = await Promise.all( [
        newuser.save() ,
        log.AddRunLog( mobile , 'AddUser' , `添加一个新用户${ mobile }(${ name })` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    //let newobj = await newuser.save();

    // console.log( 'newobj' , newobj )

    return newobj;
}

/**
 *
 * @param mobile
 * @returns {Promise<*>}
 * @constructor
 */
async function GetUserByMobile ( mobile = '' ) {
    let where = {
        mobile : mobile
    };

    let obj = await usermodel.findOne( where );

    return obj;
}

/**
 *
 * @param mobile
 * @param logintimes
 * @returns {Promise<*>}
 * @constructor
 */
async function RunLogin ( mobile = '' ) {
    let where = {
        mobile : mobile
    };

    // let obj = await usermodel.findOneAndUpdate( where , [
    //     {
    //         $set : {
    //             logintimes : { $add : [ { $ifNull : [ "$logintimes" , 0 ] } , 1 ] } ,
    //             lastlogindate : common.GetNowString()
    //         }
    //     }
    // ] , {
    //     new : true
    // } );

    var result = await Promise.all( [
        usermodel.findOneAndUpdate( where , [
            {
                $set : {
                    logintimes : { $add : [ { $ifNull : [ "$logintimes" , 0 ] } , 1 ] } ,
                    lastlogindate : common.GetNowString()
                }
            }
        ] , {
            new : true
        } ) ,
        log.AddRunLog( mobile , 'login' , `${ mobile }登录` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

/**
 * 修改头像
 * @param mobile
 * @param avatar
 * @returns {Promise<void>}
 * @constructor
 */
async function UpdateUserAvatar ( mobile = '' , avatar = '' ) {
    let where = {
        mobile : mobile
    };

    // let obj = await usermodel.findOneAndUpdate( where , {
    //     avatar : avatar ,
    //     updatedate : common.GetNowString()
    //
    // } , {
    //     new : true
    // } );

    var result = await Promise.all( [
        usermodel.findOneAndUpdate( where , {
            avatar : avatar ,
            updatedate : common.GetNowString()

        } , {
            new : true
        } ) ,
        log.AddRunLog( mobile , 'UpdateAvatar' , `${ mobile }修改用户头像(${ avatar })` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

async function UpdatePassWord ( mobile = '' , newpassword = '' ) {
    let where = {
        mobile : mobile
    };

    var result = await Promise.all( [
        usermodel.findOneAndUpdate( where , {
            password : common.EncryptPassWord( newpassword ) ,
            updatedate : common.GetNowString()

        } , {
            new : true
        } ) ,
        log.AddRunLog( mobile , 'UpdatePassWord' , `${ mobile }修改密码` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

module.exports = {
    IsExistsMobile ,
    AddUser ,
    GetUserByMobile ,
    RunLogin ,
    UpdateUserAvatar ,
    UpdatePassWord
}


