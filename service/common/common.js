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

//service/runlogservice.js
const runlogservice = require( '../service/runlogservice.js' )

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
function GetNowString ( formatstring = 'YYYY-MM-DD HH:mm:ss' ) {

    let now = dayjs();

    return now.format( formatstring );
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

/**
 * 添加日志
 * @param mobile
 * @param runtype
 * @param remark
 * @returns {Promise<*>}
 * @constructor
 */
async function AddRunLog ( mobile = '' , runtype = '' , remark = '' ) {
    let obj = await runlogservice.AddRunLog( mobile , runtype , remark );

    return obj;
}

module.exports = {

    GetNowString ,
    GetGuid ,
    EncryptString ,
    EncryptPassWord ,
    AddRunLog

}


