/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:42
 功能: js脚本
 */

var mongoose = require( 'mongoose' );

//定义Schema
var kittySchema = mongoose.Schema( {
    ids : {
        type : String ,

    } ,
    mobile : {
        type : String ,
        unique : true ,
        required : true
    } ,
    avatar : {
        type : String ,
        default : ''
    } ,
    password : String ,

    name : String ,

    email : {
        type : String ,
        default : ''
    } ,

    //最后一次登录时间
    lastlogindate : {
        type : String ,
        default : ''
    } ,
    //累计登录次数
    logintimes : {
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

module.exports = mongoose.model( 'user' , kittySchema , 'user' );
