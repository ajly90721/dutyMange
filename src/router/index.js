import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import taskRecord from '../pages/taskRecord/taskRecord.vue'
import plan from '../pages/taskManage/plan.vue'
import planCreate from '../pages/taskManage/planCreate.vue'
import taskManage from '../pages/taskManage/taskManage.vue'
import taskGenerate from '../pages/taskManage/taskGenerate.vue'
import cardEdit from '../pages/cardManage/cardEdit.vue'
import cardManage from '../pages/cardManage/cardManage.vue'
import index from '../pages/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
  {
    path: '/plan',
    name: 'plan',
    component: plan
  },
  {
    path: '/plan/planCreate',
    name: 'planCreate',
    component: planCreate
  },
  {
    path: '/plan/taskGenerate',
    name: 'taskGenerate',
    component: taskGenerate
  },
  {
    path: '/taskManage',
    name: 'taskManage',
    component: taskManage
  },
  
  {
    path: '/cardManage',
    name: 'cardManage',
    component: cardManage
  },
  {
    path: '/cardManage/cardEdit',
    name: 'cardEdit',
    component: cardEdit
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
