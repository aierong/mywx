<!--
作者:chenghao
Date: 2019/8/20
Time: 22:44
功能:
-->

<!-- html代码片段 -->
<template>


    <van-tabbar v-model="active"
                @change="onchange"
                active-color="#07c160">
        <van-tabbar-item>
            <span>微信</span>
            <i class="iconfont icon-chat myicon"
               slot="icon"></i>
        </van-tabbar-item>
        <van-tabbar-item>
            <span>通讯录</span>
            <i class="iconfont icon-mn_tongxunlu myicon"
               slot="icon"></i>
        </van-tabbar-item>
        <van-tabbar-item>
            <span>发现</span>
            <i class="iconfont icon-faxian myicon"
               slot="icon"></i>
        </van-tabbar-item>
        <van-tabbar-item>
            <span>我</span>
            <i class="iconfont icon-me1 myicon"
               slot="icon"></i>
        </van-tabbar-item>

    </van-tabbar>
</template>

<!-- js脚本代码片段 -->
<script>
    import {
        mapMutations
    } from 'vuex'

    export default {
        name : "mytabbar" ,
        //数据模型
        data () {
            return {

                active : 0 ,
            }
        } ,
        //方法
        methods : {
            ...mapMutations( "other" , [

                'SetRefreshContactsList'

            ] ) ,
            setupactive ( path ) {
                console.log( 'mytabbar setupactive' )

                if ( path == "/chats" ) {
                    this.active = 0;

                    return;
                }
                else if ( path == '/contacts' ) {
                    this.active = 1;

                    return;
                }
                else if ( path == '/discover' ) {
                    this.active = 2;

                    return;
                }
                else {
                    this.active = 3;

                    return;
                }
            } ,
            onchange ( active ) {
                // active: 当前选中标签
                console.log( 'mytabbar onchange' , active )

                if ( active == 0 ) {
                    // 页面跳转
                    this.$router.push( "/chats" )
                }
                else if ( active == 1 ) {
                    this.SetRefreshContactsList( true );  //刷新列表

                    this.$router.push( "/contacts" );
                }
                else if ( active == 2 ) {
                    this.$router.push( "/discover" )
                }
                else if ( active == 3 ) {
                    this.$router.push( "/me" )
                }
            } ,

        } ,
        //计算属性
        computed : {
            //name() {
            //代码搞这里
            //return this.data;
            //}
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( this.$route.path )

            let _path = this.$route.path;

            // console.log( '_path' , _path )

            // 这里设置一下，防止操作者 强制浏览器刷新,下面tabbar中图标不对应了
            this.setupactive( _path );
        } ,
        activated () {
            console.log( 'mytabbar activated' )

            let _path = this.$route.path;

            this.setupactive( _path );
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./mytabbar.css">
</style>
