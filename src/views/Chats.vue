<!--
作者:chenghao
功能:vue页
-->

<!--
 聊天主页 ok
 -->
<template>
    <div>
        <van-cell :title="useraddress"
                  icon="location-o"/>

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="titleclass">开始聊天(待实现)</div>

        <br>
        <br>
        <mytabbar></mytabbar>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
    import {

        mapState

    } from 'vuex'

    import mytabbar from "@/components/mytabbar.vue";

    export default {
        name : "Chats" ,
        //注册组件
        components : {
            mytabbar
        } ,
        //数据模型
        data () {
            return {
                msg : ""
            }
        } ,
        //方法
        methods : {
            //methodsname() {
            //代码搞这里
            //},
        } ,
        //计算属性
        computed : {

            ...mapState( "location" , {

                useraddress : 'address' ,

            } ) ,
        } ,
        //生命周期(mounted)
        mounted () {
        }
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./Chats.css"
       scoped>
</style>
