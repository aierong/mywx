/*

 几个主要组件安装:
 npm install koa
 npm i koa-router
 npm i koa-bodyparser
 npm install require-directory
 */

const Koa = require( 'koa' )
var cors = require( 'koa2-cors' );  //引入跨域的组件
const requireDirectory = require( "require-directory" );
const Router = require( "koa-router" );
const bodyParser = require( 'koa-bodyparser' )

const app = new Koa()
app.use( cors() ); //注册一下 即可

// app.use( bodyParser() )
//设置一下容量大小，要不又限制，会提交失败
app.use( bodyParser( {
    enableTypes : [ 'json' , 'form' , 'text' ] ,
    formLimit : '360mb' ,
    jsonLimit : '360mb' ,
    textLimit : '360mb'
} ) )

var mongoose = require( 'mongoose' );
//链接说明：默认端口27017可以不写   mytest是数据库名 (如果链接的数据库名不存在，会自动创建一个)
mongoose.connect( 'mongodb://localhost/wx' , {
    //不加这2个参数 ,程序编译启动 会有警告提示
    useNewUrlParser : true ,
    useUnifiedTopology : true ,
    //不加这1个参数 ,调用findOneAndUpdate findOneAndDelete 会有警告提示
    useFindAndModify : false
} , () => {
    console.log( 'mongodb链接成功' )
} );

mongoose.connection.on( 'connected' , function () {

    console.log( 'Mongoose connection open  ' );
} );

mongoose.connection.on( 'error' , function ( err ) {

    console.log( 'Mongoose connection error: ' + err );
} );/** * 连接异常  */

mongoose.connection.on( 'disconnected' , function () {

    console.log( 'Mongoose connection disconnected' );
} ); /** * 连接断开 */

/**
 * require-directory可以自动加载某个目录下的所有路由文件
 */
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


