<template >
<!--
  Login page template will be removed from V-DOM when user is authenticated.
-->
<!-- TODO: prevent flashing login page when authenticated user refreshed page -->
  <div class='authentication'>
    <div v-if="showLogin">
      <Login />
    </div>
    <div v-if="isAuthenticated">
      <Main />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// import { Route } from 'vue-router';
import Main from '@/Main/Main.vue'
import Login from '@/Pages/Login/Login.vue'


@Component({
  name: 'Authentication',
  components: {
    Main,
    Login
  }
})
export default class Authentication extends Vue {

  private isAuthenticated: boolean = false
  private showLogin: boolean = false

  private beforeRouteEnter(to: any, from: any, next: any) {
      console.log('before route enter')
      this.showLogin = false
      this.isAuthenticated = true
      next()
    }

  private created() {
    console.log('created')
    this.showLogin = true
  }
}
</script>

<style scoped lang="scss">
.authentication, .authentication > div {
  height: 100%;
}
</style>

