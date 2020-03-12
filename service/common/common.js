/*
 作者: chenghao
 Date: 2020/3/12
 Time: 12:48
 功能: js脚本
 */

var dayjs = require( 'dayjs' )

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
}


