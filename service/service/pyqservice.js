/*
 作者: chenghao
 Date: 2020/3/16
 Time: 10:22
 功能: js脚本
 */

var mongoose = require( 'mongoose' );
const pyqmodel = require( '../models/pyq' )
const pyqpraisemodel = require( '../models/pyqpraise.js' )
const pyqbbsmodel = require( '../models/pyqbbs' )
const common = require( '../common/common.js' )
const log = require( '../common/log' )

/**
 * 发布朋友圈
 * @param postData
 * @returns {Promise<null>}
 * @constructor
 */
async function Add ( mobile , avatar , name , txt , imglist ) {

    // 数据解构出来
    // let { mobile , avatar , name , txt , imglist } = postData;

    let now = new Date();
    let nowstr = common.GetNowString( now );

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
        addunix : common.GetNowUnix( now ) ,
        adddate : nowstr ,
        date : nowstr ,
        // 搞一个guid
        ids : common.GetGuid()
    } );

    var result = await Promise.all( [
        newmodel.save() ,
        log.AddRunLog( mobile , 'AddPyq' , `用户${ mobile }(${ name })发布一个朋友圈` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

/**
 * 检查删除
 * @param _id
 * @param mobile
 * @returns {Promise<void>}
 * @constructor
 */
async function CheckDelete ( _id , mobile ) {

    let where = {
        _id : _id
    }

    let obj = await pyqmodel.findOne( where );

    if ( obj == null ) {
        return "ID错误";
    }

    if ( obj.mobile == mobile ) {
        return "";
    }
    else {
        return "不是发表人不允许删除"
    }
}

/**
 * 删除朋友圈
 * @param _id
 * @returns {Promise<null>}
 * @constructor
 */
async function Delete ( _id , tokendata ) {

    //数据解构出来
    let { name , mobile } = tokendata;

    let now = new Date();
    let nowstr = common.GetNowString( now );

    let where = {
        _id : _id
    };

    var result = await Promise.all( [
        pyqmodel.findOneAndUpdate( where , {
            isdelete : true ,
            deletedate : nowstr
        } , {
            new : true
        } ) ,
        //这个朋友圈的点赞全部删除
        pyqpraisemodel.updateMany( { pyq_id : _id } , {
            isdelete : true ,
            deletedate : nowstr
        } ) ,
        //这个朋友的bbs全部删除
        pyqbbsmodel.updateMany( { pyq_id : _id } , {
            isdelete : true ,
            deletedate : nowstr
        } ) ,
        log.AddRunLog( mobile , 'DeletePyq' , `用户${ mobile }(${ name })删除一个朋友圈 _id:${ _id }` )
    ] );

    let newobj = null;

    if ( result != null && result.length >= 2 ) {
        newobj = result[ 0 ];
    }

    return newobj;
}

/**
 * 修改点赞数量
 * @param _id
 * @param num
 * @returns {Promise<*>}
 * @constructor
 */
async function UpdatePraiseCount ( _id = '' , num = 1 ) {

    let now = new Date();
    let nowstr = common.GetNowString( now );

    let where = {
        _id : _id
    };

    let newobj = await pyqmodel.findOneAndUpdate( where , [
        {
            $set : {
                praisecounts : { $add : [ { $ifNull : [ "$praisecounts" , 0 ] } , num ] } ,
                updatedate : nowstr
            }
        }
    ] , {
        new : true
    } );

    return newobj;
}

/**
 * 修改bbs数量
 * @param _id
 * @param num
 * @returns {Promise<*>}
 * @constructor
 */
async function UpdateBbsCount ( _id = '' , num = 1 ) {

    let now = new Date();
    let nowstr = common.GetNowString( now );

    let where = {
        _id : _id
    };

    let newobj = await pyqmodel.findOneAndUpdate( where , [
        {
            $set : {
                bbscounts : { $add : [ { $ifNull : [ "$bbscounts" , 0 ] } , num ] } ,
                updatedate : nowstr
            }
        }
    ] , {
        new : true
    } );

    return newobj;
}

/**
 * 查询
 * @returns {Promise<Aggregate>}
 * @constructor
 */
async function GetList ( querytype = 'init' , pagecounts = 5 , minid = 0 , maxid = 0 ) {
    /**


     db.pyq.aggregate([
     {
        $match: {
            isdelete: false,
            addunix: { $gt: 1 }
        }
    },
     {
        $lookup:
            {
                from: "pyqpraise",
                let: { pyq_id: "$_id" },
                pipeline: [
                    {
                        $match:
                            {
                                $expr:
                                    {
                                        $and:
                                            [

                                                { $eq: ["$pyq_id", "$$pyq_id"] },
                                                { $eq: ["$iscancel", false] }

                                            ]
                                    }
                            }
                    }

                ],
                as: "praiselist"
            }

    },
     {
         $lookup:
            {
                from: "pyqbbs",
                let: { pyq_id: "$_id" },
                pipeline: [
                    {
                        $match:
                            {
                                $expr:
                                    {
                                        $and:
                                            [

                                                { $eq: ["$pyq_id", "$$pyq_id"] },
                                                { $eq: ["$isdelete", false] }

                                            ]
                                    }
                            }
                    }

                ],
                as: "bbslist"
            }
    },
     {
        $sort: { addunix: 1 }
    },
     {

        $limit: 1000
    }
     ])
     */

    if ( pagecounts <= 0 ) {
        pagecounts = 5;
    }

    let where = {};
    if ( querytype == 'init' ) {
        //就是初始化，第一次搞
        where = { isdelete : false };
    }
    else {
        if ( querytype == 'down' ) {
            where = {
                isdelete : false ,
                addunix : { $lt : minid }
            };
        }

        if ( querytype == 'up' ) {
            where = {
                isdelete : false ,
                addunix : { $gt : maxid }
            };
        }

    }

    let obj = await pyqmodel.aggregate( [
        {
            // $match : {
            //     isdelete : false ,
            //     addunix : { $gt : 1 }
            // }
            $match : where
        } ,
        {
            $lookup :
                {
                    from : "pyqpraise" ,
                    let : { pyq_id : "$_id" } ,
                    pipeline : [
                        {
                            $match :
                                {
                                    $expr :
                                        {
                                            $and :
                                                [

                                                    { $eq : [ "$pyq_id" , "$$pyq_id" ] } ,
                                                    //没有取消 没有删除的
                                                    { $eq : [ "$iscancel" , false ] } ,
                                                    { $eq : [ "$isdelete" , false ] }
                                                ]
                                        }
                                }
                        }

                    ] ,
                    as : "praiselist"
                }

        } ,
        {
            $lookup :
                {
                    from : "pyqbbs" ,
                    let : { pyq_id : "$_id" } ,
                    pipeline : [
                        {
                            $match :
                                {
                                    $expr :
                                        {
                                            $and :
                                                [

                                                    { $eq : [ "$pyq_id" , "$$pyq_id" ] } ,
                                                    { $eq : [ "$isdelete" , false ] }

                                                ]
                                        }
                                }
                        }

                    ] ,
                    as : "bbslist"
                }
        } ,
        {
            //最新排前面
            $sort : { addunix : -1 }
        } ,
        {
            $limit : pagecounts
        }
    ] );

    return obj;
}

/**
 * 由id得一条朋友圈
 * @param _id
 * @returns {Promise<Aggregate>}
 * @constructor
 */
async function GetPyqById ( _id ) {

    let obj = await pyqmodel.aggregate( [
        {
            $match : {
                // 注意 这里要转换一下
                _id : mongoose.Types.ObjectId( _id )

            }
        } ,
        {
            $lookup :
                {
                    from : "pyqpraise" ,
                    let : { pyq_id : "$_id" } ,
                    pipeline : [
                        {
                            $match :
                                {
                                    $expr :
                                        {
                                            $and :
                                                [

                                                    { $eq : [ "$pyq_id" , "$$pyq_id" ] } ,
                                                    //没有取消 没有删除的
                                                    { $eq : [ "$iscancel" , false ] } ,
                                                    { $eq : [ "$isdelete" , false ] }
                                                ]
                                        }
                                }
                        }

                    ] ,
                    as : "praiselist"
                }

        } ,
        {
            $lookup :
                {
                    from : "pyqbbs" ,
                    let : { pyq_id : "$_id" } ,
                    pipeline : [
                        {
                            $match :
                                {
                                    $expr :
                                        {
                                            $and :
                                                [

                                                    { $eq : [ "$pyq_id" , "$$pyq_id" ] } ,
                                                    { $eq : [ "$isdelete" , false ] }

                                                ]
                                        }
                                }
                        }

                    ] ,
                    as : "bbslist"
                }
        } ,

    ] );

    // console.log( 'GetPyqById obj' , obj )

    if ( obj != null && obj.length > 0 ) {
        return obj[ 0 ];
    }

    return null;
}

module.exports = {

    Add ,
    Delete ,
    CheckDelete ,
    UpdatePraiseCount ,
    UpdateBbsCount ,
    GetList ,
    GetPyqById ,

}
