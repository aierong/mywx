/*
 作者: chenghao
 Date: 2020/3/16
 Time: 17:57
 功能: js脚本
 */

// 引入 service 文件
const pyqpraiseservice = require( '../service/pyqpraiseservice' )
const common = require( '../common/common.js' )

module.exports = {
    Add : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyqpraise/add

        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { mobile , pyq_id } = postData;
        let ischeck = await pyqpraiseservice.PraiseCheck( true , mobile , pyq_id );

        if ( !ischeck ) {
            //检查不合格
            result = {

                isok : false ,
                errmsg : '不允许点赞' ,

            }

        }
        else {
            let obj = await pyqpraiseservice.Add( postData );

            if ( obj != null ) {
                result = {

                    isok : true ,
                    errmsg : '' ,

                }
            }
            else {
                result = {

                    isok : false ,
                    errmsg : '点赞失败' ,

                }
            }
        }

        ctx.body = result;
    } ,
    Delete : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyqpraise/delete

        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { mobile , pyq_id } = postData;
        let ischeck = await pyqpraiseservice.PraiseCheck( false , mobile , pyq_id );

        if ( !ischeck ) {
            //检查不合格
            result = {

                isok : false ,
                errmsg : '不允许取消点赞' ,

            }

        }
        else {
            let obj = await pyqpraiseservice.Delete( postData );

            if ( obj != null ) {
                result = {

                    isok : true ,
                    errmsg : '' ,

                }
            }
            else {
                result = {

                    isok : false ,
                    errmsg : '取消点赞失败' ,

                }
            }
        }

        ctx.body = result;
    } ,
}






