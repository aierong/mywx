/*
 作者: chenghao
 Date: 2020/3/16
 Time: 17:57
 功能: js脚本
 */

// 引入 service 文件
const pyqpraiseservice = require( '../service/pyqpraiseservice' )
const pyqservice = require( '../service/pyqservice' )
const common = require( '../common/common.js' )

module.exports = {
    Praise : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyqpraise/praise

        // console.log( 'Praise' )

        let result = {

            isok : true ,
            errmsg : '' ,
            data : null

        }

        //先接收post的参数
        //接收到post数据 postData是一个对象
        let postData = ctx.request.body;

        // console.log( 'Praise postData' , postData )
        let { mobile , pyq_id } = postData;
        let _IsPraiseStatusResult = await pyqpraiseservice.IsPraiseStatus( mobile , pyq_id );

        // console.log( 'Praise _IsPraiseStatusResult' , _IsPraiseStatusResult )

        let obj = false;

        if ( _IsPraiseStatusResult.IsPraise ) {
            obj = await pyqpraiseservice.Add( postData , _IsPraiseStatusResult.Praise_id );
        }
        else {
            obj = await pyqpraiseservice.Delete( postData , _IsPraiseStatusResult.Praise_id );
        }

        // console.log( 'Praise obj' , obj )

        if ( obj ) {

            let _data = await pyqservice.GetPyqById( pyq_id );  //取最新的这条记录回来

            // console.log( 'Praise _data' , _data )

            result = {

                isok : true ,
                errmsg : '' ,
                data : _data
            }
        }
        else {
            result = {

                isok : false ,
                errmsg : '点赞失败' ,
                data : null

            }
        }

        ctx.body = result;
    } ,
}


