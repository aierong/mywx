/*

 几个主要组件安装:
 npm install koa
 npm i koa-router
 npm i koa-bodyparser
 npm install require-directory
 */

const Koa = require( 'koa' )
const KoaStatic = require( "koa-static" )
//引入配置文件
const config = require( './config/config.js' )
var cors = require( 'koa2-cors' );  //引入跨域的组件
//引入验证组件
const koajwt = require( 'koa-jwt' );

const requireDirectory = require( "require-directory" );
const Router = require( "koa-router" );
const koaBody = require( 'koa-body' )
const path = require( "path" );

const { GetUploadDirName , CheckDirExist } = require( './common/common.js' )

const app = new Koa()
//把数据全部挂载在global.config中
global.config = config;

//指定public
app.use( KoaStatic( path.join( __dirname , 'public' ) ) );

app.use( cors() ); //注册一下 即可

//验证token，如果请求时没有token或者token过期，则会返回401异常
//前端可以去捕获这个401错误
app.use( koajwt( {
    //密钥
    secret : global.config.TokenPrivateKey ,
    //设置存储jwt数据的类名 ,如果不设置默认是user ，在通过验证的路由中 使用ctx.state.user取到值
    key : 'jwtdata'
} ).unless( {
    // 这里可以设置排除验证的路由地址 数组可以设置多个
    // 登录和注册的 不验证
    path : [
        '/api/users/login' ,
        '/api/users/register'
    ]
} ) );

// app.use( bodyParser() )
//设置一下容量大小，要不又限制，会提交失败
app.use( koaBody( {
    enableTypes : [ 'json' , 'form' , 'text' ] ,
    formLimit : '360mb' ,
    jsonLimit : '360mb' ,
    textLimit : '360mb' ,
    multipart : true ,
    formidable : {
        //  上传目录 ,uploads目录
        uploadDir : path.join( __dirname , 'public/uploads' ) , // 设置文件上传目录
        keepExtensions : true ,    // 保持文件的后缀
        // maxFieldsSize : 2 * 1024 * 1024 , //
        // maxFileSize 这个才是设置最大文件尺寸,我看网络上好多是设置maxFieldsSize，没有用的
        maxFileSize : 200 * 1024 * 1024 ,      // default 200 * 1024 * 1024 (200mb); limit the size of uploaded file.
        //
        onFileBegin : ( name , file ) => {
            //如果前端传递多个文件过来,这个事件onFileBegin会触发多次的

            //name 是表单的 name 属性传递过来的
            // console.log( 'onFileBegin name' , name );
            // console.log( 'onFileBegin file' , file );

            //其实可以利用path.basename取到文件名,这个文件名已经是随机，并且唯一的
            let filename = path.basename( file.path )
            // console.log( 'onFileBegin filename' , filename )

            let dates = GetUploadDirName();
            const dir = path.join( __dirname , `public/uploads/${ dates }` );
            CheckDirExist( dir ); // 检查文件夹是否存在如果不存在则新建文件夹

            // 重新覆盖 file.path 属性
            file.path = `${ dir }\\${ filename }`;
            // 创建一个新属性，后面控制器中可以取到
            file.datedir = dates;
        } ,
    } ,
} ) )

var mongoose = require( 'mongoose' );
//链接说明：默认端口27017可以不写   mytest是数据库名 (如果链接的数据库名不存在，会自动创建一个)
mongoose.connect( global.config.mongodburl , {
    //不加这2个参数 ,程序编译启动 会有警告提示
    useNewUrlParser : true ,
    useUnifiedTopology : true ,
    //不加这1个参数 ,调用findOneAndUpdate findOneAndDelete 会有警告提示
    useFindAndModify : false
} , () => {
    console.log( 'mongodb链接成功' )
} );

//数据库
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

let port = global.config.ServerPort;
app.listen( port , () => {
    console.log( `server is running at http://localhost:${ port }` )
} )


