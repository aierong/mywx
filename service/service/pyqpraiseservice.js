/*
 作者: chenghao
 Date: 2020/3/16
 Time: 11:09
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqpraisemodel = require( './modules/pyqpraise.js' )
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

    let nowstr = common.GetNowString();

    //构建数据
    var newmodel = new pyqpraisemodel( {
        iscancel : false ,
        pyq_id : pyq_id ,

        mobile ,
        avatar ,
        name ,

        // 最新时间
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

    let newobj = null;

    if ( result != null && result.length >= 3 ) {
        newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
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

    let nowstr = common.GetNowString();

    let where = {
        pyq_id : pyq_id ,
        mobile : mobile ,
        iscancel : false
    }

    //做3件事情:1.记录点赞流水 2.更新朋友圈表点赞数量 3.记录日志
    var result = await Promise.all( [

        pyqpraisemodel.findOneAndUpdate( where , {
            deletedate : nowstr ,
            iscancel : true ,
        } , {
            new : true
        } ) ,
        pyqservice.UpdatePraiseCount( pyq_id , -1 ) , //数量减少1
        log.AddRunLog( mobile , 'DeletePyqPraise' , `用户${ mobile }(${ name })取消点赞一个朋友圈 朋友圈_id:${ pyq_id }` )

    ] );

    let newobj = null;

    if ( result != null && result.length >= 3 ) {
        newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
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
async function PraiseCheck ( ispraise , mobile , pyq_id ) {
    let where = {
        pyq_id : pyq_id ,
        mobile : mobile ,
        iscancel : false

    }

    let isexists = false;

    isexists = await pyqpraisemodel.exists( where );

    if ( ispraise ) {

        // 存在点赞记录，就不可以再点赞
        if ( isexists ) {
            return false;
        }
    }
    else {
        // isexists = await pyqpraisemodel.exists( where );

        // 不存在未取消的点赞记录，不允许取消点赞
        if ( !isexists ) {
            return false;
        }
    }

    return true;
}

module.exports = {

    Add ,
    Delete ,
    PraiseCheck

}
