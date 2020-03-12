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

module.exports = {

    /**
     * 得最新时间字符串
     * @param formatstring
     * @returns {string}
     * @constructor
     */
    GetNowString : ( formatstring = 'YYYY-MM-DD HH:mm:ss' ) => {

        let now = dayjs();

        return now.format( formatstring );
    } ,
    /**
     * 得guid字符串
     * @returns {*}
     * @constructor
     */
    GetGuid : () => {
        var u1 = UUID.v1();  //基于时间戳生成  （time-based）

        return u1;
    } ,
    /**
     * 加密字符串
     * @param str
     * @param key
     * @constructor
     */
    EncryptString : ( str = '' , key = 'key' ) => {

    } ,
}


