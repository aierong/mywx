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
            name : 'string' ,

            // 可以写int,因为post中接收的可以是数字
            age : 'int' ,

            //val1不是必须参数,类型是string
            // 如果不声明required，就是默认必须参数
            val1 : {
                type : 'string' ,
                required : false
            },

            //布尔
            isauto : 'boolean' ,

            //数组类型
            arr : 'array' ,

            //数组类型,并且每个元素都是整数
            //	"nums":[1,2,4]
            nums : {
                type : 'array' ,
                //itemType定义每个元素类型
                itemType : 'int' ,
                //数组元素最多个数和最少个数
                max : 3 ,
                min : 0
            } ,

            // 	"objs":[ { "a":1,"b":"qq" } ]
            objs : {
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

        let obj = await pyqservice.Add( postData );

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

        let { id : _id } = params;

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
