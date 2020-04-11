/*
 作者: chenghao
 Date: 2020/4/11
 Time: 15:45
 功能: js脚本
 */

const jwt = require( 'jsonwebtoken' );

/**
 * 创建token
 * @param payload
 * @returns {undefined|*}
 * @constructor
 */
function CreateToken ( payload ) {
    let token = jwt.sign( {

        data : payload ,
        exp : Math.floor( Date.now() / 1000 ) + ( global.config.TokenValidity )

    } , global.config.TokenPrivateKey );

    return token;
}

/**
 * 得token中数据
 * @param ctx
 * @returns {*}
 * @constructor
 */
function GetTokenData ( ctx ) {
    let tokendata = ctx.state.jwtdata.data;
    // console.log( 'tokendata' , tokendata )

    return tokendata;
}

module.exports = {

    CreateToken ,
    GetTokenData

}
