<!--
作者:chenghao
功能:vue页
-->

<!--  -->
<template>
    <div>
        <van-nav-bar left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>
        <br>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">帐号与安全</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">新消息提醒</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">勿扰模式</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">聊天</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">隐私</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">通用</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">关于微信</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">帮助与反馈</span>
            </template>
        </van-cell>
        <br>
        <van-cell>
            <template slot="title">
                <span class="cellspantitleclass">插件</span>
            </template>
        </van-cell>
        <!--        <van-cell is-link-->
        <!--                  @click="updatepwdClick">-->
        <!--            <template slot="title">-->
        <!--                <svg class="icon"-->
        <!--                     aria-hidden="true"-->
        <!--                     style="font-size:20px;">-->
        <!--                    <use xlink:href="#icon-shezhi"></use>-->
        <!--                </svg>-->
        <!--                <span class="cellspantitleclass">修改密码</span>-->
        <!--            </template>-->
        <!--        </van-cell>-->
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-shezhi"></use>
                </svg>
                <span class="cellspantitleclass">
                    <a href="https://github.com/aierong/mywx"
                       target="_blank">本项目Github</a></span>
            </template>
        </van-cell>

        <van-button size="large"
                    @click="updatepwdClick"
                    type="default">修改密码
        </van-button>
        <br><br>
        <van-button size="large"
                    @click="exitClick"
                    type="default">退出
            <svg class="icon"
                 aria-hidden="true"
                 style="font-size:20px;">
                <use xlink:href="#icon-tuichu"></use>
            </svg>
        </van-button>
        <!--        <van-cell is-link-->
        <!--                  @click="exitClick">-->
        <!--            <template slot="title">-->
        <!--                <svg class="icon"-->
        <!--                     aria-hidden="true"-->
        <!--                     style="font-size:20px;">-->
        <!--                    <use xlink:href="#icon-tuichu"></use>-->
        <!--                </svg>-->
        <!--                <span class="cellspantitleclass">退出</span>-->
        <!--            </template>-->
        <!--        </van-cell>-->
        <van-dialog :before-close="beforeClose"
                    show-cancel-button
                    v-model="showdialog">
            <van-field clearable
                       label="现有密码"
                       type="password"
                       placeholder="请输入现有密码"
                       v-model="userinfo.passwordold"/>
            <van-field clearable
                       label="新密码"
                       type="password"
                       placeholder="请输入新密码"
                       v-model="userinfo.password"/>
            <van-field clearable
                       label="再次密码"
                       placeholder="请输入新密码"
                       type="password"
                       v-model="userinfo.password2"/>
        </van-dialog>
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

    // import * as commonmethod from '@/common/bmobapi/users.js'
    import * as userapi from '@/https/api/user.js'

    export default {
        name : "SetupDataPage" ,
        //导入混入对象 可以是多个,数组
        mixins : [
            mix , loginuserdatamix
        ] ,
        //数据模型
        data () {
            return {
                showdialog : false ,
                userinfo : {

                    password : '' ,
                    password2 : '' ,
                    passwordold : '' ,

                }
            }
        } ,
        //方法
        methods : {
            ...mapMutations( "user" , [

                'clearloginuser'

            ] ) ,
            exitClick () {

                this.$dialog.confirm( {
                    message : '确定退出微信吗?'
                } ).then( () => {
                    // 点击确定按钮

                    this.exitsystem( this.loginusermobile );

                } ).catch( () => {
                    // 点击取消按钮

                } );

            } ,
            onClickLeft () {
                this.$router.push( '/me' );
            } ,
            updatepwdClick () {
                //先清除一下 再打开弹窗
                this.clearuserinfo();

                this.showdialog = true;

            } ,
            clearuserinfo () {
                this.userinfo.password = "";
                this.userinfo.password2 = "";
                this.userinfo.passwordold = "";
            } ,
            exitsystem ( mobile = '' ) {

                //  清除一下

                this.clearloginuser();

                //页面转向 登录
                this.$router.push( `/login?mobile=${ mobile }` )

                return;
            } ,
            beforeClose ( action , done ) {
                //点击确定按钮:action=confirm  点击取消按钮:action=cancel

                if ( action === "confirm" ) {

                    if ( !this.userinfo.passwordold ) {
                        this.$toast( "请输入现有密码" )
                        done( false )

                        return;
                    }

                    if ( !this.userinfo.password ) {
                        this.$toast( "请输入密码" )
                        done( false )

                        return;
                    }

                    if ( !this.userinfo.password2 ) {
                        this.$toast( "请再次输入密码" )
                        done( false )

                        return;
                    }

                    if ( this.userinfo.password != this.userinfo.password2 ) {

                        this.$toast( "两次密码不一致" )
                        done( false )

                        return;
                    }

                    ;( async () => {

                        let obj = await userapi.updatepassword( this.loginusermobile , this.userinfo.passwordold , this.userinfo.password );
                        let result = obj.data;

                        if ( result.isok ) {

                            this.$toast.success( {
                                duration : 3800 ,
                                message : '修改成功,请重新登录!'
                            } );

                            done()

                            this.exitsystem( this.loginusermobile );

                            return;
                        }
                        else {
                            this.$toast( result.errmsg )

                            done()

                            return;
                        }

                    } )();

                }
                else {
                    done()
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

    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./SetupDataPage.css">
</style>
