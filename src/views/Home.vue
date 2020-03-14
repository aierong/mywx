<!--
作者:chenghao
功能:vue页
-->

<!--
主页
-->

<template>
    <div class="home">

        <!--        <router-view/>-->

        <!--                <keep-alive include='Contacts'>-->
        <!--                    <router-view />-->
        <!--                </keep-alive>-->

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件，  -->
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，  -->
        </router-view>


    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'

    // 引入阿里图标css 当然，也可以在main.js中引用
    import "@/assets/ali/iconfont/iconfont.css"

    export default {
        name : 'Home' ,
        //计算属性
        computed : {
            // isshowtabbar () {
            //
            //     return this.$route.meta.isshowtabbar;
            // }
        } ,
        //数据模型
        data () {
            return {
                // active : 0 ,

                testmsg : 'qq'
            }
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( this.$route.path )

            // let _path = this.$route.path;
            //
            // // console.log( '_path' , _path )
            //
            // // 这里设置一下，防止操作者 强制浏览器刷新,下面tabbar中图标不对应了
            // this.setupactive( _path );
        } ,
        //方法
        methods : {
            ...mapMutations( "other" , [

                'SetRefreshContactsList'

            ] ) ,
            // setupactive ( path ) {
            //     if ( path == "/chats" ) {
            //         this.active = 0;
            //
            //         return;
            //     }
            //     else if ( path == '/contacts' ) {
            //         this.active = 1;
            //
            //         return;
            //     }
            //     else if ( path == '/discover' ) {
            //         this.active = 2;
            //
            //         return;
            //     }
            //     else {
            //         this.active = 3;
            //
            //         return;
            //     }
            // } ,
            // onchange ( active ) {
            //     // active: 当前选中标签
            //     //console.log(active)
            //
            //     if ( active == 0 ) {
            //         // 页面跳转
            //         this.$router.push( "/chats" )
            //     }
            //     else if ( active == 1 ) {
            //         // this.SetRefreshContactsList( true );  //刷新列表
            //
            //         this.$router.push( "/contacts" );
            //     }
            //     else if ( active == 2 ) {
            //         this.$router.push( "/discover" )
            //     }
            //     else if ( active == 3 ) {
            //         this.$router.push( "/me" )
            //     }
            // } ,
        } ,

    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./Home.css"
       scoped>
</style>
