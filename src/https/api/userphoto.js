/*
 作者: chenghao
 Date: 2020/3/14
 Time: 21:55
 功能: js脚本
 */

import axios from 'axios'

let prefix = '/userphoto';

/**
 * 获取用户图片列表
 * @param mobile
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getuserphoto = ( mobile ) => {

    return axios.get( `${ prefix }/getuserphoto/${ mobile }` );
}


