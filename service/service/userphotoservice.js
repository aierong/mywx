/*
 作者: chenghao
 Date: 2020/3/14
 Time: 11:09
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const userphotomodel = require( './models/userphoto.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 * 初始化用户相册
 * @param mobile
 * @returns {Promise<null>}
 * @constructor
 */
async function Init ( mobile ) {

    let now = new Date();

    //构建数据
    var newdata = new userphotomodel( {

        mobile ,
        //初始化时是假
        isshare : false ,
        imgs : [] ,
        // 最新时间
        addunix : common.GetNowUnix( now ) ,
        adddate : common.GetNowString( now ) ,
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

    let now = new Date();

    let imgcounts = imgs != null ? imgs.length : 0;

    let issharetxt = isshare ? '是共享' : '不共享';

    var result = await Promise.all( [
        userphotomodel.findOneAndUpdate( where , {
            isshare : isshare ,
            imgs : imgs ,
            updatedate : common.GetNowString( now )
        } , {
            new : true
        } ) ,
        log.AddRunLog( mobile ,
            'SaveUserPhoto' ,
            `${ mobile }保存用户相册(${ issharetxt }),${ imgcounts }个照片` )
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

/**
 * 得用户图片
 * @param mobile
 * @returns {Promise<*>}
 * @constructor
 */
async function GetUserPhoto ( mobile = '' ) {
    //构建条件
    let where = {
        mobile : mobile
    }

    let obj = await userphotomodel.findOne( where );

    return obj;
}

module.exports = {

    Init ,
    Save ,
    IsExistsUserPhoto ,
    GetUserPhoto

}
