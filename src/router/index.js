import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import taskRecord from '@/pages/taskRecord/taskRecord' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/taskRecord',
      name: 'taskRecord',
      component: taskRecord
    },
  ]
})
