 <!--登陆成功后显示的页面-->
<template>
<div class="main">  
<TopBar></TopBar>
<div class="content">
    <NavMenu></NavMenu>
     <div v-bind:class="{'left_content': $store.state.isCollapse, 'left_content1': !$store.state.isCollapse}">
        <keep-alive :include="this.$store.state.arr"> 
            <!--子路由，即右面边的主要内容，通过路由进行变化-->
            <div class="main_content">   
                <router-view></router-view>
            </div>
        </keep-alive>
       <FootBar></FootBar>
    </div>
</div>

</div>
    
</template>

<script>
//引入默认的模板
import store from '@/store/index'
import TopBar from './assembly/TopBar' //顶部
import NavMenu from './assembly/NavMenu'//左侧菜单
import FootBar from './assembly/FootBar'//底部 
export default {
    name:'index',
    store,
    data(){
        return{

        }
    },
    computed:{
        isCollapse(){
            return this.$store.state.isCollapse;
        }
    },
    components:{
        TopBar,
        NavMenu,
        FootBar
    },
    watch:{
      
    },
    methods:{

    },
    mounted(){},
}
</script>

<style scoped>
.left_content{
    position: absolute;
    left: 64px;
    top: 60px;
    bottom: 0;
    right: 0px;
    min-width: 1190px;
    padding-top: 2px;
    padding-bottom: 60px;
    transition: left ease-in-out 300ms;
}
.left_content1{
    position: absolute;
    left: 256px;
    top: 60px;
    bottom: 0;
    right: 0;
    padding-top: 2px;
    padding-bottom: 60px;
    float: left;
    min-width: calc(1289px - 256px );
    transition: left ease-in-out 300ms;
}
.main_content{
    overflow:auto;
    width: 100%;
    height: 100%;
}
</style>

