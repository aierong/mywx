/*
 作者: chenghao
 Date: 2020/3/14
 Time: 19:02
 功能: js脚本
 */

import Vue from 'vue'
import axios from 'axios';
import router from '@/router/index.js';

let _url = process.env.VUE_APP_serverurl;
axios.defaults.baseURL = `${ _url }/api`

//绑定到原型上
Vue.prototype.$axios = axios;

// 请求拦截
axios.interceptors.request.use(
    config => {
        // if ( localStorage.wxpyqToken ) {
        //     config.headers.Authorization = JSON.parse( localStorage.wxpyqToken );
        // }
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
        // console.log( error )

        const { status } = error.response;

        if ( status == 401 ) {
            alert( 'token过期, 请重新登录!' );
            // 清楚token
            localStorage.removeItem( 'wxpyqToken' );
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


