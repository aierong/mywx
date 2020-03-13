/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:41
 功能: 用户的相关服务
 */

var mongoose = require( 'mongoose' );
const usermodel = require( './modules/user.js' )
const common = require( '../common/common.js' )

module.exports = {
    /**
     * 判断手机号码是否存在
     * @param mobile
     * @returns {Promise<*>}
     * @constructor
     */
    IsExistsMobile : async ( mobile = '' ) => {

        //构建条件
        let where = {
            mobile : mobile
        }

        let isexists = await usermodel.exists( where );

        // console.log( 'newkit ' , newkit )

        return isexists;
    } ,
    /**
     * 添加用户
     * @param postData
     * @returns {Promise<any>}
     * @constructor
     */
    AddUser : async ( postData ) => {
        //数据解构出来
        let { mobile , avatar , password , name , email } = postData;

        //密码要再次加密一下，
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
    } ,
    GetUserByMobile : async ( mobile = '' ) => {
        let where = {
            mobile : mobile
        };

        let obj = await usermodel.findOne( where );

        return obj;
    } ,
    RunLogin : async ( mobile = '' , logintimes = 0 ) => {
        let where = {
            mobile : mobile
        };

        // lastlogindate : common.GetNowString() ,
        //
        //     logintimes : logintimes + 1
        //

        let obj = await usermodel.findOneAndUpdate( where , [
            {
                $set : {
                    logintimes : { $add : [ { $ifNull : [ "logintimes" , 0 ] } , 1 ] } ,
                    lastlogindate : common.GetNowString()
                }
            }
        ] );

        return obj;
    } ,
}


