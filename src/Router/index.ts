// DO NOT modify this file directly as it is auto generated from generateRoutes.js. Changes on this file will be lost.

import Vue from 'vue'
import Router from 'vue-router'


// Lazy loading each component
// The webpackChunkName is a comment used by webpack to output as filenames for each module
const Authentication = () => import(/* webpackChunkName: "Authentication" */ '@/Pages/Authentication.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '@/Pages/Login/Login.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '/Authentication',
      name: 'Authentication',
      component: Authentication,
    },
  {
      path: '/Login/Login',
      name: 'Login',
      component: Login, meta: { public: true, onlyWhenLoggedOut: true }
    },
  ]
})


export default router
