import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Bmob from "hydrogen-js-sdk";
// 初始化
// 旧版本的： Bmob.initialize("你的Application ID", "你的REST API Key");
// Bmob.initialize( "c5bb0d65f0131f896addcd85bc2ed84e" , "c33224944230218619e2c3de8904cef4" );

// import Bmob from "hydrogen-js-sdk";
//          Bmob.initialize("你的Secret Key", "你的API 安全码");
//初始化 新版本(2.0以上版本):   Bmob.initialize("你的Secret Key", "你的API 安全码");
// API 安全码: 在应用功能设置，安全验证，API安全码自己进行设置
// Bmob.initialize( "d2105f511b9d0d0a" , "abc123" );

// 挂载到全局使用
// Vue.prototype.$Bmob = Bmob

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use( Vant );

Vue.config.productionTip = false

new Vue( {
    router ,
    store ,
    render : h => h( App )
} ).$mount( '#app' )
