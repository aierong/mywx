/*
 作者: chenghao
 Date: 2019/10/7
 Time: 16:51
 功能: js脚本
 */

// import getters from '@/store/user/getters.js'
import mutations from '@/store/other/mutations.js'

const state = {

    IsRefreshContactsList : true , // 标记是否刷新联系人列表页

}

export default {
    state : state ,

    // getters : getters ,
    mutations : mutations ,

    //打开 命名空间
    namespaced : true
}



