import Vue from 'vue';
import Vuex from 'vuex';

//引入 状态管理（vuex） 详情看vuex文档
Vue.use(Vuex);
//定义一个state（单一状态树） 能够直接地定位任一特定的状态片段
const state={
    changeMenu:false,//改变菜单
    isCollapse:false,//是否菜单栏是否折叠，左右折叠

    pageArr:[],//需要缓存的页面
    //标签页
    tags:[],
    //动态判断是否点击菜单
    checkMenu:false,


};

//Getter用来在js页面中读取你要的状态
const getters={

    getChange(state){
        return state.changeMenu;
    },
    getCollapse(state){
        return state.isCollapse;
    }
};
//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,在store中的配置 调用例如:this.$store.commit("SetTestFlag",true)
const mutations={
    change(){
        state.isCollapse=!this.state.isCollapse;
    },

    changeCollapse(){
        state.isCollapse=!this.state.isCollapse;
    },
    //改变标签，即当前活跃的菜单
    addTags(state,item){
        state.tags.forEach(item => {
            item.active=false
        });
        if(state.tags.length<=7){
            state.tags.push(item);
        }else if(state.tags.length>7){
            state.tags.shift()
            state.tags.push(item);
        }
        state.pageArr.push(item.currentPath);
    },
    changeCheckMenu(state,flag){
        state.checkMenu=flag;
    },
    //当前选中的路由菜单变为活页
    changeActive(state,path){
        state.tags.forEach(item=>{
            item.active=false;
            if(item.currentPath==path){
                item.active=true;
            }
        })
        console.log("iiiiii",state.tags)
    },
    //删除标签
  deleteTag(state, index) {
    state.tags.splice(index, 1);
    state.pageArr.splice(index, 1);
    console.log(state.tags)
  }
};



const store=new Vuex.Store({
    state,
    getters,
    mutations
});

export default store;