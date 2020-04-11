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
export const deletepyq = ( _id ) => {
    return axios.delete( `${ prefix }/${ _id }` );
}

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getlist = ( querytype = 'init' , pagecounts = 5 , minid = 0 , maxid = 0 ) => {
    let url = `${ prefix }?querytype=${ querytype }&pagecounts=${ pagecounts }&minid=${ minid }&maxid=${ maxid }`;
    return axios.get( url );

    //return axios.get( `${ prefix }/${ querytype }/${ pagecounts }/${ minid }/${ maxid }` );
}

/**
 * 点赞(点赞和取消点赞 都是这个方法)
 * @param mobile
 * @param avatar
 * @param name
 * @param pyq_id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const praise = ( pyq_id ) => {
    // let obj = {
    //
    //     mobile ,
    //     avatar ,
    //     name ,
    //     pyq_id ,
    //
    // }

    return axios.post( `${ prefix }/${ pyq_id }/pyqpraise` );
}

/**
 * 添加bbs
 * @param mobile
 * @param avatar
 * @param name
 * @param pyq_id
 * @param txt
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addbbs = ( pyq_id , txt ) => {
    let obj = {

        pyq_id ,
        txt
    }

    return axios.post( `${ prefix }/${ pyq_id }/pyqbbs` , obj );
}

//好像少一个删除 bbs
