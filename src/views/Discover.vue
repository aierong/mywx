<!--
作者:chenghao
功能: 发现
-->

<!--
发现 ok
-->
<template>

    <div>
        <br>
        <div class="titleclass">发现</div>
        <br>
        <van-cell is-link
                  @click="friendscircleClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-friends"></use>
                </svg>
                <span class="cellspantitleclass">朋友圈</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-saoyisao"></use>
                </svg>
                <span class="cellspantitleclass">扫一扫</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-yaoyiyao"></use>
                </svg>
                <span class="cellspantitleclass">摇一摇</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-kanyikan"></use>
                </svg>
                <span class="cellspantitleclass">看一看</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-souyisou"></use>
                </svg>
                <span class="cellspantitleclass">搜一搜</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-fujinderen"></use>
                </svg>
                <span class="cellspantitleclass">附近的人</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-gouwu-copy-copy"></use>
                </svg>
                <span class="cellspantitleclass">购物</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-youxi"></use>
                </svg>
                <span class="cellspantitleclass">游戏</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-xiaochengxu"></use>
                </svg>
                <span class="cellspantitleclass">小程序</span>
            </template>
        </van-cell>

        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"
    import mytabbar from "@/components/mytabbar.vue";

    export default {
        name : "Discover" ,
        //注册组件
        components : {
            mytabbar
        } ,
        //数据模型
        data () {
            return {
                msg : ''
            }
        } ,
        //方法
        methods : {
            friendscircleClick () {
                this.$router.push( '/friendscircle' );
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

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./Discover.css"
       scoped>
</style>
