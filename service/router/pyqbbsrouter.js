/*
 作者: chenghao
 Date: 2020/3/19
 Time: 19:12
 功能: js脚本
 */

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )()

const pyqbbscontroller = require( '../controller/pyqbbs' )

let prefix = '/api/pyqbbs';

router.post( `${ prefix }/add` , pyqbbscontroller.Add )
router.post( `${ prefix }/delete` , pyqbbscontroller.Delete )

module.exports = router
