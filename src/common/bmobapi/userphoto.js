/*
 作者: chenghao
 功能: 用户相册
 */

/**
 * 表名
 * @type {string}
 */
const tableName = 'userphoto';

/**
 * 按mobile得用户相册信息
 * @param mobile
 * @returns {Promise<any>}
 */
export function getuserphotobymobile ( mobile ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
        query.equalTo( "mobile" , "==" , mobile );

        query.find().then( res => {
            //返回的是数组,没有找到就是空数组
            //console.log( res )

            if ( res != null && res.length > 0 ) {
                resolve( {
                    //是存在
                    isexists : true ,
                    data : res[ 0 ]
                } );
            }
            else {
                resolve( {
                    isexists : false ,
                    data : null
                } );
            }
        } );
    } );
}

/**
 * 添加一个用户相册
 * @param userphoto
 * @returns {Promise<any>}
 */
export function adduserphoto ( userphoto ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName );
        //这里 设置  列的数据
        query.set( "mobile" , userphoto.mobile )
        query.set( "imgs" , userphoto.imgs )
        query.set( "isshare" , userphoto.isshare )

        query.save().then( res => {
            //console.log( res )

            resolve( res );
            //返回创建时间和id
            // {
            //     createdAt: "YYYY-mm-dd HH:ii:ss",
            //         objectId: "objectId"
            // }
        } ).catch( err => {
            //console.log( err )

            resolve( null );
        } )

    } );
}

/**
 * 修改相册
 * @param objectId
 * @param userphoto
 * @param isshare
 * @returns {Promise<any>}
 */
export function updateuserphoto ( objectId , userphoto , isshare ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName );

        query.set( 'id' , objectId ) //需要修改的objectId
        query.set( "isshare" , isshare )
        query.set( 'imgs' , userphoto )

        query.save().then( res => {
            // 修改成功 返回 {updatedAt: "2019-04-17 17:39:44"}
            // 如果id错误,返回 {code: 101, error: "object not found for a08b661111."}
            //console.log( res )
            if ( res != null && res.updatedAt ) {
                resolve( res );
            }
            else {
                resolve( null );
            }
        } )
    } );
}


