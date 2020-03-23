<!--
作者:chenghao
功能:vue页
-->

<!--
我的 ok
 -->
<template>

    <div>
        <br>
        <!--这里整个头像-->
        <van-cell size="large"
                  @click="SetupAvatarClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:58px;">
                    <use v-bind:xlink:href="loginuseravatar | iconallname"></use>
                </svg>
                <span class="cellspantitleclass">{{ loginusername +'('  + loginusermobile + ')' }}</span>
            </template>
        </van-cell>
        <br>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-zhifu"></use>
                </svg>
                <span class="cellspantitleclass">支付</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-shoucang"></use>
                </svg>
                <span class="cellspantitleclass">收藏</span>
            </template>
        </van-cell>
        <van-cell @click="photoClick"
                  is-link>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-xiangce"></use>
                </svg>
                <span class="cellspantitleclass">相册</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-qiabao"></use>
                </svg>
                <span class="cellspantitleclass">卡包</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-fabiaoqing"></use>
                </svg>
                <span class="cellspantitleclass">表情</span>
            </template>
        </van-cell>
        <br>
        <van-cell is-link
                  @click="setupClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-shezhi"></use>
                </svg>
                <span class="cellspantitleclass">设置</span>
            </template>
        </van-cell>
        <br>

        <!--头像选择弹窗组件-->
        <userselectavatar @selectavatar="selectavatar"
                          @closewin="closewin"
                          ref='userselectavatar1'
                          :diaObj="diaObj"></userselectavatar>

        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import { mapMutations } from 'vuex'

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    //导入
    import { mix } from "@/mixin/index.js"
    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    import * as userapi from '@/https/api/user.js'

    //导入组件
    import userselectavatar from '@/components/userselectavatar.vue'

    import mytabbar from "@/components/mytabbar.vue";

    export default {
        name : "Me" ,
        //导入混入对象 可以是多个,数组
        mixins : [ mix , loginuserdatamix ] ,
        //注册组件
        components : {
            userselectavatar ,
            mytabbar
        } ,
        //数据模型
        data () {
            return {
                diaObj : {
                    showdialog : false ,
                    avatar : ''
                } ,
            }
        } ,
        //方法
        methods : {
            setupClick () {
                this.$router.push( '/setupdatapage' );
            } ,
            photoClick () {
                this.$router.push( '/myphoto' );
            } ,
            SetupAvatarClick () {
                this.diaObj = {
                    showdialog : true ,
                    avatar : this.loginuseravatar
                }

                return;
            } ,
            selectavatar ( _avatar ) {
                this.diaObj = {
                    showdialog : false ,
                    avatar : _avatar
                }

                if ( _avatar == this.loginuseravatar ) {
                    //头像没有变化

                    return;
                }

                ;( async () => {

                    let obj = await userapi.updateuseravatar( this.loginusermobile , _avatar );
                    let result = obj.data;

                    if ( result ) {
                        //成功修改头像
                        //     //重新设置一下
                        this.updateloginuseravatar( _avatar );

                        return;
                    }
                    else {
                        this.$toast( "修改失败" )

                        return;
                    }

                } )();

                return;
            } ,
            closewin () {
                this.diaObj = {
                    showdialog : false ,
                    avatar : ''
                }

                return;
            } ,
            ...mapMutations( "user" , [

                'updateloginuseravatar'

            ] ) ,
        } ,

    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./Me.css"
       scoped>
</style>
