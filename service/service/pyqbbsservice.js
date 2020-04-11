/*
 作者: chenghao
 Date: 2020/3/19
 Time: 18:22
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqbbsmodel = require( '../models/pyqbbs' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

const pyqservice = require( './pyqservice.js' )

/**
 * 评论
 * @param tokendata
 * @param pyq_id
 * @param txt
 * @returns {Promise<boolean>}
 * @constructor
 */
async function Add ( tokendata , pyq_id , txt ) {
    //数据解构出来
    let { mobile , avatar , name } = tokendata;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    //构建数据
    var newmodel = new pyqbbsmodel( {
        isdelete : false ,
        pyq_id : pyq_id ,

        mobile ,
        avatar ,
        name ,
        txt ,

        // 最新时间
        addunix : common.GetNowUnix( now ) ,
        adddate : nowstr ,
        date : nowstr ,
        // 搞一个guid
        ids : common.GetGuid()
    } );

    //做3件事情:1.记录流水 2.更新朋友圈表bbs数量 3.记录日志
    var result = await Promise.all( [

        newmodel.save() ,
        pyqservice.UpdateBbsCount( pyq_id , 1 ) ,
        log.AddRunLog( mobile , 'AddPyqBbs' , `用户${ mobile }(${ name })评论一个朋友圈 朋友圈_id:${ pyq_id }` )

    ] );

    let newobj = false;

    if ( result != null && result.length >= 3 ) {
        //newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
        newobj = true;
    }

    return newobj;
}

/**
 * 删除评论
 * @param tokendata
 * @param pyq_id 朋友圈的ID
 * @param _id    bbs的ID
 * @returns {Promise<null>}
 * @constructor
 */
async function Delete ( tokendata , pyq_id , _id ) {
    //数据解构出来
    let { name , mobile } = tokendata;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    let where = {
        _id : _id
    }

    //做3件事情:1.记录点赞流水 2.更新朋友圈表点赞数量 3.记录日志
    var result = await Promise.all( [

        pyqbbsmodel.findOneAndUpdate( where , {
            deletedate : nowstr ,
            isdelete : true ,
        } , {
            new : true
        } ) ,
        pyqservice.UpdateBbsCount( pyq_id , -1 ) , //数量减少1
        log.AddRunLog( mobile , 'DeletePyqBbs' , `用户${ mobile }(${ name })删除一个朋友圈评论 朋友圈_id:${ pyq_id }` )

    ] );

    let newobj = null;

    if ( result != null && result.length >= 3 ) {
        newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
    }

    return newobj;
}

module.exports = {
    Add ,
    Delete
}
