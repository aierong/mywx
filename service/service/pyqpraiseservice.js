/*
 作者: chenghao
 Date: 2020/3/16
 Time: 11:09
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqpraisemodel = require( '../models/pyqpraise.js' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

const pyqservice = require( './pyqservice.js' )

/**
 * 点赞
 * @param postData
 * @returns {Promise<null>}
 * @constructor
 */
async function Add ( tokendata , pyq_id , Praise_id ) {
    //数据解构出来
    let { mobile , avatar , name } = tokendata;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    var result;

    let updatecount = pyqservice.UpdatePraiseCount( pyq_id , 1 );
    let addlog = log.AddRunLog( mobile , 'AddPyqPraise' , `用户${ mobile }(${ name })点赞一个朋友圈 朋友圈_id:${ pyq_id }` );

    // 有id 就修改
    if ( Praise_id != '' ) {

        result = await Promise.all( [

            pyqpraisemodel.findOneAndUpdate( {
                _id : mongoose.Types.ObjectId( Praise_id )
            } , {
                updatedate : nowstr ,
                iscancel : false ,
            } , {
                new : true
            } ) ,
            updatecount ,
            addlog

        ] );
    }
    else {
        //没有id，就创建

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
        result = await Promise.all( [

            newmodel.save() ,
            updatecount ,
            addlog

        ] );
    }

    let newobj = false;

    // console.log( 'Add result' , result )

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
async function Delete ( tokendata , pyq_id , Praise_id ) {
    //数据解构出来
    let { name , mobile } = tokendata;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    let where = {
        _id : mongoose.Types.ObjectId( Praise_id )
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

    // console.log( 'Delete result' , result )

    if ( result != null && result.length >= 3 ) {
        //        newobj = result[ 1 ];  //这里返回 朋友圈 这条记录
        newobj = true;
    }

    return newobj;
}

/**
 * 是可以点赞状态
 * @param mobile
 * @param pyq_id
 * @returns {Promise<boolean>}
 * @constructor
 */
async function IsPraiseStatus ( mobile , pyq_id ) {

    //只搞 没有删除的
    let where = {

        pyq_id : mongoose.Types.ObjectId( pyq_id ) ,
        mobile : mobile ,
        isdelete : false

    }

    let result = {
        IsPraise : false ,
        Praise_id : ''
    };

    //把这个用户，这个帖子的 最后一个流水找回来
    let obj = await pyqpraisemodel.findOne( where ).sort( { addunix : -1 } );

    // console.log( 'IsPraiseStatus obj' , obj )

    if ( obj != null ) {

        //把id记录下来
        result = {
            Praise_id : obj._id.toString()
        };

        if ( obj.iscancel ) {
            //可以点赞
            result.IsPraise = true;
        }
        else {
            //可以取消点赞
            result.IsPraise = false;
        }
    }
    else {
        //记录 为空，说明还没有搞过
        //可以点赞
        result = {
            IsPraise : true ,
            Praise_id : ''
        };
    }

    return result;
}

module.exports = {

    Add ,
    Delete ,
    IsPraiseStatus ,

}
