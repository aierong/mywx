<!--
作者:chenghao
功能:vue页
-->

<!--
登录页面
-->
<template>
    <div>
        <van-nav-bar right-text="注册账号"
                     title="用户登录"
                     @click-right="onClickRight"/>
        <br>

        <van-cell-group>
            <van-field v-model="userinfo.mobile"
                       required
                       clearable
                       label="手机"
                       placeholder="请输入手机"/>
            <van-field v-model="userinfo.password"
                       type="password"
                       clearable
                       label="密码"
                       placeholder="请输入密码"
                       required/>
        </van-cell-group>
        <br>
        <div class="mytxt">{{ '保持登录状态'+days+ '天'}}</div>
        <van-button size="large"
                    @click="loginClick"
                    type="primary">登 录
        </van-button>
        <br>
        <br>
        <br>

    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import { mapMutations } from 'vuex'

    import * as util from '@/common/util/util.js'

    import * as userapi from '@/https/api/user.js'

    import * as constant from '@/common/constant.js'
    //导入
    import { mix } from "@/mixin/index.js"

    export default {
        name : "Login" ,
        //导入混入对象 可以是多个,数组
        mixins : [ mix ] ,
        //数据模型
        data () {
            return {
                userinfo : {
                    //手机号码
                    mobile : this.$route.query.mobile ,
                    password : ''
                } ,
                days : constant.CookieExpires
            }
        } ,
        //方法
        methods : {
            //登录
            loginClick () {

                if ( !this.userinfo.mobile ) {
                    this.$toast( "请输入手机号码" )

                    return;
                }

                if ( !this.userinfo.password ) {
                    this.$toast( "请输入密码" )

                    return;
                }

                ( async () => {
                    let _mobile = this.userinfo.mobile;
                    let _password = this.userinfo.password;

                    let obj = await userapi.login( _mobile , util.EncryptPassWord( _password ) );
                    let result = obj.data;

                    if ( !result.isok ) {
                        this.$toast( `${ result.errmsg }` )

                        return
                    }
                    else {
                        //登录成功
                        //     // 存储token
                        let userdata = result.data
                        //     // 存储token
                        let tokendata = result.tokendata

                        // console.log( 'token' , token )

                        //koa 返回的token是可以用的
                        localStorage.setItem( constant.tokenname , tokendata );

                        //
                        this.updateloginuser( userdata );

                        // 页面跳转
                        this.$router.push( "/chats" )

                        return
                    }

                } )()

            } ,
            //注册
            onClickRight () {
                this.$router.push( '/register' )

                return;
            } ,
            ...mapMutations( "user" , [

                'updateloginuser'

            ] ) ,
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
<style src="./Login.css"
       scoped>
</style>
