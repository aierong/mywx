/*
 作者: chenghao
 Date: 2020/3/14
 Time: 11:09
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const userphotomodel = require( './modules/userphoto.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 *
 * @param mobile
 * @returns {Promise<null>}
 * @constructor
 */
async function Init ( mobile ) {

    //构建数据
    var newdata = new userphotomodel( {

        mobile ,
        //初始化时是假
        isshare : false ,
        imgs : [] ,
        // 最新时间
        adddate : common.GetNowString() ,
        // 搞一个guid
        ids : common.GetGuid()
    } );

    var result = await Promise.all( [
        newdata.save() ,
        log.AddRunLog( mobile , 'InitUserPhoto' , `${ mobile }初始化用户相册` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

module.exports = {

    Init

}
