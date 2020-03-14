/*
 作者: chenghao
 功能:
 */

import * as types from '@/store/other/mutation-types.js'

export default {

    // 设置参数
    [ types.SetRefreshContactsList ] ( state , val ) {

        state.IsRefreshContactsList = val;

    } ,

}
