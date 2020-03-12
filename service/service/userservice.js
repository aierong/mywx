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
        let { ids , mobile , avatar , password , name , email } = postData;

        //构建数据
        var newuser = new usermodel( {
            ids ,
            mobile ,
            avatar ,
            password ,
            name ,
            email ,
            lastlogindate : '' ,
            logintimes : 0 ,

            // adddate : now.format( 'YYYY-MM-DD HH:mm:ss' ) ,  //最新时间
            adddate : common.GetNowString() ,  // 最新时间

        } );

        let newobj = await newuser.save();

        // console.log( 'newkit ' , newkit )

        return newobj;
    } ,
}


