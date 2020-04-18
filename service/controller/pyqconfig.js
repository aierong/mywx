/*
 作者: chenghao
 Date: 2020/4/18
 Time: 11:26
 功能: js脚本
 */

// 引入 service 文件
const pyqconfigservice = require( '../service/pyqconfigservice' )
// const pyqservice = require( '../service/pyqservice' )
const common = require( '../common/common.js' )
// const { GetTokenData } = require( '../common/jwttoken' )

module.exports = {
    GetData : async ( ctx , next ) => {
        //

        let result = {

            bgurl : ''

        }

        //先接收参数
        let params = ctx.params
        let { id : mobile } = params;
        // let tokendata = GetTokenData( ctx );
        // let { mobile } = tokendata;

        // console.log( 'Praise postData' , postData )
        // let { mobile , pyq_id } = postData;
        let _data = await pyqconfigservice.GetData( mobile );

        if ( _data != null && _data.bgpicfilename ) {
            result.bgurl = common.GetUploadImageUrl( ctx.origin , _data.bgpath , _data.bgpicfilename );
        }

        // console.log( 'GetData obj' , result )

        ctx.body = result;
    } ,
}


