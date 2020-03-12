/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:42
 功能: js脚本
 */

var mongoose = require( 'mongoose' );

//定义Schema
var kittySchema = mongoose.Schema( {
    ids : String ,
    mobile : String ,
    avatar : String ,
    password : String ,

    name : String ,
    email : String ,

    //最后一次登录时间
    lastlogindate : String ,
    //累计登录次数
    logintimes : {

        type : Number ,
        min : 0

    } ,

    adddate : String ,
    updatedate : String ,
    deletedate : String ,

} , {
    //versionKey =false 禁用版本，要不每次插入数据都带一个__v
    versionKey : false
} );

let user = mongoose.model( 'user' , kittySchema , 'user' );
module.exports = user;
