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
 * 初始化用户相册
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

/**
 * 保存用户相册
 * @param mobile
 * @param isshare
 * @param imgs
 * @returns {Promise<void>}
 * @constructor
 */
async function Save ( mobile , isshare , imgs ) {
    let where = {
        mobile : mobile
    };

    var result = await Promise.all( [
        userphotomodel.findOneAndUpdate( where , {
            isshare : isshare ,
            imgs : imgs ,
            updatedate : common.GetNowString()

        } , {
            new : true
        } ) ,
        log.AddRunLog( mobile , 'SaveUserPhoto' , `${ mobile }保存用户相册` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

/**
 * 是存在用户相册
 * @param mobile
 * @returns {Promise<*>}
 * @constructor
 */
async function IsExistsUserPhoto ( mobile = '' ) {

    //构建条件
    let where = {
        mobile : mobile
    }

    let isexists = await userphotomodel.exists( where );

    return isexists;
}

module.exports = {

    Init ,
    Save ,
    IsExistsUserPhoto

}
