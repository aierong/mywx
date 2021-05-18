import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from '@/https/http.js';
//绑定到原型上
Vue.prototype.$axios = axios;

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

//引入vant
Vue.use( Vant );

Vue.config.productionTip = false

new Vue( {
    router ,
    store ,
    render : h => h( App )
} ).$mount( '#app' )
