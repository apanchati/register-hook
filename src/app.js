import './class-component-hooks'

import Vue from 'vue'
import Authentication from './Pages/Authentication'
import router from './Router/NavigationGuards'


// remove warning message on console tab in developer tools "You are running Vue in development mode..."
Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(Authentication)
})

export { app, router }
