/*
 作者: chenghao
 Date: 2020/3/15
 Time: 14:11
 功能: js脚本
 */
var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Schema.Types.ObjectId;

//定义Schema
var PyqPraiseSchema = mongoose.Schema( {
    //外键id
    pyq_id : {
        required : true ,
        type : ObjectId
    } ,
    //是取消点赞
    iscancel : {
        type : Boolean ,
        default : false
    } ,
    //是删除
    isdelete : {
        type : Boolean ,
        default : false
    } ,
    ids : {
        type : String ,

    } ,
    date : {
        type : String ,
        default : ''
    } ,

    mobile : {
        type : String ,
        default : '' ,
        required : true
    } ,

    name : {
        type : String ,
        default : ''
    } ,
    avatar : {
        type : String ,
        default : ''
    } ,
    //Unix 时间戳 13位
    addunix : {
        type : Number ,

    } ,
    adddate : {
        type : String ,
        default : ''
    } ,
    updatedate : {
        type : String ,
        default : ''
    } ,
    deletedate : {
        type : String ,
        default : ''
    } ,

} , {
    //versionKey =false 禁用版本，要不每次插入数据都带一个__v
    versionKey : false
} );

module.exports = mongoose.model( 'pyqpraise' , PyqPraiseSchema , 'pyqpraise' );


