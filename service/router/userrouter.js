/*
 作者: chenghao
 Date: 2020/3/12
 Time: 10:39
 功能:  关于用户的路由
 */
let prefix = '/api/users';

// require( 'koa-router' )()是引入并且初始化 ,等同于下面2句
// const Router = require('koa-router')
// const router = new Router()
const router = require( 'koa-router' )( {
    prefix : prefix
} )

const usercontroller = require( '../controller/user' )

router.get( `/` , usercontroller.GetUserList )
router.get( `/:mobile` , usercontroller.GetUserByMobile )
// 这个方法不要了，用上面这个
// router.post( `/isexistsmobile` , usercontroller.IsExistsMobile )
router.post( `/register` , usercontroller.AddUser )
router.post( `/login` , usercontroller.Login )
router.put( `/updateuseravatar` , usercontroller.UpdateUserAvatar )
router.put( `/updatepassword` , usercontroller.UpdatePassWord )

module.exports = router
