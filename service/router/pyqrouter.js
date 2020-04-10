/*
 作者: chenghao
 Date: 2020/3/16
 Time: 10:36
 功能: js脚本
 */
let prefix = '/api/pyqs';

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )( {
    prefix : prefix
} )

const pyqcontroller = require( '../controller/pyq' )

router.get( `/:querytype/:pagecounts/:minid/:maxid` , pyqcontroller.GetList )
router.post( `` , pyqcontroller.Add )
router.delete( `/:_id/:mobile` , pyqcontroller.Delete )

module.exports = router
