/*
 作者: chenghao
 Date: 2020/3/15
 Time: 14:01
 功能: js脚本
 */

var mongoose = require( 'mongoose' );

//定义Schema
var PyqBbsSchema = mongoose.Schema( {
    //外键id 没有定义

    ids : {
        type : String ,
        unique : true
    } ,
    date : {
        type : String ,
        default : ''
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

let pyqbbsmodel = mongoose.model( 'pyqbbs' , PyqBbsSchema , 'pyqbbs' );
module.exports = pyqbbsmodel;


