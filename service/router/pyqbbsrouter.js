/*
 作者: chenghao
 Date: 2020/3/19
 Time: 19:12
 功能: js脚本
 */

/**
 * 前缀
 * @type {string}
 */
let prefix = '/api/pyqbbss';

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )( {
    prefix : prefix
} )

const pyqbbscontroller = require( '../controller/pyqbbs' )

router.post( `` , pyqbbscontroller.Add )
router.delete( `/:id` , pyqbbscontroller.Delete )

module.exports = router
