/*
 作者: chenghao
 Date: 2020/3/14
 Time: 18:55
 功能: js脚本
 */

// import axios from 'axios'
import axios from '@/https/http.js';

let prefix = '/users';

/**
 * 添加用户（注册用户）
 * @param registerUser
 * @returns {Promise<AxiosResponse<T>>}
 */
export function adduser ( registerUser ) {

    return axios.post( `${ prefix }/register` , registerUser );
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

    return axios.put( `${ prefix }/${ mobile }/updateuseravatar` , obj );
}

/**
 * 修改密码
 * @param mobile
 * @param oldpassword
 * @param newpassword
 * @returns {Promise<AxiosResponse<T>>}
 */
export function updatepassword ( mobile = '' , oldpassword = '' , newpassword = '' ) {

    let obj = {
        mobile ,
        oldpassword ,
        newpassword
    }

    return axios.put( `${ prefix }/${ mobile }/updatepassword` , obj );
}

/**
 * 的用户列表
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getuserlist () {

    return axios.get( `${ prefix }` );
}

/**
 * 得某个用户信息
 * @param mobile
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getuserbymobile ( mobile = '' ) {

    return axios.get( `${ prefix }/${ mobile }` );
}


