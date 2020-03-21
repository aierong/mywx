/*
 作者: chenghao
 Date: 2020/3/21
 Time: 11:19
 功能: js脚本
 */

import axios from 'axios'

let prefix = '/pyqbbs';

/**
 * 添加bbs
 * @param mobile
 * @param avatar
 * @param name
 * @param pyq_id
 * @param txt
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addbbs = ( mobile , avatar , name , pyq_id , txt ) => {
    let obj = {
        mobile ,
        avatar ,
        name ,
        pyq_id ,
        txt
    }

    return axios.post( `${ prefix }/add` , obj );
}


