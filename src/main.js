// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/my.css'


import {
  post,
  get,
} from 'axios'
Vue.prototype.$post = post;
Vue.prototype.$get = get;

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

 Vue.prototype.$init=function(item){
   var flag=0;
   if(this.$store.state.tags.length!=0){
     this.$store.state.tags.forEach(item1 => {
       if(item1.name==item.name){
         flag=1;
       }
     });
     if(flag==0){
      this.$store.commit("addTags", item)
     }
   }else{
    this.$store.commit("addTags", item)
   }
 }