/*
 作者: chenghao
 Date: 2020/3/19
 Time: 19:01
 功能: js脚本
 */

// 引入 service 文件
const pyqbbsservice = require( '../service/pyqbbsservice' )
const pyqservice = require( '../service/pyqservice' )
const common = require( '../common/common.js' )
const { GetTokenData } = require( '../common/jwttoken' )

module.exports = {
    Add : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyqbbs/add

        let result = {

            isok : true ,
            errmsg : '' ,
            data : null

        }

        //先接收参数
        // let params = ctx.params
        // let { id : pyq_id } = params;
        let tokendata = GetTokenData( ctx );

        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let { pyq_id , txt } = postData;

        let obj = await pyqbbsservice.Add( tokendata , pyq_id , txt );

        if ( obj ) {

            let { pyq_id } = postData;
            let _data = await pyqservice.GetPyqById( pyq_id );  //取最新的这条记录回来

            result = {

                isok : true ,
                errmsg : '' ,
                data : _data
            }
        }
        else {
            result = {

                isok : false ,
                errmsg : '评论失败' ,
                data : null
            }
        }

        ctx.body = result;
    } ,
    Delete : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyqbbs/delete

        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        let obj = await pyqbbsservice.Delete( postData );

        if ( obj != null ) {
            result = {

                isok : true ,
                errmsg : '' ,

            }
        }
        else {
            result = {

                isok : false ,
                errmsg : '删除评论失败' ,

            }
        }

        ctx.body = result;
    } ,
}
