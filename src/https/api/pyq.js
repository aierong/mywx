/*
 作者: chenghao
 Date: 2020/3/16
 Time: 20:15
 功能: js脚本
 */

import axios from 'axios'

let prefix = '/pyq';

/**
 * 发朋友圈
 * @param mobile
 * @param avatar
 * @param name
 * @param txt
 * @param imglist
 * @returns {Promise<AxiosResponse<T>>}
 */
export const add = ( mobile , avatar , name , txt , imglist ) => {
    let obj = {
        mobile ,
        avatar ,
        name ,
        txt ,
        imglist
    }

    return axios.post( `${ prefix }/add` , obj );
}

