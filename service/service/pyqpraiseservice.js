/*
 作者: chenghao
 Date: 2020/3/16
 Time: 11:09
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqpraisemodel = require( './models/pyqpraise.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

const pyqservice = require( './pyqservice.js' )

/**
 * 点赞
 * @param postData
 * @returns {Promise<null>}
 * @constructor
 */
async function Add ( postData ) {
    //数据解构出来
    let { mobile , avatar , name , pyq_id } = postData;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    //构建数据
    var newmodel = new pyqpraisemodel( {
        iscancel : false ,
        isdelete : false ,

        pyq_id : pyq_id ,

        mobile ,
        avatar ,
        name ,

        // 最新时间
        addunix : common.GetNowUnix( now ) ,
        adddate : nowstr ,
        date : nowstr ,
        // 搞一个guid
        ids : common.GetGuid()
    } );

    //做3件事情:1.记录点赞流水 2.更新朋友圈表点赞数量 3.记录日志
    var result = await Promise.all( [

        newmodel.save() ,
        pyqservice.UpdatePraiseCount( pyq_id , 1 ) ,
        log.AddRunLog( mobile , 'AddPyqPraise' , `用户${ mobile }(${ name })点赞一个朋友圈 朋友圈_id:${ pyq_id }` )

    ] );

    let newobj = false;

    console.log( 'Add result' , result )

    if ( result != null && result.length >= 3 ) {
        //newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
        newobj = true;
    }

    return newobj;
}

/**
 * 取消点赞
 * @param postData
 * @returns {Promise<null>}
 * @constructor
 */
async function Delete ( postData ) {
    //数据解构出来
    let { pyq_id , name , mobile } = postData;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    let where = {
        pyq_id : pyq_id ,
        mobile : mobile ,
        iscancel : false
    }

    //做3件事情:1.记录点赞流水 2.更新朋友圈表点赞数量 3.记录日志
    var result = await Promise.all( [

        pyqpraisemodel.findOneAndUpdate( where , {
            updatedate : nowstr ,
            iscancel : true ,
        } , {
            new : true
        } ) ,
        pyqservice.UpdatePraiseCount( pyq_id , -1 ) , //数量减少1
        log.AddRunLog( mobile , 'DeletePyqPraise' , `用户${ mobile }(${ name })取消点赞一个朋友圈 朋友圈_id:${ pyq_id }` )

    ] );

    let newobj = false;

    console.log( 'Delete result' , result )

    if ( result != null && result.length >= 3 ) {
        //        newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
        newobj = true;
    }

    return newobj;
}

/**
 * 点赞检查
 * @param ispraise
 * @param mobile
 * @param pyq_id
 * @returns {Promise<boolean>}
 * @constructor
 */
// async function PraiseCheck ( ispraise , mobile , pyq_id ) {
//     let where = {
//         pyq_id : pyq_id ,
//         mobile : mobile ,
//         iscancel : false
//
//     }
//
//     let isexists = false;
//
//     isexists = await pyqpraisemodel.exists( where );
//
//     if ( ispraise ) {
//
//         // 存在点赞记录，就不可以再点赞
//         if ( isexists ) {
//             return false;
//         }
//     }
//     else {
//         // isexists = await pyqpraisemodel.exists( where );
//
//         // 不存在未取消的点赞记录，不允许取消点赞
//         if ( !isexists ) {
//             return false;
//         }
//     }
//
//     return true;
// }

/**
 * 是可以点赞状态
 * @param mobile
 * @param pyq_id
 * @returns {Promise<boolean>}
 * @constructor
 */
async function IsPraiseStatus ( mobile , pyq_id ) {
    let where = {

        pyq_id : pyq_id ,
        mobile : mobile ,
        isdelete : false

    }

    //把这个用户，这个帖子的 最后一个流水找回来
    let obj = await pyqpraisemodel.findOne( where ).sort( { addunix : -1 } );

    if ( obj != null ) {
        if ( obj.iscancel ) {
            return true;  //可以点赞
        }
        else {
            return false;  //可以取消点赞
        }
    }
    else {
        //记录 为空，说明还没有搞过
        return true;  //可以点赞
    }

}

module.exports = {

    Add ,
    Delete ,
    IsPraiseStatus ,
    // PraiseCheck

}
