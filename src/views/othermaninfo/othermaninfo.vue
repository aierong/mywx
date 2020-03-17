<!--
作者:chenghao
功能:vue页
-->

<!--  -->
<template>
    <div>
        <van-nav-bar left-text="返回"
                     left-arrow
                     @click-left="onClickLeft">
            <span slot="right">好友资料</span>
        </van-nav-bar>
        <br>
        <br>
        <div>
            <van-cell size="large">
                <template slot="title">
                    <svg class="icon"
                         aria-hidden="true"
                         style="font-size:58px;">
                        <use v-bind:xlink:href="maninfo.avatar | iconallname"></use>
                    </svg>
                    <span class="cellspantitleclass">{{ maninfo.name +'('  + maninfo.mobile + ')' }}</span>
                </template>
            </van-cell>
            <van-cell size="large">
                <template slot="title">
                    <span>{{ '邮箱:'  + maninfo.email   }}</span>
                </template>
            </van-cell>
            <br>
            <div v-if="issharephoto">
                <div>{{ '好友共享相册公开'+imgcounts +'张'}}</div>
                <van-cell v-if="imgcounts>0">
                    <div v-if="imgcounts>0">
                        <van-row class="user-links">
                            <van-col :key="picindex"
                                     span="8"
                                     v-for="(file_img , picindex) in showFileData">
                                <div style="text-align: center;">
                                    <img class="myimg"
                                         alt=""
                                         @click="imgclick(picindex)"
                                         :src="file_img.imgdata"/>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </van-cell>
            </div>
            <div class="mytip"
                 v-else>
                好友共享相册未公开
            </div>
        </div>
    </div>

</template>

<!--
js脚本代码片段
-->
<script>
    import { mapMutations } from 'vuex'

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    //导入
    import { mix } from "@/mixin/index.js"
    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    // import * as commonmethod from '@/common/bmobapi/users.js'
    // import * as userphoto from '@/common/bmobapi/userphoto.js'

    import * as userapi from '@/https/api/user.js'
    import * as userphotoapi from '@/https/api/userphoto.js'

    //导入组件
    import userselectavatar from '@/components/userselectavatar.vue'

    // 使用前需要先引入它
    import { ImagePreview } from 'vant';

    export default {
        name : "othermaninfo" ,
        //导入混入对象 可以是多个,数组
        mixins : [
            mix ,
            loginuserdatamix
        ] ,
        //注册组件
        components : {
            userselectavatar
        } ,
        // 因为路由中定义了props: true，这样页面中可以用props接收参数
        props : [
            'queryusermobile'
        ] ,
        //数据模型
        data () {
            return {
                maninfo : {
                    name : '' ,
                    //这里直接取到传递过来的参数值
                    mobile : this.queryusermobile ,
                    avatar : 'touxiang1' ,
                    email : ''
                } ,
                showFileData : [] ,

                // isshowloading : true ,

                issharephoto : false
            }
        } ,
        //方法
        methods : {
            ...mapMutations( "other" , [

                'SetRefreshContactsList'

            ] ) ,
            //返回按钮单击
            onClickLeft () {
                this.SetRefreshContactsList( false );  //不刷新联系人

                this.$router.push( "/contacts" );
                // this.$router.push( '/contacts' );
            } ,
            getuserinfo () {
                // this.$toast.loading( {
                //     duration : 0 ,
                //     forbidClick : true ,
                //     loadingType : "spinner" ,
                //     message : "加油搞呀..." ,
                //     //显示背景蒙层
                //     mask : true
                // } )

                let _mobile = this.maninfo.mobile;
                userapi.getuserbymobile( _mobile ).then( ( res ) => {

                    let user = res.data.data;

                    // console.log( 'user' , user )

                    if ( user != null ) {
                        this.maninfo.name = user.name;
                        this.maninfo.avatar = user.avatar;
                        this.maninfo.email = user.email;

                        //再取相册信息
                        userphotoapi.getuserphoto( _mobile ).then( ( photo ) => {
                            console.log( 'photo' , photo )

                            let photodata = photo.data.data;

                            if ( photodata != null ) {
                                this.issharephoto = photodata.isshare;
                                if ( !this.issharephoto ) {
                                    this.showFileData = [];
                                }
                                else {
                                    this.showFileData = photodata.imgs;
                                }
                            }

                            // this.isshowloading = false;
                            // this.$toast.clear()
                        } )
                    }
                    else {
                        // this.isshowloading = false;
                        // this.$toast.clear()
                    }

                } )

            } ,
            imgclick ( index ) {
                //点击了图片按钮，我们全屏看图片哦
                ImagePreview( {
                    images : this.imgdatalist ,
                    // 图片预览起始位置索引
                    startPosition : index ,

                } );
            } ,
        } ,
        //计算属性
        computed : {
            imgcounts () {
                if ( this.showFileData != null ) {
                    return this.showFileData.length;
                }

                return 0;
            } ,
            imgdatalist () {
                if ( this.showFileData != null && this.showFileData.length > 0 ) {

                    let result = this.showFileData.map( function ( value , index , array ) {
                        return value.imgdata;
                    } );

                    return result;
                }

                return [];
            } ,
        } ,
        //生命周期(mounted)
        created () {
        } ,
        mounted () {
            //接收参数
            //this.maninfo.mobile = this.$route.query.empmobile;
            // this.maninfo.mobile = this.queryusermobile;

            this.getuserinfo();

            // console.log('this.$parent.testmsg',this.$parent.testmsg)
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./othermaninfo.css"
       scoped>
</style>
