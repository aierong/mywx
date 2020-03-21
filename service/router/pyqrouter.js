/*
 作者: chenghao
 Date: 2020/3/16
 Time: 10:36
 功能: js脚本
 */

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )()

const pyqcontroller = require( '../controller/pyq' )

let prefix = '/api/pyq';

router.get( `${ prefix }/getlist` , pyqcontroller.GetList )
router.post( `${ prefix }/add` , pyqcontroller.Add )
router.delete( `${ prefix }/delete/:_id/:mobile` , pyqcontroller.Delete )

module.exports = router
