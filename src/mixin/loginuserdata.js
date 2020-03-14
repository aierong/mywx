/*
 作者: chenghao
 功能: js脚本
 */
import {
    mapState ,
    mapGetters
} from 'vuex'

export const loginuserdatamix = {
    //特别提示：下面这几个计算属性，请在登录后再调用

    computed : {

        ...mapState( "user" , {

            loginuserdata : 'loginuser' ,

        } ) ,

        ...mapGetters( "user" , {

            loginusername : 'username' ,

            loginusermobile : 'usermobile' ,

            loginuseravatar : 'useravatar'
        } ) ,
    } ,

}


