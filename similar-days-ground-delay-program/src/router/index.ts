import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/login',
    component: () => import('../views/anti/camera.vue')
  },
  {
    path: '/exam',
    component: () => import('../views/anti/ExamView.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('../views/404View.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  // 主页面
  {
    path: '/dashboard',
    component: () => import('../views/mainView/dashboardView.vue'),
    // 嵌套路由
    children: [
      {
        path: '/dashboard/flowstatistics',
        component: () => import('../views/mainView/dashboard/FlowstatisticsView.vue')
      }
    ]
  }



]

const router = new VueRouter({
  routes
})

export default router
