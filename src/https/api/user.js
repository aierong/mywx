/*
 作者: chenghao
 Date: 2020/3/14
 Time: 18:55
 功能: js脚本
 */

import axios from 'axios'
import dayjs from "dayjs";

let prefix = '/user';

/**
 * 是存在手机号码
 * @param mobile
 * @returns {Promise<AxiosResponse<T>>}
 */
export const isexistsmobile = ( mobile ) => {
    let obj = { mobile : mobile }

    return axios.post( `${ prefix }/isexistsmobile` , obj );
}

/**
 * 添加用户（注册用户）
 * @param registerUser
 * @returns {Promise<AxiosResponse<T>>}
 */
export function adduser ( registerUser ) {

    // console.log(registerUser)

    return axios.post( `${ prefix }/add` , registerUser );
}

/**
 * 登录
 * @param mobile
 * @param password
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login ( mobile , password ) {
    let obj = {
        mobile : mobile ,
        password : password
    }

    return axios.post( `${ prefix }/login` , obj );
}

/**
 * 修改用户头像
 * @param mobile
 * @param avatar
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updateuseravatar ( mobile , avatar ) {

    let obj = {
        mobile : mobile ,
        avatar : avatar
    }

    return axios.post( `${ prefix }/updateuseravatar` , obj );
}


export function updateuseravatar ( mobile , avatar ) {

    let obj = {
        mobile : mobile ,
        avatar : avatar
    }

    return axios.post( `${ prefix }/updateuseravatar` , obj );
}
