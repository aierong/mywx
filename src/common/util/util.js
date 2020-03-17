/*
 作者: chenghao
 功能: js脚本
 定义一些公用方法
 */

import CryptoJS from 'crypto-js'

/**
 *
 * @param val
 * @returns {string}
 * @constructor
 */
function GetIconAllName ( val ) {

    if ( !val ) {
        return ''
    }

    return '#icon-' + val;

}

/**
 * 加密字符串
 * @param str
 * @returns {*}
 * @constructor
 */
function EncryptString ( str = '' ) {

    var ciphertext = CryptoJS.MD5( str ).toString()

    return ciphertext;
}

/**
 * 加密密码
 * @param str
 * @returns {*}
 * @constructor
 */
function EncryptPassWord ( pwd = '' ) {
    return EncryptString( pwd );
}

export {
    GetIconAllName ,
    EncryptPassWord
}
