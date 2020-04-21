/*
 作者: chenghao
 Date: 2020/3/13
 Time: 23:54
 功能: js脚本
 */

const runlogservice = require( '../service/runlogservice.js' )

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

    AddRunLog

}


