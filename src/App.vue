<template>
  <main class="main">
    <app-header></app-header>
    <router-view class="main-content"></router-view>
    <app-footer></app-footer>
  </main>
</template>

<script>
import AppHeader from './components/UI/App-Header/App-Header'
import AppFooter from './components/UI/App-Footer/App-Footer'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
@import url('./App-styles.css');
</style>
