<!--
作者:chenghao
功能: 通讯录
-->

<!--
通讯录 ok
 -->
<template>

    <div>
        <br>

        <div class="titleclass">通讯录</div>

        <br>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-pengyou"></use>
                </svg>

                <span class="cellspantitleclass">新的朋友</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-qunliao"></use>
                </svg>
                <span class="cellspantitleclass">群聊</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-biaoqian"></use>
                </svg>
                <span class="cellspantitleclass">标签</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-gongzhonghao"></use>
                </svg>
                <span class="cellspantitleclass">公众号</span>
            </template>
        </van-cell>
        <br>
        <br>
        <div class="titleclass">我的通讯录</div>
        <van-skeleton avatar
                      :row="3"
                      :loading="isskeletonloading">
            <!--循环加载-->
            <van-cell v-for="(item ,index) in userlist"
                      :key="index"
                      @click="onClick(item.mobile)"
                      :is-link="!isme(item.mobile)">
                <template slot="title">
                    <svg class="icon"
                         aria-hidden="true"
                         style="font-size:20px;">
                        <use v-bind:xlink:href="item.avatar  | iconallname"></use>
                    </svg>
                    <span class="cellspantitleclass">{{ item.name + '(' + item.mobile +')' }}</span>
                </template>
            </van-cell>
        </van-skeleton>

        <mytabbar></mytabbar>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
    import {
        mapState ,
        mapMutations
    } from 'vuex'

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    //导入
    import { mix } from "@/mixin/index.js"
    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    // import * as api from '@/common/bmobapi/users.js'
    import * as userapi from '@/https/api/user.js'

    import mytabbar from "@/components/mytabbar.vue";

    export default {
        name : "Contacts" ,
        //注册组件
        components : {
            mytabbar
        } ,
        //导入混入对象 可以是多个,数组
        mixins : [
            mix , loginuserdatamix
        ] ,
        //数据模型
        data () {
            return {
                userlist : [] ,

                isskeletonloading : true
            }
        } ,
        //方法
        methods : {
            ...mapMutations( "other" , [

                'SetRefreshContactsList'

            ] ) ,
            //得用户列表
            getuserlist () {
                console.log( 'getuserlist start' )

                // api.getuserlist().then( ( res ) => {
                //
                //     setTimeout( () => {
                //         this.userlist = res;
                //
                //         console.log( 'getuserlist ok' )
                //
                //         this.isskeletonloading = false;
                //         //故意延时一下 可以看看骨架屏效果
                //     } , 4500 );
                // } )

                userapi.getuserlist().then( ( res ) => {
                    // console.log( 'res' , res )

                    setTimeout( () => {
                        this.userlist = res.data;

                        // console.log( 'getuserlist ok' )

                        this.isskeletonloading = false;
                        //故意延时一下 可以看看骨架屏效果
                    } , 1500 );
                } )

            } ,
            isme ( _user ) {
                // return false;
                if ( _user == this.loginusermobile ) {
                    return true;
                }

                return false;
            } ,
            onClick ( _user ) {
                // console.log( '_user' , _user )

                let _isme = this.isme( _user );

                if ( _isme ) {
                    //点自己 退出了
                    return;
                }

                //点其他人 看人家的资料
                // this.$router.push( '/othermaninfo?empmobile=' + _user );
                this.$router.push( {
                    path : `/othermaninfo/${ _user }`
                } );
            } ,
        } ,
        //计算属性
        computed : {
            ...mapState( "other" , [

                'IsRefreshContactsList'

            ] ) ,
        } ,
        //生命周期(mounted)
        mounted () {

            console.log( 'Contacts mounted this.IsRefreshContactsList' , this.IsRefreshContactsList )

            // this.getuserlist();
        } ,
        activated () {
            console.log( 'Contacts activated this.IsRefreshContactsList' , this.IsRefreshContactsList )

            if ( this.IsRefreshContactsList ) {
                this.getuserlist();
            }
            else {

                //不做操作
                //this.SetRefreshContactsList( true )

            }
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./Contacts.css"
       scoped>
</style>
