/*
 作者: chenghao
 Date: 2020/3/14
 Time: 17:52
 功能: js脚本
 */
let prefix = '/api/userphoto';

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )( {
    prefix : prefix
} )

const userphotocontroller = require( '../controller/userphoto' )

router.get( `/getuserphoto/:mobile` , userphotocontroller.GetUserPhoto )
router.post( `/save` , userphotocontroller.Save )

module.exports = router
