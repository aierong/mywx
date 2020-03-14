import Vue from 'vue'
import Router from 'vue-router'
import * as constant from '@/common/constant.js'
import * as Cookies from 'js-cookie'

import Home from '@/views/Home.vue'

Vue.use( Router )

const router = new Router( {
    mode : 'history' ,
    base : process.env.BASE_URL ,
    routes : [
        {
            path : '/' ,
            // name : 'home' ,
            component : Home ,
            children : [
                {
                    path : '' ,
                    redirect : '/chats'
                } ,
                {

                    path : '/chats' ,
                    name : 'chats' ,

                    component : () => import('@/views/Chats.vue') ,

                } ,
                {
                    path : '/contacts' ,
                    name : 'contacts' ,
                    //路由懒加载
                    component : () => import('@/views/Contacts.vue') ,
                    //这个功能暂时放弃
                    meta : {

                        keepAlive : true // 需要被缓存

                    }
                } ,
                {
                    path : '/discover' ,
                    name : 'discover' ,
                    component : () => import('@/views/Discover.vue') ,

                } ,
                {
                    path : '/me' ,
                    name : 'me' ,
                    component : () => import('@/views/Me.vue') ,

                } ,
                {
                    path : '/othermaninfo/:queryusermobile' ,
                    name : 'othermaninfo' ,
                    component : () => import( '@/views/othermaninfo/othermaninfo.vue') ,
                    // 定义了props: true，这样页面中可以用props接收参数
                    props : true ,
                } ,
            ]
        } ,

        {
            path : '/login' ,
            name : 'login' ,

            component : () => import( '@/views/Login.vue') ,

        } ,
        {
            path : '/register' ,
            name : 'register' ,
            component : () => import( '@/views/Register.vue')
        } ,

        {
            path : '/setupdatapage' ,
            name : 'setupdatapage' ,

            component : () => import( '@/views/setup/SetupDataPage.vue')
        } ,
        {
            path : '/myphoto' ,
            name : 'myphoto' ,
            component : () => import( '@/views/photo/myphoto.vue')
        } ,
        {
            path : '/friendscircle' ,
            name : 'friendscircle' ,
            component : () => import( '@/views/friendscircle/friendscircle.vue')
        } ,
        {
            path : '/addfriendscircle' ,
            name : 'addfriendscircle' ,
            component : () => import( '@/views/friendscircle/addfriendscircle.vue')
        } ,

    ]
} )

router.beforeEach( ( to , from , next ) => {

    if ( to.path == '/login' || to.path == '/register' ) {

        next();
    }
    else {

        //let data = Cookies.getJSON( constant.MyVuePersistedName.LoginInfoName );
        //是存的一个对象,这里我们取对象
        let data = Cookies.getJSON( constant.MyVuePersistedName.LoginUserId );

        let isLogin = false;

        //注意是分模块的，所以这里要用data.user.loginuserid
        if ( data && data.user.loginuserid ) {
            isLogin = true;
        }

        // console.log( 'isLogin' , isLogin )

        //没有登录，就转向登录页
        isLogin ? next() : next( '/login' );
    }
} );

export default router


