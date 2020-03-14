/*
 作者: chenghao
 Date: 2019/10/7
 Time: 16:57
 功能: js脚本
 */

import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import * as constant from '@/common/constant.js'

import location from '@/store/location/index.js'
import user from '@/store/user/index.js'
import other from '@/store/other/index.js'

Vue.use( Vuex )

const vuexPersistedcookie_modules_Cookies = createPersistedState( {
    //key是给持久化状态起个名字
    key : constant.MyVuePersistedName.LoginUserId ,

    storage : {
        getItem : key => Cookies.get( key ) ,

        setItem : ( key , value ) => Cookies.set( key , value , {
            expires : constant.CookieExpires
        } ) ,

        removeItem : key => Cookies.remove( key ) ,
    } ,

    //reducer是设置要持久化的变量,不设置就是默认是全部变量

    reducer ( val ) {
        return {
            //只保存aaa模块的某个值
            user : {
                //user模块的
                loginuserid : val.user.loginuserid ,

            }

        }
    }
} );

const vuexPersisted_modules_localStorage = createPersistedState( {
    //key是给持久化状态起个名字，默认:vuex
    key : 'vuexPersisted_modules_localStorage' ,

    // window.sessionStorage 是存储在会话
    // window.localStorage   是本地存储
    storage : window.localStorage ,

    reducer ( val , paths ) {

        //由于是分模块的,所以得分组分别赋值
        //可以同时做多个模块的

        let obj = {
            location : {

                location : val.location.location ,
                address : val.location.address ,

            } ,
            user : {

                loginuser : val.user.loginuser ,

            } ,
            other : {

                IsRefreshContactsList : val.other.IsRefreshContactsList ,

            }

        }

        return obj;

    }
} );

export default new Vuex.Store( {

    modules : {
        location : location ,
        user : user ,
        other : other
    } ,
    plugins : [

        vuexPersistedcookie_modules_Cookies ,
        vuexPersisted_modules_localStorage ,

    ] ,

} )

