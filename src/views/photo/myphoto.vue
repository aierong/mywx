<!--
作者:chenghao
功能:vue页
-->

<!--
 相册
 -->
<template>

    <div>
        <van-nav-bar left-text="返回"
                     left-arrow
                     @click-left="onClickLeft">
            <template slot="right">

                <van-uploader :after-read="onAfterRead"
                              :before-read="onbeforeRead"
                              accept="image/gif, image/jpeg"
                              :max-count="maxcounts"
                              multiple>
                    <van-icon name="photograph"/>
                </van-uploader>
            </template>
        </van-nav-bar>
        <br>
        <br>

        <div v-if="!isshowloading">
            <div v-if="imgcounts>0">

                <van-cell-group>
                    <van-switch-cell title="我愿意共享相册"
                                     @change="sharephotochange"
                                     v-model="issharephoto"/>
                </van-cell-group>
                <van-cell :value="imgcounts+'张(容量'+   FormatKB(RongLiang,2) +')'">
                    <template slot="title">
                        {{ this.loginusername +'相册(单击图片可放大)' }}
                    </template>
                </van-cell>

                <van-cell :key="index"
                          v-for="(file_img,index) in showFileData">
                    <template slot="title">
                        <img class="myimg"
                             alt=""
                             @click="imgclick(index)"
                             :src="file_img.imgdata"/>
                        <span>{{  FormatDate(file_img.imgdate,'YYYY-MM-DD') }}</span>
                        <span>{{ '(' }}{{    FormatKB(file_img.size,2)  }}{{ ')' }}</span>
                    </template>
                    <template slot="right-icon">
                        <van-icon @click="iconclick(index)"
                                  color="red"
                                  size="36px"
                                  name="cross"/>
                    </template>

                </van-cell>
            </div>
            <div v-else>
                <br>
                <br>
                <br>
                <br>

                <div style="text-align: center;color: #63a35c;">空空耶!赶紧上一波!</div>
            </div>
        </div>
        <br>
        <van-button size="large"
                    @click="savepic"
                    :disabled="isdisabledbtn"
                    type="primary">保存
        </van-button>
        <div class="txttip">{{ '1.最多保存'+ maxcounts +'张图片'}}</div>
        <div class="txttip">{{ '2.单张图片容量限制:' }}{{ FormatKB(imgmax,0) }}</div>
        <br>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //导入dayjs
    import dayjs from 'dayjs'

    import * as constant from '@/common/constant.js'

    //导入
    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    // import * as userphotomethod from '@/common/bmobapi/userphoto.js'
    import * as userphotoapi from '@/https/api/userphoto.js'

    // 使用前需要先引入它
    import { ImagePreview } from 'vant';

    export default {
        name : "myphoto" ,
        //导入混入对象 可以是多个,数组
        mixins : [ loginuserdatamix ] ,
        //数据模型
        data () {
            return {
                showFileData : [] ,

                IsCZ : false ,
                // imgid : '' ,
                isshowloading : true ,

                issharephoto : false ,

                //最多9个图片
                maxcounts : 9 ,
                //所有图片容量大小限制
                // allimgmax : constant.bmobapidatamax ,
                //单张图片容量限制 2M
                imgmax : 2 * 1024 * 1024 ,
            }
        } ,
        //方法
        methods : {
            getuserphotolist () {

                this.$toast.loading( {
                    duration : 0 ,
                    forbidClick : true ,
                    loadingType : "circular" ,
                    message : "加油搞呀..." ,
                    //显示背景蒙层
                    mask : true
                } )

                let _mobile = this.loginusermobile;

                userphotoapi.getuserphoto( _mobile ).then( ( result ) => {
                    console.log( 'result' , result )

                    let _data = result.data.data;

                    if ( _data != null ) {
                        this.showFileData = _data.imgs; //这个有可能是空数组
                        this.issharephoto = _data.isshare;
                    }
                    else {
                        this.showFileData = []; //这个是空数组
                        this.issharephoto = false;
                    }

                    this.isshowloading = false;
                    this.$toast.clear()
                } )

                // userphotomethod.getuserphotobymobile( _mobile ).then( ( result ) => {
                //     console.log( result )
                //
                //     //分2种情况，一种是存在数据，一种是不存在数据
                //     //不存在数据，我们得初始化一份数据
                //     if ( !result.isexists ) {
                //         //不存在数据，我们初始化一下
                //         let newuserphoto = {
                //             mobile : _mobile ,
                //
                //             //图片列表 先给一个空数组
                //             imgs : new Array() ,
                //             isshare : false
                //         }
                //
                //         userphotomethod.adduserphoto( newuserphoto ).then( ( addresult ) => {
                //             console.log( 'addresult' , addresult )
                //
                //             this.showFileData = new Array();
                //             this.issharephoto = false;
                //
                //             //记录一下id，后面更新要用
                //             if ( addresult != null ) {
                //                 this.imgid = addresult.objectId;
                //             }
                //             else {
                //                 this.imgid = '';
                //             }
                //
                //             this.isshowloading = false;
                //             this.$toast.clear()
                //         } )
                //
                //     }
                //     else {
                //         //存在数据，有可能是没有 相册图片的
                //
                //         let obj = result;
                //         let _data = obj.data;
                //         this.showFileData = _data.imgs; //这个有可能是空数组
                //         this.issharephoto = _data.isshare;
                //
                //         //记录一下id，后面更新要用
                //         this.imgid = _data.objectId;
                //
                //         this.isshowloading = false;
                //         this.$toast.clear()
                //     }
                // } );

            } ,
            savepic () {
                if ( this.IsCZ ) {
                    //改变了，要保存一下图片，

                    if ( this.imgcounts > this.maxcounts ) {
                        this.$toast( "个人最多" + this.maxcounts + "张图片,请清除一些!" )

                        return;
                    }

                    this.$toast.loading( {
                        duration : 0 ,
                        forbidClick : true ,
                        loadingType : "circular" ,
                        message : "稍等..." ,
                        //显示背景蒙层
                        mask : true
                    } )

                    userphotoapi.save( this.loginusermobile , this.issharephoto , this.showFileData ).then( ( result ) => {

                        this.$toast.clear()

                        console.log( 'result' , result )

                        let _data = result.data;

                        if ( _data.isok ) {
                            this.$toast.success( {
                                duration : 1000 ,
                                message : '成功'
                            } );

                            return;
                        }
                        else {
                            this.$toast( _data.errmsg )

                            return;
                        }

                        // this.$router.push( '/me' );
                    } )

                }
                else {
                    this.$toast( '没有变化,不必保存' )

                    return;
                }
            } ,
            FormatKB ( value , decimalplace ) {
                return ( value / 1024 ).toFixed( decimalplace ) + 'KB';
            } ,
            FormatDate ( value , formatstr ) {
                return dayjs( value ).format( formatstr );
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
            iconclick ( index ) {
                // console.log( index )

                //点击了删除按钮
                this.$delete( this.showFileData , index )

                this.IsCZ = true; //标记一下 操作了
            } ,
            sharephotochange () {
                this.IsCZ = true; //标记一下 操作了
            } ,
            onClickLeft () {
                //操作者
                this.$router.push( '/me' );

                return;

                if ( this.IsCZ ) {
                    //改变了，要保存一下图片，再返回

                    if ( this.imgcounts > this.maxcounts ) {
                        this.$toast( "个人最多" + this.maxcounts + "张图片,请清除一些!" )

                        return;
                    }

                    //constant
                    if ( this.RongLiang > this.allimgmax ) {
                        this.$toast( "云数据库bmob限制每次api数据大小:" + this.allimgmax + ",请尽量使用小图片!" )

                        return;
                    }

                    this.$toast.loading( {
                        duration : 0 ,
                        forbidClick : true ,
                        loadingType : "circular" ,
                        message : "稍等..." ,
                        //显示背景蒙层
                        mask : true
                    } )

                    userphotomethod.updateuserphoto(
                        this.imgid ,
                        this.showFileData ,
                        this.issharephoto ).then( ( result ) => {
                        console.log( 'result' , result )
                        this.$toast.clear()
                        this.$router.push( '/me' );
                    } )

                }
                else {
                    this.$router.push( '/me' );
                }

            } ,
            onbeforeRead ( files ) {
                console.log( 'onbeforeRead' , files )

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
                console.log( 'onAfterRead' , filedata )

                //如果选择了多个文件，files就是数组,如果1个文件，files就是对象
                var isarr = Array.isArray( filedata )

                // console.log( isarr )
                // console.log('')

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

                        this.showFileData.push( imgobj )
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

                    this.showFileData.push( imgobj )
                }

                this.IsCZ = true; //标记一下 操作了
            } ,

        } ,
        //计算属性
        computed : {
            //是否禁用保存按钮
            isdisabledbtn () {
                if ( this.imgcounts > 0 ) {
                    if ( this.IsCZ ) {
                        return false;
                    }

                }

                //返回true 就是禁用
                return true;
            } ,
            //图片数量
            imgcounts () {
                if ( this.showFileData != null ) {
                    return this.showFileData.length;
                }

                return 0;
            } ,
            //图片容量 大小
            RongLiang () {
                if ( this.showFileData != null && this.showFileData.length > 0 ) {

                    let sum = this.showFileData.reduce( function ( total , { size } , currentIndex , arr ) {

                        return total + size;

                    } , 0 );

                    return sum;

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
        mounted () {
            this.getuserphotolist();
        } ,

    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./myphoto.css"
       scoped>
</style>
