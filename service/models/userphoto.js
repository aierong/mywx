/*
 作者: chenghao
 Date: 2020/3/14
 Time: 10:56
 功能:
 */

var mongoose = require( 'mongoose' );

//定义Schema
var UserPhotoSchema = mongoose.Schema( {
    ids : {
        type : String ,
        // unique : true
    } ,
    mobile : {
        type : String ,
        unique : true ,
        required : true
    } ,
    isshare : {
        type : Boolean ,
        default : false
    } ,
    imgs : {
        type : [
            {
                imgdata : {
                    type : String ,

                } ,
                size : {
                    type : Number ,
                    min : 0 ,

                } ,
                filename : {
                    type : String ,
                    default : ''
                },
                filetype : {
                    type : String ,
                    default : ''
                },
                uploadimgdate : {
                    type : String ,
                    default : ''
                },
            }
        ] ,
        default : []
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

module.exports = mongoose.model( 'userphoto' , UserPhotoSchema , 'userphoto' );


