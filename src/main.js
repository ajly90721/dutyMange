import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment"; 

Vue.use(ElementUI).use(moment);
Vue.config.productionTip = false

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)){ 
   console.log('检查token');
        // 判断当前的token是否存在 ； 登录存入的token
      if (sessionStorage.getItem('token')!=null) next();
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      else  next({ path:'/login', query:{redirect: to.fullPath} }) 
  }
  else next();
 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
