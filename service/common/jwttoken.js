/*
 作者: chenghao
 Date: 2020/4/11
 Time: 15:45
 功能: js脚本
 */

const jwt = require( 'jsonwebtoken' );

function CreateToken ( payload ) {
    let token = jwt.sign( {

        data : payload ,
        exp : Math.floor( Date.now() / 1000 ) + ( global.config.TokenValidity )

    } , global.config.TokenPrivateKey );

    return token;
}

module.exports = {

    CreateToken

}
