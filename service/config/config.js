/*
 作者: chenghao
 Date: 2020/3/29
 Time: 12:59
 功能: js脚本
 */

module.exports = {
    /**
     * 定义jwt密钥
     */
    TokenPrivateKey : "0727-0413-1209" ,

    /**
     * jwt有效期 单位秒  (7天)
     */
    TokenValidity : 60 * 60 * 24 * 7 ,

    /**
     * 服务的端口
     */
    ServerPort : 3001 ,

    /**
     * 数据库地址
     */
    mongodburl : 'mongodb://localhost/wx'
}



