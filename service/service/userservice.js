/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:41
 功能: 用户的相关服务
 */

var mongoose = require( 'mongoose' );
const user = require( './modules/user.js' )

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

        let isexists = await user.exists( where );

        // console.log( 'newkit ' , newkit )

        return isexists;
    } ,
}


