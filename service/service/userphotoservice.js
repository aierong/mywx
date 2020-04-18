/*
 作者: chenghao
 Date: 2020/3/14
 Time: 11:09
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const userphotomodel = require( '../models/userphoto.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 * 保存用户相册
 * @param mobile
 * @param isshare
 * @param imgs
 * @returns {Promise<void>}
 * @constructor
 */
async function Save ( mobile , isshare , imgs ) {
    let now = new Date();

    let where = {
        mobile : mobile
    };

    // 先把数据查询出来 findOne值返回一个对象
    let data = await userphotomodel.findOne( where );

    if ( data != null ) {
        //记录存在，修改一下
        data.isshare = isshare;
        data.imgs = imgs;
        data.updatedate = common.GetNowString( now );
    }
    else {
        //不存在，就新增加了
        //构建数据
        data = new userphotomodel( {

            mobile ,

            isshare : isshare ,
            imgs : imgs ,
            // 最新时间
            addunix : common.GetNowUnix( now ) ,
            adddate : common.GetNowString( now ) ,
            // 搞一个guid
            ids : common.GetGuid()
        } );
    }

    let imgcounts = imgs != null ? imgs.length : 0;

    let issharetxt = isshare ? '是共享' : '不共享';

    var result = await Promise.all( [
        data.save() ,
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

    Save ,

    GetUserPhoto

}
