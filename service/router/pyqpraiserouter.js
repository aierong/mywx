/*
 作者: chenghao
 Date: 2020/3/16
 Time: 18:13
 功能: js脚本
 */

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )()

const pyqpraisecontroller = require( '../controller/pyqpraise' )

let prefix = '/api/pyqpraise';

router.post( `${ prefix }/praise` , pyqpraisecontroller.Praise )

module.exports = router
