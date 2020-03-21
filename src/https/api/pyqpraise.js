/*
 作者: chenghao
 Date: 2020/3/21
 Time: 11:32
 功能: js脚本
 */

import axios from 'axios'

let prefix = '/pyqpraise';

/**
 * 点赞
 * @param mobile
 * @param avatar
 * @param name
 * @param pyq_id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addpraise = ( mobile , avatar , name , pyq_id ) => {
    let obj = {
        mobile ,
        avatar ,
        name ,
        pyq_id ,

    }

    return axios.post( `${ prefix }/add` , obj );
}


