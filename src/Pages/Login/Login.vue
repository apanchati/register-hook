<template >
<!--
  Login page template will be removed from V-DOM when user is authenticated.
-->
<!-- TODO: prevent flashing login page when authenticated user refreshed page -->
  <div class='login-page' name="login">
    Login page
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Login extends Vue {

}
</script>

<style lang="scss">
@import './src/Pages/Login/login';
</style>

