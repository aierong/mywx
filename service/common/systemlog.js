/*
 作者: chenghao
 Date: 2020/4/21
 Time: 15:07
 功能: js脚本
 */

const log4js = require( 'log4js' );

const common = require( './common.js' )

function writelog ( logdata ) {
    const date = new Date();

    let filename = common.DateFormatter( date );

    const dateLogger = log4js.getLogger( `${ filename }` );

    dateLogger.info( logdata )
}

module.exports = {

    writelog

}


