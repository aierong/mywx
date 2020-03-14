/*
 作者: chenghao
 Date: 2019/10/7
 Time: 16:41
 功能: js脚本
 */

import getters from '@/store/user/getters.js'
import mutations from '@/store/user/mutations.js'

const state = {
    //登录用户帐号
    loginuserid : '' ,

    //登录用户信息
    loginuser : null ,

}

export default {
    state : state ,

    getters : getters ,
    mutations : mutations ,

    //打开 命名空间
    namespaced : true
}
