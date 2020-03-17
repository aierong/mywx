/*
 作者: chenghao
 Date: 2020/3/13
 Time: 23:24
 功能: js脚本
 */

var mongoose = require( 'mongoose' );

//定义Schema
var RunLogSchema = mongoose.Schema( {
    runtype : {
        type : String ,
        default : 'login'
    } ,
    ids : {
        type : String ,
        unique : true
    } ,
    mobile : {

        type : String ,

    } ,
    remark : {
        type : String ,
        default : ''
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

module.exports = mongoose.model( 'runlog' , RunLogSchema , 'runlog' );
