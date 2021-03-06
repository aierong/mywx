/*
 作者: chenghao
 Date: 2020/3/16
 Time: 10:30
 功能: js脚本
 */

// 引入 service 文件
const pyqservice = require( '../service/pyqservice' )
const common = require( '../common/common.js' )
const { GetTokenData } = require( '../common/jwttoken' )

module.exports = {

    Add : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyq/add

        //如果验证不成功,会自动抛出异常
        ctx.verifyParams( {

            txt : {
                type : 'string' ,
                allowEmpty : true
            } ,

            imglist : {
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
        // 数据解构出来
        let { txt , imglist } = postData;

        let tokendata = GetTokenData( ctx );
        // console.log( 'tokendata' , tokendata )
        let { mobile , avatar , name } = tokendata;

        let obj = await pyqservice.Add( mobile , avatar , name , txt , imglist );

        if ( obj != null ) {
            result.isok = true;
        }
        else {
            result.isok = false;
        }

        ctx.body = result;
    } ,
    Delete : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyq/delete

        let result = {

            isok : true ,
            errmsg : '' ,

        }

        //先接收参数
        let params = ctx.params;

        let { pyqid : _id } = params;

        let tokendata = GetTokenData( ctx );
        // console.log( 'tokendata' , tokendata )
        let { mobile } = tokendata;
        // console.log( ' _id , mobile ' , _id , mobile )
        let resultcheck = await pyqservice.CheckDelete( _id , mobile );

        // console.log( 'resultcheck' , resultcheck )

        if ( resultcheck != '' ) {
            result = {

                isok : false ,
                errmsg : resultcheck ,

            }
        }
        else {
            let obj = await pyqservice.Delete( _id , tokendata );

            if ( obj != null ) {
                result.isok = true;
            }
            else {
                result = {

                    isok : false ,
                    errmsg : '操作失败' ,

                }
            }
        }

        ctx.body = result;
    } ,
    GetList : async ( ctx , next ) => {
        //  http://localhost:3001/api/pyq/getlist

        //先接收参数
        let params = ctx.query;

        // 收到的参数全部是 string
        let { querytype , pagecounts , minid , maxid } = params;

        // console.log( 'typeof(querytype)' , typeof ( querytype ) )
        // console.log( 'typeof(pagecounts)' , typeof ( pagecounts ) )
        // console.log( 'typeof(minid)' , typeof ( minid ) )

        let obj = await pyqservice.GetList( querytype , parseInt( pagecounts ) , parseInt( minid ) , parseInt( maxid ) )

        ctx.body = {
            // 一个数组
            listdata : obj
        }
    } ,

}
