/*
 作者: chenghao
 Date: 2020/3/13
 Time: 23:28
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const runlogmodel = require( './models/runlog.js' )
const common = require( '../common/common.js' )

/**
 * 添加日志
 * @param mobile
 * @param runtype
 * @param remark
 * @returns {Promise<*>}
 * @constructor
 */
async function AddRunLog ( mobile = '' , runtype = '' , remark = '' ) {

    // console.log( 'common' , common )

    //构建数据
    var newmodel = new runlogmodel( {

        mobile ,
        runtype ,
        remark ,
        // 搞一个guid
        ids : common.GetGuid() ,

        // 最新时间
        adddate : common.GetNowString() ,

    } );

    let newobj = await newmodel.save();

    // console.log( 'newobj' , newobj )

    return newobj;
}

module.exports = {
    AddRunLog
}
