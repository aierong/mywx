<!--
作者:chenghao
功能:vue页
-->

<!--
发布朋友圈
 -->
<template>
    <div>
        <van-nav-bar left-text="返回"
                     left-arrow
                     @click-left="onClickLeft">
            <template slot="right">
                <van-button type="primary"
                            round
                            @click="savedata"
                            size="small">发表
                </van-button>
            </template>
        </van-nav-bar>
        <br>
        <br>
        <van-cell-group>
            <van-field v-model="pyq.txt"
                       type="textarea"
                       placeholder="此刻的想法......"
                       rows="3"
                       autosize/>
        </van-cell-group>
        <van-cell>
            <template slot="title">
                <van-uploader :after-read="onAfterRead"
                              :before-read="onbeforeRead"
                              accept="image/gif,image/jpeg,image/png"
                              multiple>
                    <van-icon name="photograph"/>
                </van-uploader>
            </template>
        </van-cell>
        <van-cell v-if="imgcounts>0">
            <van-row>
                <draggable v-model="pyq.imglist">
                    <van-col :key="index"
                             span="8"
                             v-for="(file_img , index) in pyq.imglist">
                        <div style="text-align: center;">
                            <img class="myimg"
                                 alt=""
                                 @click="imgclick(index)"
                                 :src="file_img.imgdata"/>
                            <van-icon @click="iconclick(index)"
                                      color="red"
                                      name="cross"/>
                        </div>
                    </van-col>
                </draggable>
            </van-row>
        </van-cell>
        <div class="mytxt">单击图片可放大预览,拖动图片可调整位置</div>
        <div class="mytxt">{{ '最多发布' + maxpiccounts + '张图片' }}</div>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
    //导入
    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    //导入dayjs
    import dayjs from 'dayjs'

    // import * as friendscirclemethod from '@/common/bmobapi/pyq.js'
    import * as pyqapi from '@/https/api/pyq.js'

    import * as constant from '@/common/constant.js'

    // 使用前需要先引入它
    import { ImagePreview } from 'vant';

    // 使用前需要先引入它
    import draggable from "vuedraggable"

    export default {
        name : "addfriendscircle" ,
        //注册组件
        components : {
            draggable
        } ,
        //导入混入对象 可以是多个,数组
        mixins : [ loginuserdatamix ] ,
        //数据模型
        data () {
            return {
                //做9张的
                maxpiccounts : 9 ,
                //单张图片容量限制 2M
                imgmax : 2 * 1024 * 1024 ,

                pyq : {
                    txt : '' ,
                    imglist : new Array() ,

                    mobile : '' ,
                    name : '' ,
                    avatar : '' ,

                }
            }
        } ,
        //方法
        methods : {
            goback () {
                this.$router.push( '/friendscircle' );

                return;
            } ,
            onClickLeft () {
                //这里可以做一个判断，如果填写了，没有发布，就提示一下

                this.goback();
            } ,
            iconclick ( index ) {
                // console.log( index )

                //点击了删除按钮
                this.$delete( this.pyq.imglist , index )

            } ,
            imgclick ( index ) {
                // console.log( 'img' + index )

                //点击了图片按钮，我们全屏看图片哦
                ImagePreview( {
                    images : this.imgdatalist ,
                    // 图片预览起始位置索引
                    startPosition : index ,

                } );
            } ,
            onbeforeRead ( files ) {
                console.log( files )

                //如果选择了多个文件，files就是数组,如果1个文件，files就是对象
                var isarr = Array.isArray( files )

                if ( isarr ) {
                    //选择了多个文件
                    let isexistsdata = files.some( ( element , index , array ) => {
                        return element.size > this.imgmax;
                    } );

                    if ( isexistsdata ) {
                        this.$toast( '请上传图片容量请小于' + this.imgmax + '字节' );

                        return false;
                    }

                }
                else {
                    //只选择了1个文件

                    if ( files.size > this.imgmax ) {
                        this.$toast( '请上传图片容量请小于' + this.imgmax + '字节' );

                        return false;
                    }

                }

                //返回true表示校验通过，返回false表示校验失败
                return true;
            } ,
            onAfterRead ( filedata ) {
                // console.log( filedata )

                //如果选择了多个文件，files就是数组,如果1个文件，files就是对象
                var isarr = Array.isArray( filedata )

                if ( isarr ) {
                    //选择了多个文件
                    filedata.forEach( element => {

                        let imgobj = {

                            imgdata : element.content ,
                            size : element.file.size ,
                            filename : element.file.name ,
                            filetype : element.file.type ,
                            uploadimgdate : dayjs().format( 'YYYY-MM-DD HH:mm:ss' )

                        }

                        this.pyq.imglist.push( imgobj )
                    } )
                }
                else {
                    //只选择了1个文件

                    let imgobj = {

                        imgdata : filedata.content ,
                        size : filedata.file.size ,
                        filename : filedata.file.name ,
                        filetype : filedata.file.type ,
                        uploadimgdate : dayjs().format( 'YYYY-MM-DD HH:mm:ss' )

                    }

                    this.pyq.imglist.push( imgobj )
                }
            } ,
            savedata () {
                //做一些判断
                if ( this.pyq.txt == '' && this.imgcounts <= 0 ) {
                    this.$toast( "不想说点什么,或者发布一些图片也行" )

                    return;
                }

                if ( this.imgcounts > this.maxpiccounts ) {
                    this.$toast( "个人最多" + this.maxpiccounts + "张图片,请清除一些!" )

                    return;
                }

                // if ( this.RongLiang > constant.bmobapidatamax ) {
                //     this.$toast( "bmob限制api数据大小:" + constant.bmobapidatamax + ",请尽量整小图片!" )
                //
                //     return;
                // }

                //把一些属性补齐
                this.pyq.name = this.loginusername;
                this.pyq.mobile = this.loginusermobile;
                this.pyq.avatar = this.loginuseravatar;
                // this.pyq.date = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );

                this.$toast.loading( {
                    duration : 0 ,
                    forbidClick : true ,
                    loadingType : "circular" ,
                    message : "忙碌中...(客官莫急)" ,
                    //显示背景蒙层
                    mask : true
                } )

                // friendscirclemethod.addfriendscircle( this.pyq ).then( ( res ) => {
                //     console.log( res )
                //
                //     //故意延时一下
                //     setTimeout( () => {
                //
                //         this.$toast.clear()
                //
                //         this.goback();
                //
                //     } , 1000 )
                //
                // } )

                pyqapi.add( this.pyq.mobile , this.pyq.name , this.pyq.avatar , this.pyq.txt , this.pyq.imglist ).then( ( res ) => {
                    console.log( res )

                    if ( res != null && res.data.isok ) {
                        //故意延时一下
                        setTimeout( () => {

                            this.$toast.clear()

                            this.$toast.success( {
                                duration : 1000 ,
                                message : '成功'
                            } );

                            this.goback();

                        } , 1000 )
                    }
                    else {
                        this.$toast.clear()

                        this.$toast( "失败" )
                    }

                } )

            } ,
        } ,
        //计算属性
        computed : {
            //图片数量
            imgcounts () {
                if ( this.pyq.imglist != null ) {
                    return this.pyq.imglist.length;
                }

                return 0;
            } ,
            //图片容量 大小
            RongLiang () {
                if ( this.pyq.imglist != null && this.pyq.imglist.length > 0 ) {

                    let sum = this.pyq.imglist.reduce( function ( total , { size } , currentIndex , arr ) {

                        return total + size;
                    } , 0 );

                    return sum;

                }

                return 0;
            } ,
            imgdatalist () {
                if ( this.pyq.imglist != null && this.pyq.imglist.length > 0 ) {

                    let result = this.pyq.imglist.map( function ( value , index , array ) {
                        return value.imgdata;
                    } );

                    return result;
                }

                return [];
            }
        } ,
        //生命周期(mounted)
        mounted () {
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./addfriendscircle.css"
       scoped>
</style>
