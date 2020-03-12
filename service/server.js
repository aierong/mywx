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
const bodyParser = require( 'koa-bodyparser' )
const app = new Koa()
app.use( bodyParser() )

// require-directory可以自动加载某个目录下的所有路由文件

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


