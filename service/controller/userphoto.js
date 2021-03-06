/*
 作者: chenghao
 Date: 2020/3/14
 Time: 12:34
 功能: js脚本
 */

// 引入 service 文件
const userphotoservice = require( '../service/userphotoservice.js' )
const common = require( '../common/common.js' )

module.exports = {
    Save : async ( ctx , next ) => {
        //  http://localhost:3001/api/userphoto/save

        //如果验证不成功,会自动抛出异常
        ctx.verifyParams( {

            mobile : {
                type : 'string' ,

            } ,

            //布尔
            isshare : 'boolean' ,

            // //数组类型
            // imgs : 'array' ,

            // 	"objs":[ { "a":1,"b":"qq" } ]
            imgs : {
                type : 'array' ,
                //itemType定义每个元素都是对象
                itemType : 'object' ,

            }
        } );

        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { mobile , isshare , imgs } = postData;

        //开始保存
        let obj = await userphotoservice.Save( mobile , isshare , imgs );

        if ( obj == null ) {
            result = {
                isok : false ,
                errmsg : '相册保存失败'
            }
        }
        else {
            result = {
                isok : true ,
                errmsg : ''
            }
        }

        ctx.body = result

    } ,
    GetUserPhoto : async ( ctx , next ) => {
        //先接收参数
        let params = ctx.params;

        let { mobile } = params;

        let obj = await userphotoservice.GetUserPhoto( mobile );

        // console.log( 'GetUserPhoto obj' , obj )

        ctx.body = {
            data : obj
        }
    } ,
}

