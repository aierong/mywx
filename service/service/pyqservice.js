/*
 作者: chenghao
 Date: 2020/3/16
 Time: 10:22
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqmodel = require( './modules/pyq' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 * 发布朋友圈
 * @param postData
 * @returns {Promise<null>}
 * @constructor
 */
async function Add ( postData ) {
    //数据解构出来
    let { mobile , avatar , name , txt , imglist } = postData;

    let nowstr = common.GetNowString();

    //构建数据
    var newmodel = new pyqmodel( {
        isdelete : false ,

        mobile ,
        avatar ,
        name ,
        txt ,
        imglist ,

        bbscounts : 0 ,
        praisecounts : 0 ,

        // 最新时间
        adddate : nowstr ,
        date : nowstr ,
        // 搞一个guid
        ids : common.GetGuid()
    } );

    var result = await Promise.all( [
        newmodel.save() ,
        log.AddRunLog( mobile , 'AddPYQ' , `用户${ mobile }(${ name })发布一个朋友圈` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

/**
 * 删除朋友圈
 * @param _id
 * @returns {Promise<null>}
 * @constructor
 */
async function Delete ( _id ) {

    let nowstr = common.GetNowString();

    let where = {
        _id : _id
    };

    // pyqmodel.findOneAndUpdate( where , {
    //     isdelete : true ,
    //     deletedate : nowstr
    // } , {
    //     new : true
    // } )

    var result = await Promise.all( [
        pyqmodel.findOneAndUpdate( where , {
            isdelete : true ,
            deletedate : nowstr
        } , {
            new : true
        } ) ,
        log.AddRunLog( mobile , 'DeletePYQ' , `用户${ mobile }(${ name })删除一个朋友圈 _id:${ _id }` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

module.exports = {

    Add ,
    Delete
}
