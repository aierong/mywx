/*
 作者: chenghao
 Date: 2020/4/18
 Time: 11:26
 功能: js脚本
 */
const path = require( "path" );

// 引入 service 文件
const pyqconfigservice = require( '../service/pyqconfigservice' )
// const pyqservice = require( '../service/pyqservice' )
const common = require( '../common/common.js' )
// const { GetTokenData } = require( '../common/jwttoken' )

module.exports = {
    GetConfig : async ( ctx , next ) => {

        let result = {

            bgpicurl : ''

        }

        //先接收参数
        let params = ctx.params
        let { mobile } = params;
        // let tokendata = GetTokenData( ctx );
        // let { mobile } = tokendata;

        // console.log( 'Praise postData' , postData )
        // let { mobile , pyq_id } = postData;
        let _data = await pyqconfigservice.GetData( mobile );

        if ( _data != null && _data.bgpicfilename ) {
            result.bgpicurl = common.GetUploadImageUrl( ctx.origin , _data.bgpicpath , _data.bgpicfilename );
        }
        else {
            //没有配置，给一个默认图片地址
            result.bgpicurl = `${ ctx.origin }/Pic/BgImage/pyqdefaultbg.png`;
        }
        // console.log( 'GetData obj' , result )

        ctx.body = result;
    } ,
    Upload : async ( ctx , next ) => {
        //

        let result = {

            IsOk : false ,
            bgpicurl : ''

        }

        //先接收参数
        let params = ctx.params
        let { mobile } = params;
        // let tokendata = GetTokenData( ctx );
        // let { mobile } = tokendata;

        //files中的file是前端传递过来的名字
        // 如果前端传递多个文件,可以要前端都命名file,这样我这里取到的就是数组了
        //如果是一个文件 file就是对象，如果是多个文件，file就是数组
        const file = ctx.request.files.file;

        let filepath = "";

        // let fileinfo = [];
        // let isarr = Array.isArray( file );

        // 一个文件
        filepath = file.path;

        let filename = path.basename( filepath )
        //onFileBegin事件中存储的日期目录名，取回来
        let datedir = file.datedir;

        // 上传图片的链接
        let imgurl = common.GetUploadImageUrl( ctx.origin , datedir , filename );

        //保存一下
        let _data = await pyqconfigservice.Save( mobile , datedir , filename );

        if ( _data != null ) {
            result = {

                IsOk : true ,
                bgpicurl : imgurl

            }
        }

        ctx.body = result;
    } ,
}


