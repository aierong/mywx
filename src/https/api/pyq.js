/*
 作者: chenghao
 Date: 2020/3/16
 Time: 20:15
 功能: js脚本
 */

import axios from 'axios'

let prefix = '/pyqs';

/**
 * 发朋友圈
 * @param mobile
 * @param avatar
 * @param name
 * @param txt
 * @param imglist
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addpyq = ( mobile , name , avatar , txt , imglist ) => {
    let obj = {
        mobile ,
        avatar ,
        name ,
        txt ,
        imglist
    }

    return axios.post( `${ prefix }` , obj );
}

/**
 * 删除
 * @param mobile
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const deletepyq = ( _id , mobile ) => {
    return axios.delete( `${ prefix }/${ _id }/${ mobile }` );
}

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getlist = ( querytype = 'init' , pagecounts = 5 , minid = 0 , maxid = 0 ) => {
    return axios.get( `${ prefix }/${ querytype }/${ pagecounts }/${ minid }/${ maxid }` );
}


