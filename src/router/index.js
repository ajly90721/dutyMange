import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import taskRecord from '../pages/taskRecord/taskRecord.vue'
import plan from '../pages/taskManage/plan.vue'
import taskManage from '../pages/taskManage/taskManage.vue'
import taskGenerate from '../pages/taskManage/taskGenerate.vue'
import cardEdit from '../pages/cardManage/cardEdit.vue'
import cardManage from '../pages/cardManage/cardManage.vue'
import index from '../pages/index.vue'
import login from '../pages/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  {
    path: '/taskRecord',
    name: 'taskRecord',
    component: taskRecord,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  {
    path: '/plan',
    name: 'plan',
    component: plan,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  {
    path: '/plan/taskGenerate',
    name: 'taskGenerate',
    component: taskGenerate,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  {
    path: '/taskManage',
    name: 'taskManage',
    component: taskManage,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  
  {
    path: '/cardManage',
    name: 'cardManage',
    component: cardManage,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  {
    path: '/cardManage/cardEdit',
    name: 'cardEdit',
    component: cardEdit,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
  },
  
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: login
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
