import Vue from 'vue'
import router from './index'

router.beforeEach((to, from, next) => {
  console.log('main route beforeEach')
  next()
})

export default router
