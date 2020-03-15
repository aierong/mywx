/*
 作者: chenghao
 Date: 2020/3/15
 Time: 13:16
 功能: js脚本
 */

var mongoose = require( 'mongoose' );

//定义Schema
var PyqSchema = mongoose.Schema( {
    ids : {
        type : String ,
        unique : true
    } ,
    date : {
        type : String ,

    } ,
    imglist : {
        type : Array ,
        default : []
    } ,

    mobile : {
        type : String ,
        default : ''
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
    bbscounts:{
        type : Number ,
        min : 0 ,
        default : 0
    },

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

let pyqmodel = mongoose.model( 'pyq' , PyqSchema , 'pyq' );
module.exports = pyqmodel;






