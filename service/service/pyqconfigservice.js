/*
 作者: chenghao
 Date: 2020/4/18
 Time: 11:13
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqconfigmodel = require( '../models/pyqconfig.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 * 保存用户数据
 * @param mobile
 * @param bgpath
 * @param bgpicfilename
 * @returns {Promise<null>}
 * @constructor
 */
async function Save ( mobile , bgpath , bgpicfilename ) {
    let now = new Date();

    let where = {
        mobile : mobile
    };

    // 先把数据查询出来 findOne值返回一个对象
    let data = await pyqconfigmodel.findOne( where );

    if ( data != null ) {
        //记录存在，修改一下
        data.bgpicfilename = bgpicfilename;
        data.bgpath = bgpath;
        data.updatedate = common.GetNowString( now );
    }
    else {
        //不存在，就新增加了
        //构建数据
        data = new pyqconfigmodel( {
            bgpicfilename ,
            bgpath ,
            isdelete : false ,

            // 搞一个guid
            ids : common.GetGuid() ,

            mobile ,

            // 最新时间
            addunix : common.GetNowUnix( now ) ,
            adddate : common.GetNowString( now ) ,

        } );
    }

    var result = await Promise.all( [
        data.save() ,
        log.AddRunLog( mobile ,
            'SavePyqConfig' ,
            `${ mobile }保存朋友圈配置数据(${ issharetxt }),路径:${ bgpath },文件名:${ bgpicfilename }` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

/**
 * 得用户数据
 * @param mobile
 * @returns {Promise<*>}
 * @constructor
 */
async function GetData ( mobile = '' ) {
    //构建条件
    let where = {
        mobile : mobile
    }

    let obj = await pyqconfigmodel.findOne( where );

    return obj;
}

module.exports = {

    Save ,
    GetData

}


