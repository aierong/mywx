/*
 作者: chenghao
 Date: 2020/3/14
 Time: 19:02
 功能: js脚本
 */

import Vue from 'vue'
import axios from 'axios';
import router from '@/router/index.js';
import * as constant from '@/common/constant.js'

let _url = process.env.VUE_APP_serverurl;
axios.defaults.baseURL = `${ _url }/api`

//绑定到原型上
Vue.prototype.$axios = axios;

// 请求拦截
axios.interceptors.request.use(
    config => {
        let loginusertoken = localStorage.getItem( constant.tokenname );
        if ( loginusertoken ) {
            // Bearer是JWT的认证头部信息
            // 注意要加:'Bearer '  有一个空格
            // 我们后端是用koa-jwt自动验证，必须要加上'Bearer ',如果是自己写验证还得把'Bearer '去掉再调用jwt.verify验证
            config.headers.common[ 'Authorization' ] = 'Bearer ' + loginusertoken;
        }

        return config;
    } ,
    error => {
        return Promise.reject( error );
    }
);

// 响应拦截
axios.interceptors.response.use(
    response => {
        return response;
    } ,
    error => {
        // 错误提醒

        const { status } = error.response;

        if ( status == 401 ) {
            alert( 'token过期, 请重新登录!' );
            // 清楚token
            localStorage.removeItem( constant.tokenname );
            // 页面跳转
            router.push( '/login' );
        }
        else {
            alert( error.response.data );
        }
        return Promise.reject( error );
    }
);

export default axios;


