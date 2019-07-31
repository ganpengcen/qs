import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url';
Vue.use(Router)

// 路由的定义
const Login=resolve=>void (require(['../components/assembly/Login.vue'],resolve));
const Index=resolve=>void(require(['../components/Index.vue'],resolve));
const Page=resolve=>void(require(['../components/page/page.vue'],resolve));
const Page2=resolve=>void(require(['../components/page/page2.vue'],resolve));
const Operaional=resolve=>void(require(['../components/SysManage/Operational.vue'],resolve));
const Approval=resolve=>void(require(['../components/SysManage/Approval.vue'],resolve));

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      /*******模板页面即包含头部 左侧菜单栏 主页面 底部 *********/
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true // 需要被缓存
      },
      /************主页面的类容*************/
      children:[
      {
        path:'/Page',
        name:'Page',
        component:Page,
      },
      {
        path:'/Operational',
        name:'Operatoinal',
        component:Operaional
      },
      {
        path:'/Approval',
        name:'Approval',
        component:Approval
      },
    ]
      
    }
    
    ]
  
})
