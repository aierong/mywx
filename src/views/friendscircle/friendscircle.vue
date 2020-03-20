<!--
作者:chenghao
功能: 朋友圈
-->

<!--
 朋友圈
 -->
<template>
    <div>
        <van-nav-bar left-text="返回"
                     left-arrow
                     @click-left="onClickLeft">
            <template slot="right">
                <van-icon color="green"
                          size="20px"
                          @click="iconclick"
                          name="photograph"/>
            </template>
        </van-nav-bar>
        <van-cell>
            <div class="head_wrapper">
                <span class="cellspantitleclass">{{ loginusername  }}</span>
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:58px;">
                    <use v-bind:xlink:href="loginuseravatar | iconallname"></use>
                </svg>
            </div>
        </van-cell>
        <br>
        <!--        //下拉刷新-->
        <van-pull-refresh @refresh="onPullRefreshRefresh"
                          v-model="pullrefresh.isLoading">
            <div v-if="!isshowloading">
                <div v-if="pyqcounts>0">
                    <van-list :finished="downrefresh.finished"
                              :offset="10"
                              @load="onDownRefreshLoad"
                              finished-text="我是有底线的"
                              loading-text="客官莫急,正搞数据中..."
                              v-model="downrefresh.loading">
                        <van-cell :key="index"
                                  v-for="(item,index) in pyqlist">
                            <van-row class="user-links">
                                <!--分成左右2部分,左边显示头像，右边显示名称，图片，评论等等-->
                                <van-col span="4">
                                    <!--头像-->
                                    <svg class="icon"
                                         aria-hidden="true"
                                         style="font-size:38px;">
                                        <use v-bind:xlink:href="item.avatar  | iconallname"></use>
                                    </svg>
                                </van-col>
                                <van-col span="20">
                                    <!--名字
                                    这个栏位肯定有的
                                    -->
                                    <van-cell>
                                        <div class="username">{{ item.name }}</div>
                                    </van-cell>
                                    <!--内容-->
                                    <van-cell v-if="item.txt">
                                        <div v-if="item.txt">{{ item.txt }}</div>
                                    </van-cell>
                                    <!--图片-->
                                    <van-cell v-if="item.imglist!=null && item.imglist.length>0">
                                        <div v-if="item.imglist!=null && item.imglist.length>0">
                                            <van-row class="user-links">
                                                <van-col :key="picindex"
                                                         span="8"
                                                         v-for="(file_img , picindex) in item.imglist">
                                                    <div style="text-align: center;">
                                                        <img class="myimg"
                                                             alt=""
                                                             @click="imgclick(picindex,item.imglist)"
                                                             :src="file_img.imgdata"/>
                                                    </div>
                                                </van-col>
                                            </van-row>
                                        </div>
                                    </van-cell>

                                    <!--点赞 ，工具
                                    这个栏位肯定有的
                                    -->
                                    <van-cell>
                                        <div>
                                            <van-row class="user-links">
                                                <van-col span="12">
                                                    <van-icon size="20px"
                                                              :color="getpraisecolor(item.praiselist)"
                                                              name="thumb-circle-o"
                                                              @click="praiseClick(item.objectId,index)"/>
                                                    <span>{{ getpraisecounttxt(item.praiselist) }}</span>
                                                </van-col>
                                                <van-col span="12">
                                                    <div style="text-align: right;">
                                                        <van-tag mark
                                                                 @click="bbsClick(item.objectId,index)"
                                                                 type="success">评论
                                                        </van-tag>
                                                    </div>
                                                </van-col>
                                            </van-row>
                                        </div>
                                    </van-cell>
                                    <!--点赞  人员列表
                                    这个不一定存在
                                    -->
                                    <van-cell v-if="item.praiselist!=null && item.praiselist.length>0">
                                        <div v-if="item.praiselist!=null && item.praiselist.length>0">
                                            <template v-for="(praise,praiseindex) in item.praiselist">
                                                <van-icon size="16px"
                                                          name="like-o"/>
                                                {{ praise.name }}
                                            </template>
                                        </div>
                                    </van-cell>
                                    <!--评论 列表
                                    这个不一定存在
                                    -->
                                    <van-cell v-if="item.bbslist!=null && item.bbslist.length>0">
                                        <div v-for="(itembbs,bbsindex) in item.bbslist"
                                             :key="bbsindex">
                                            {{ itembbs.name +":"+itembbs.txt }}
                                        </div>
                                    </van-cell>
                                    <!--发布时间  删除等信息
                                    这个栏位肯定有的
                                    -->
                                    <van-cell>
                                        <div class="friendscircledate">
                                            <van-row class="user-links">
                                                <van-col span="12">
                                                    {{ item.date | formatdatetxt }}
                                                </van-col>
                                                <van-col span="12">
                                                    <div style="text-align: right;">
                                                        <!--删除,要判断是否是自己发的朋友圈-->
                                                        <van-icon v-if="item.mobile==loginusermobile"
                                                                  size="20px"
                                                                  color="red"
                                                                  @click="pyqdelete(item.objectId,index)"
                                                                  name="close"/>
                                                    </div>
                                                </van-col>
                                            </van-row>
                                        </div>
                                    </van-cell>
                                </van-col>
                            </van-row>
                        </van-cell>
                    </van-list>
                </div>
                <div v-else>
                    <br>
                    <br>
                    <br>
                    <br>

                    <div style="text-align: center;color: #63a35c;">空空,赶紧来吧!</div>
                </div>
            </div>
        </van-pull-refresh>
        <van-dialog :before-close="beforeClose"
                    show-cancel-button
                    v-model="showdialog">
            <van-field clearable
                       label="评论"
                       placeholder="请输入您的留言"
                       v-model="bbsobj.bbstxt"/>
        </van-dialog>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // import * as friendscirclemethod from '@/common/bmobapi/pyq.js'
    import * as pyqapi from '@/https/api/pyq.js'

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    //导入
    import { mix } from "@/mixin/index.js"
    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    // 使用前需要先引入它
    import { ImagePreview } from 'vant';

    import dayjs from 'dayjs'

    //记得 导入语言包
    import 'dayjs/locale/zh-cn'

    //relativeTime 是一个官方扩展插件
    import relativeTime from 'dayjs/plugin/relativeTime'  // 按需加载插件

    //引入 lodash
    import * as _ from "lodash"

    export default {
        name : "friendscircle" ,
        //导入混入对象 可以是多个,数组
        mixins : [ mix , loginuserdatamix ] ,
        //数据模型
        data () {
            return {
                defaultcounts : 5 ,

                pyqlist : [] ,

                showdialog : false ,

                bbsobj : {
                    bbstxt : '' ,
                    selectid : '' ,
                    selectindex : -1
                } ,

                //下拉刷新使用的参数
                downrefresh : {
                    loading : false ,
                    finished : false
                } ,

                //下拉刷新使用的参数
                pullrefresh : {
                    isLoading : false
                } ,

                isshowloading : true ,
            }
        } ,
        //方法
        methods : {
            //返回
            onClickLeft () {
                this.$router.push( '/discover' );
            } ,
            iconclick () {
                this.$router.push( '/addfriendscircle' );
            } ,
            //判断当前操作者是否点赞
            ismypraise ( praiselist ) {

                if ( this.getpraiselistindex( praiselist ) > -1 ) {
                    return true;
                }

                return false;
            } ,
            getpraiselistindex ( praiselist ) {
                if ( praiselist != null && praiselist.length > 0 ) {
                    let _index = praiselist.findIndex( ( element , index , array ) => {
                        return element.mobile == this.loginusermobile;
                    } );

                    return _index;
                }

                return -1;
            } ,
            getpraisecolor ( praiselist ) {
                //目前操作者点赞了,就红色显示
                if ( this.ismypraise( praiselist ) ) {
                    return 'red';
                }

                return "";
            } ,
            //点赞数量
            getpraisecounttxt ( praiselist ) {
                if ( praiselist != null && praiselist.length > 0 ) {
                    let counts = praiselist.length;

                    //大于99
                    if ( counts > 99 ) {
                        return "99+";
                    }
                    else {
                        return counts;
                    }
                }

                return "";
            } ,
            //点赞
            praiseClick ( objectId , _index ) {
                //objectId
                ;( async () => {

                    //去更新服务器
                    let resultdata = await friendscirclemethod.updatepraiselist(
                        objectId ,
                        dayjs().format( 'YYYY-MM-DD HH:mm:ss' ) ,
                        this.loginusermobile ,
                        this.loginusername
                    );
                    console.log( 'resultdata' , resultdata )
                    //重新取一下吧
                    //this.getpyqlist( 5 ); //重新取一下吧

                    //重新取一下吧
                    let _data = await friendscirclemethod.getfriendscirclebyid( objectId );
                    console.log( '_data' , _data )
                    if ( _data != null ) {
                        //更新这条记录
                        this.$set( this.pyqlist , _index , _data );
                    }

                    return;

                } )();

            } ,
            //评论
            bbsClick ( objectId , _index ) {
                //弹窗
                this.bbsobj.bbstxt = "";
                this.bbsobj.selectid = objectId;
                this.bbsobj.selectindex = _index;
                this.showdialog = true;
            } ,
            //关闭 评论 弹窗
            beforeClose ( action , done ) {
                if ( action === "confirm" ) {

                    if ( !this.bbsobj.bbstxt ) {
                        this.$toast( "请输入您的留言" )
                        done( false )

                        return;
                    }

                    ;( async () => {

                        // console.log( 'this.bbsobj.selectid' , this.bbsobj.selectid )
                        //去更新服务器
                        let resultdata = await friendscirclemethod.updatebbslist(
                            this.bbsobj.selectid ,
                            dayjs().format( 'YYYY-MM-DD HH:mm:ss' ) ,
                            this.bbsobj.bbstxt ,
                            this.loginusermobile ,
                            this.loginusername
                        );

                        // console.log( 'resultdata' , resultdata )

                        //this.getpyqlist( 5 ); //重新取一下吧
                        //重新取一下吧
                        let _data = await friendscirclemethod.getfriendscirclebyid( this.bbsobj.selectid );
                        // console.log( '_data' , _data )
                        if ( _data != null ) {
                            //更新这条记录
                            this.$set( this.pyqlist , this.bbsobj.selectindex , _data );
                        }

                        return;

                    } )();

                    done()

                    return;
                }
                else {
                    done()

                    return;
                }
            } ,
            //删除朋友圈
            pyqdelete ( objectId , _index ) {
                //这里 没有做弹窗确认，做一下好些

                ;( async () => {

                    let result = await friendscirclemethod.deletefriendscirclebyid( objectId );
                    console.log( 'result' , result )
                    //this.getpyqlist( 5 ); //重新取一下吧

                    this.$delete( this.pyqlist , _index )

                    return;

                } )();
            } ,

            //图片单击预览
            imgclick ( index , imgs ) {
                let arrimgs = [];

                // 转换一下
                if ( imgs != null && imgs.length > 0 ) {

                    let result = imgs.map( function ( value , index , array ) {
                        return value.imgdata;
                    } );

                    arrimgs = result;
                }

                //点击了图片按钮，我们全屏看图片哦
                ImagePreview( {
                    images : arrimgs ,

                    // 图片预览起始位置索引
                    startPosition : index ,

                } );
            } ,
            //得朋友圈列表
            getpyqlist ( counts ) {

                this.$toast.loading( {
                    duration : 0 ,
                    forbidClick : true ,
                    loadingType : "circular" ,
                    message : "努力搞呀..." ,
                    //显示背景蒙层
                    mask : true
                } )

                //新方法
                // friendscirclemethod.getfriendscirclelistBingXing( counts ).then( ( res ) => {
                //     console.log( res )
                //
                //     this.pyqlist = res;
                //
                //     this.isshowloading = false;
                //     this.$toast.clear()
                // } );

                pyqapi.getlist().then( ( res ) => {
                    console.log( res )

                    let _data = res.data.listdata;
                    this.pyqlist = _data;
                    //
                    this.isshowloading = false;
                    this.$toast.clear()
                } )
            } ,
            //下拉刷新
            onPullRefreshRefresh () {

                //新方法
                friendscirclemethod.getfriendscirclelistbymaxidBingXing( this.getmaxid ).then( ( res ) => {
                    console.log( 'onPullRefreshRefresh' , res )

                    if ( res != null && res.length > 0 ) {
                        //把列表增加数据

                        this.pyqlist.unshift( ...res )
                    }

                    //把新增加数据 加到数组头部
                    this.pullrefresh.isLoading = false
                } )

            } ,
            //下拉刷新加载数据
            onDownRefreshLoad () {
                let counts = 2;

                friendscirclemethod.getfriendscirclelistbyminidBingXing( this.getminid , counts ).then( ( res ) => {
                    console.log( 'onDownRefreshLoad' , res )

                    if ( res != null && res.length > 0 ) {
                        //把列表增加数据

                        //数据加入到数组尾部
                        this.pyqlist.push( ...res )
                    }
                    else {
                        this.downrefresh.finished = true
                    }

                    this.downrefresh.loading = false

                } );

            } ,
        } ,
        //计算属性
        computed : {
            //朋友圈数量
            pyqcounts () {
                if ( this.pyqlist != null ) {
                    return this.pyqlist.length;
                }

                return 0;
            } ,
            getminid () {
                if ( this.pyqcounts > 0 ) {

                    let obj = _.minBy( this.pyqlist , ( val ) => {
                        return val.id;
                    } )

                    return obj.id;
                }

                return 0;
            } ,
            getmaxid () {
                if ( this.pyqcounts > 0 ) {

                    let obj = _.maxBy( this.pyqlist , ( val ) => {
                        return val.id;
                    } )

                    return obj.id;
                }

                return 0;
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            //初始化一下
            dayjs.extend( relativeTime )  // 使用插件

            this.getpyqlist( this.defaultcounts );
        } ,
        //过滤器
        filters : {
            // 格式化 日期文本
            formatdatetxt : ( _date ) => {
                return dayjs( _date ).locale( 'zh-cn' ).fromNow();
            } ,
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./friendscircle.css">
</style>
