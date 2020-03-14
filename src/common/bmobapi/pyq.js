/*
 作者: chenghao
 功能: 朋友圈
 */

const tableName = 'friendscircle';

/**
 * 添加一个朋友圈
 * @param 朋友圈
 * @returns {*|Promise|Promise<any>}
 */
export function addfriendscircle ( friendscircle ) {

    const query = Bmob.Query( tableName );
    //这里 设置  列的数据
    query.set( "date" , friendscircle.date )
    query.set( "imglist" , friendscircle.imglist )
    query.set( "praiselist" , friendscircle.praiselist )
    query.set( "bbslist" , friendscircle.bbslist )
    query.set( "mobile" , friendscircle.mobile )
    query.set( "name" , friendscircle.name )
    query.set( "avatar" , friendscircle.avatar )
    query.set( "txt" , friendscircle.txt )

    return query.save();
}

/**
 * 得朋友圈列表
 * @param 数量
 * @returns {*|Promise|Promise<any>}
 */
export function getfriendscirclelist ( counts ) {
    const query = Bmob.Query( tableName );

    query.order( "-id" );
    query.limit( counts );

    return query.find();
}

/**
 * 由最大id得朋友列表
 * @param maxid
 * @returns {*|Promise|Promise<any>}
 */
export function getfriendscirclelistbymaxid ( maxid ) {
    const query = Bmob.Query( tableName );

    query.equalTo( "id" , ">" , maxid );
    query.order( "-id" );

    return query.find();
}

/**
 * 由最小id得朋友列表
 * @param minid
 * @param counts
 * @returns {*|Promise|Promise<any>}
 */
export function getfriendscirclelistbyminid ( minid , counts ) {
    const query = Bmob.Query( tableName );

    query.equalTo( "id" , "<" , minid );
    query.order( "-id" );
    query.limit( counts );

    return query.find();
}

/**
 * 修改点赞
 * @param objectId
 * @param date
 * @param mobile
 * @param name
 * @returns {Promise<any>}
 */
export function updatepraiselist ( objectId , date , mobile , name ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        //先取最新的回来
        query.get( objectId ).then( res => {
            //如果成功: 返回的是这行的对象
            // {
            //     "content":"试试看",
            //     "createdAt":"2018-04-18 15:25:54",
            //     "formId":"the formId is a mock one",
            //     "objectId":"7ecd253a25",
            //     "title":"新增测试",
            //     "updatedAt":"2018-04-18 15:25:54"
            // }

            //注意,如果id是错误，或者不存在的 会返回
            // {code: 101, error: "object not found for a08b661111."}

            console.log( res )

            let arr = [];
            if ( res.praiselist != null && res.praiselist.length > 0 ) {
                //有数据，得判断一下，以前是点过 还是没有点过
                let datas = res.praiselist;

                let index = datas.findIndex( ( n ) => n.mobile == mobile );

                if ( index <= -1 ) {
                    // 不存在 就添加进去
                    datas.push( {
                        date ,
                        mobile ,
                        name
                    } );

                    arr = datas;
                }
                else {
                    //存在就是取消点赞
                    datas.splice( index , 1 );

                    arr = datas;
                }
            }
            else {
                //没有数据 直接写入
                arr = [
                    {
                        date ,
                        mobile ,
                        name
                    }
                ];
            }
            console.log( '保存' , arr )
            res.set( 'praiselist' , arr )
            res.save()

            resolve( {
                //是ok
                isok : true

            } );
        } ).catch( err => {
            console.log( err )

            resolve( {
                //是
                isok : false

            } );
        } )
    } );

}

/**
 * 修改评论
 * @param objectId
 * @param date
 * @param txt
 * @param mobile
 * @param name
 * @returns {Promise<any>}
 */
export function updatebbslist ( objectId , date , txt , mobile , name ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        //先取最新的回来
        query.get( objectId ).then( res => {
            //如果成功: 返回的是这行的对象
            // {
            //     "content":"试试看",
            //     "createdAt":"2018-04-18 15:25:54",
            //     "formId":"the formId is a mock one",
            //     "objectId":"7ecd253a25",
            //     "title":"新增测试",
            //     "updatedAt":"2018-04-18 15:25:54"
            // }

            //注意,如果id是错误，或者不存在的 会返回
            // {code: 101, error: "object not found for a08b661111."}

            // console.log( 'res' , res )

            let arr = [
                {
                    date ,
                    txt ,
                    mobile ,
                    name
                }
            ];

            // console.log( '保存' , arr )
            res.add( "bbslist" , arr );
            res.save()

            resolve( {
                //是ok
                isok : true

            } );
        } ).catch( err => {
            console.log( err )

            resolve( {
                //是
                isok : false

            } );
        } )
    } );

}

/**
 * 删除朋友圈
 * @param objectId
 * @returns {Promise<any>}
 */
export function deletefriendscirclebyid ( objectId ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        query.destroy( objectId ).then( res => {
            // 成功删除  返回 {msg: "ok"}
            //id 错误或者不存在  返回 {code: 101, error: "object not found for a08b661111."}
            console.log( res )

            resolve( {
                //是ok
                isok : true

            } );
        } ).catch( err => {
            console.log( err )

            resolve( {
                //是
                isok : false

            } );
        } )

    } );

}

/**
 * 由id得一条朋友圈
 * @param objectId
 * @returns {*|Promise|Promise<any>}
 */
export function getfriendscirclebyid ( objectId ) {

    const query = Bmob.Query( tableName );

    console.log( 'objectId' , objectId )
    return query.get( objectId );

}

///////新方法///////////////////////////////////////////////////////////////

/**
 * 得id列表
 * @param counts
 * @returns {*|Promise|Promise<any>}
 */
function getfriendscirclelistid ( counts ) {
    const query = Bmob.Query( tableName );

    query.select( "id" );
    query.order( "-id" );
    query.limit( counts );

    return query.find();
}

/**
 * 的朋友圈列表
 * @param counts
 * @returns {Promise<any[]|Array>}
 */
export async function getfriendscirclelistBingXing ( counts ) {
    // let resultdata = [];

    let idlist = await getfriendscirclelistid( counts )

    // console.log( 'idlist' , idlist )
    if ( idlist != null && idlist.length > 0 ) {
        let ajaxlist = [];
        for ( let item of idlist ) {
            ajaxlist.push( getfriendscirclebyid( item.objectId ) )
        }

        var result = await Promise.all( ajaxlist )

        return result;
    }

    return [];
}

function getfriendscirclelistidbymaxid ( maxid ) {
    const query = Bmob.Query( tableName );

    query.equalTo( "id" , ">" , maxid );

    query.select( "id" );
    query.order( "-id" );

    return query.find();
}

export async function getfriendscirclelistbymaxidBingXing ( maxid ) {
    let idlist = await getfriendscirclelistidbymaxid( maxid )

    // console.log( 'idlist' , idlist )
    if ( idlist != null && idlist.length > 0 ) {
        let ajaxlist = [];
        for ( let item of idlist ) {
            ajaxlist.push( getfriendscirclebyid( item.objectId ) )
        }

        var result = await Promise.all( ajaxlist )

        return result;
    }

    return [];
}

export async function getfriendscirclelistbyminidBingXing ( minid , counts ) {
    let idlist = await getfriendscirclelistidbyminid( minid , counts )

    // console.log( 'idlist' , idlist )
    if ( idlist != null && idlist.length > 0 ) {
        let ajaxlist = [];
        for ( let item of idlist ) {
            ajaxlist.push( getfriendscirclebyid( item.objectId ) )
        }

        var result = await Promise.all( ajaxlist )

        return result;
    }

    return [];
}

function getfriendscirclelistidbyminid ( minid , counts ) {
    const query = Bmob.Query( tableName );

    query.equalTo( "id" , "<" , minid );
    query.order( "-id" );
    query.limit( counts );
    query.select( "id" );

    return query.find();
}
