/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:39
 功能:  关于用户的路由
 */

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )()

const usercontroller = require( '../controller/user' )

let prefix = '/api/user';

router.get( `${ prefix }/getuserlist` , usercontroller.GetUserList )
router.post( `${ prefix }/isexistsmobile` , usercontroller.IsExistsMobile )
router.post( `${ prefix }/add` , usercontroller.AddUser )
router.post( `${ prefix }/login` , usercontroller.Login )
router.post( `${ prefix }/updateuseravatar` , usercontroller.UpdateUserAvatar )
router.post( `${ prefix }/updatepassword` , usercontroller.UpdatePassWord )

module.exports = router
