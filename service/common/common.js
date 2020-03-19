/*
 作者: chenghao
 Date: 2020/3/12
 Time: 12:48
 功能: js脚本
 */

var dayjs = require( 'dayjs' )

const UUID = require( 'uuid' )
//引入
var CryptoJS = require( "crypto-js" );

/**
 * 加密字符串
 * @param str
 * @param key
 * @returns {string}
 * @constructor
 */
function EncryptString ( str = '' ) {
    // var ciphertext = CryptoJS.AES.encrypt( str , key ).toString();

    var ciphertext = CryptoJS.SHA512( str ).toString()

    // console.log( 'ciphertext' , ciphertext )

    return ciphertext;
}

/**
 * 加密密码
 * @param str
 * @returns {string}
 * @constructor
 */
function EncryptPassWord ( str = '' ) {
    // const key = 'MyWx';

    var str = EncryptString( str );

    return str;
}

/**
 * 得最新时间字符串
 * @param formatstring
 * @returns {string}
 * @constructor
 */
function GetNowString ( now , formatstring = 'YYYY-MM-DD HH:mm:ss' ) {

    let _now = dayjs( now );

    return _now.format( formatstring );
}

/**
 * 13位的时间戳
 * @param now
 * @returns {number}
 * @constructor
 */
function GetNowUnix ( now ) {
    let _now = dayjs( now );

    // .valueOf()  13位的时间戳
    return _now.valueOf();
}

/**
 * 得guid字符串
 * @returns {*}
 * @constructor
 */
function GetGuid () {
    var u1 = UUID.v1();  //基于时间戳生成  （time-based）

    return u1;
}

module.exports = {

    GetNowString ,
    GetNowUnix ,
    GetGuid ,
    EncryptString ,
    EncryptPassWord ,

}


