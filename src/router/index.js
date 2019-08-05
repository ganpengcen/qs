import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url';
Vue.use(Router)

// 路由的定义
const Login = resolve => void (require(['../components/assembly/Login.vue'], resolve));
const Index = resolve => void (require(['../components/Index.vue'], resolve));
const Page = resolve => void (require(['../components/page/page.vue'], resolve));
const Page2 = resolve => void (require(['../components/page/page2.vue'], resolve));
const Operaional = resolve => void (require(['../components/SysManage/Operational.vue'], resolve));
const Approval = resolve => void (require(['../components/SysManage/Approval.vue'], resolve));
const Operator = resolve => void (require(['../components/SysManage/Operator.vue'], resolve));
const Structure = resolve => void (require(['../components/SysManage/Structure.vue'], resolve));
const Dictionary = resolve => void (require(['../components/SysManage/Dictionary.vue'], resolve));
const Custom = resolve => void (require(['../components/SysManage/Custom.vue'], resolve));
const Equipment = resolve => void (require(['../components/RiskManage/Equipment.vue'], resolve));
const Jobs = resolve => void (require(['../components/RiskManage/Jobs.vue'], resolve));
const Process = resolve => void (require(['../components/RiskManage/Process.vue'], resolve));
const ExStanderd = resolve => void (require(['../components/RiskManage/ExStanderd.vue'], resolve));
const RciManage = resolve => void (require(['../components/RiskManage/RciManage.vue'], resolve));
const Reskmanagement=resolve=>void(require(['../components/riskManagement/reskmanagement2.vue'],resolve));
const testapply=resolve=>void(require(['../components/riskManagement/testapply2.vue'],resolve));
const patroltask=resolve=>void(require(['../components/riskManagement/patroltask2.vue'],resolve));
const tempTask=resolve=>void(require(['../components/riskManagement/temporaryTask.vue'],resolve));
const reskcontral=resolve=>void(require(['../components/riskManagement/reskcontral.vue'],resolve));
const video=resolve=>void(require(['../components/riskManagement/video.vue'],resolve));
const riskshow=resolve=>void(require(['../components/files/riskshow.vue'],resolve));
const natrue=resolve=>void(require(['../components/files/natrul.vue'],resolve));
const safety=resolve=>void(require(['../components/files/safety.vue'],resolve));
const train=resolve=>void(require(['../components/files/train.vue'],resolve));
const health=resolve=>void(require(['../components/health/health.vue'],resolve));
const manage=resolve=>void(require(['../components/health/manage.vue'],resolve));


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
      children: [
        {
          path: '/Page',
          name: 'Page',
          component: Page,
        },
        {
          path: '/Operational',
          name: 'Operatoinal',
          component: Operaional
        },
        {
          path: '/Approval',
          name: 'Approval',
          component: Approval
        },
        {
          path: '/Operator',
          name: 'Operator',
          component: Operator
        },
        {
          path: '/Structure',
          name: 'Structure',
          component: Structure
        },
        {
          path: '/Dictionary',
          name: 'Dictionary',
          component: Dictionary
        },
        {
          path: '/Custom',
          name: 'Custom',
          component: Custom
        },
        {
          path: '/Equipment',
          name: 'Equipment',
          component: Equipment
        },
        {
          path: '/Jobs',
          name: 'Jobs',
          component: Jobs
        },
        {
          path: '/Process',
          name: 'Process',
          component: Process
        },
        {
          path: '/ExStanderd',
          name: 'ExStanderd',
          component: ExStanderd
        },
        {
          path: '/RciManage',
          name: 'RciManage',
          component: RciManage
        },
        {
          path:'/1',
          name:'Reskmanagement',
          component:Reskmanagement
        },
        {
          path:'/2',
          name:'testapply',
          component:testapply
        },
        {
          path:'/3',
          name:'patroltask',
          component:patroltask
        },
        {
          path:'/4',
          name:'tempTask',
          component:tempTask
        },
        {
          path:'/5',
          name:'reskcontral',
          component:reskcontral
        },
        {
          path:'/6',
          name:'video',
          component:video
        },
        {
          path:'/7',
          name:'riskshow',
          component:riskshow
        },
        {
          path:'/8',
          name:'natrue',
          component:natrue
        },
        {
          path:'/9',
          name:'train',
          component:train
        }
        ,
        {
          path:'/10',
          name:'safety',
          component:safety
        },
        {
          path:'/11',
          name:'health',
          component:health
        },
        {
          path:'/12',
          name:'manage',
          component:manage
        }
      ]

    }

  ]

})
