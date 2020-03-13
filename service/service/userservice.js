/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:41
 功能: 用户的相关服务
 */

var mongoose = require( 'mongoose' );
const usermodel = require( './modules/user.js' )
const common = require( '../common/common.js' )

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

    let newobj = await newuser.save();

    // console.log( 'newkit ' , newkit )

    return true;
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
async function RunLogin ( mobile = '' , logintimes = 0 ) {
    let where = {
        mobile : mobile
    };

    let obj = await usermodel.findOneAndUpdate( where , [
        {
            $set : {
                logintimes : { $add : [ { $ifNull : [ "$logintimes" , 0 ] } , 1 ] } ,
                lastlogindate : common.GetNowString()
            }
        }
    ] );

    return obj;
}

module.exports = {
    IsExistsMobile ,
    AddUser ,
    GetUserByMobile ,
    RunLogin
}


