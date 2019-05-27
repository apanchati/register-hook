<!--
  Main is called by app.js as the foremost component to render in our Vue instance. Main is the layout wrapper for the entire app.
  In turn, it calls the four regions of the app: MainHeader, MainNavigation, router-view, and MainFooter. The layout itself is styled
  via a main CSS grid, and a nested CSS grid, and can be found within the "styles" section of this file
-->
<template>
  <div class='main flipLayout' role="main">
    Main page
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})

export default class Main extends Vue {

}
</script>

<style lang="scss">
.main {
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-column-gap: 20px;
  grid-template-areas:
    'header header'
    'nav router'
    'footer footer'
  ;
  box-shadow: 0px 3px 17px -3px rgba(0, 0, 0, 0.75);
  padding: 1%;
}
.main__header {
  grid-area: header;
}
.main__nav {
  grid-area: nav;
}
.main__footer {
  grid-area: footer;
}

.flipLayout {
  grid-template-columns: 1fr minmax(180px, 10%);
  grid-template-areas: 'mainContent nav';
}
.positionFixed {
  position: fixed;
}
.shellOne {
  grid-template-columns: 1fr;
  grid-template-rows: 50px 100px 1fr 100px;
  grid-template-areas:
    'header'
    'nav router'
    'footer';
}
@media only screen and (max-width: 767px) {
  .main {
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-template-areas:
      'nav'
      'header'
      'router'
      'footer'
    ;
  }
  .main-view {
    display: flex;
    justify-content: space-between;
    align-content: center;
    grid-area: router;
    padding: 1%;
    flex-wrap: wrap;
  }
}
</style>
