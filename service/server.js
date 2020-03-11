/*

 几个主要组件安装:
 npm install koa
 npm i koa-router
 npm i koa-bodyparser
 npm install require-directory
 */

const Koa = require( 'koa' )
const requireDirectory = require( "require-directory" );
const Router = require( "koa-router" );
// const bodyParser = require( 'koa-bodyparser' )
const app = new Koa()
// app.use( bodyParser() )

//手工一个个导入，并且注册,如果路由多，是不是好麻烦
// const userrouter = require( './router/user' )
// app.use( userrouter.routes() ).use( userrouter.allowedMethods() )
// const homerouter = require( './router/home' )
// app.use( homerouter.routes() ).use( homerouter.allowedMethods() )

// 下面演示，利用require-directory自动注册
// require-directory可以自动加载某个目录下的所有路由文件

// 参考:
// https://blog.csdn.net/hsg_happyLearning/article/details/104452056
// https://blog.csdn.net/weixin_43756060/article/details/99562641

// 第一个参数固定是module (固定module)
// 第二个参数是要注册的router的相对路径 (它会把这个目录及其子目录下的所有路由都自动注册上去)
// 第三个参数是注册每个路由之前执行的业务代码 (回调函数)
requireDirectory( module , "./router" , {
    visit : ( obj ) => {
        // 判断当前对象是否是一个Router，这种判断方式很简单，只适用于导出时没有使用大括号的方式，如果使用了大括号，这里的判断逻辑相对就会复杂一些
        if ( obj instanceof Router ) {
            app.use( obj.routes() ).use( obj.allowedMethods() )
        }
    }
} )

let port = 3001;
app.listen( port , () => {
    console.log( `server is running at http://localhost:${ port }` )
} )


