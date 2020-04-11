/*
 作者: chenghao
 Date: 2020/3/15
 Time: 13:16
 功能: js脚本
 */

var mongoose = require( 'mongoose' );

//定义Schema
var PyqSchema = mongoose.Schema( {
    //是删除
    isdelete : {
        type : Boolean ,
        default : false
    } ,
    ids : {
        type : String ,

    } ,
    //发朋友圈的时间
    date : {
        type : String ,

    } ,
    imglist : {
        type : Array ,
        default : []
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
    txt : {
        type : String ,
        default : ''
    } ,
    //bbs数量
    bbscounts : {
        type : Number ,
        min : 0 ,
        default : 0
    } ,
    //点赞数量
    praisecounts : {
        type : Number ,
        min : 0 ,
        default : 0
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

module.exports = mongoose.model( 'pyq' , PyqSchema , 'pyq' );


