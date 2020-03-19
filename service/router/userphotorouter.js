/*
 作者: chenghao
 Date: 2020/3/14
 Time: 17:52
 功能: js脚本
 */

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )()

const userphotocontroller = require( '../controller/userphoto' )

let prefix = '/api/userphoto';

router.get( `${ prefix }/getuserphoto/:mobile` , userphotocontroller.GetUserPhoto )
router.post( `${ prefix }/save` , userphotocontroller.Save )

module.exports = router
