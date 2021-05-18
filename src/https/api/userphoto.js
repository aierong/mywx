/*
 作者: chenghao
 Date: 2020/3/14
 Time: 21:55
 功能: js脚本
 */

// import axios from 'axios'
import axios from '@/https/http.js';

let prefix = '/userphotos';

/**
 * 获取用户图片列表
 * @param mobile
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getuserphoto = ( mobile = '' ) => {

    return axios.get( `${ prefix }/${ mobile }` );
}

/**
 * 修改个人相册
 * @param mobile
 * @param isshare
 * @param imgs
 * @returns {Promise<AxiosResponse<T>>}
 */
export const save = ( mobile = '' , isshare = false , imgs = [] ) => {
    let obj = {
        mobile : mobile ,
        isshare : isshare ,
        imgs : imgs
    };

    console.log( 'save obj' , obj )

    return axios.post( `${ prefix }` , obj );
}


