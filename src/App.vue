<template>
  <div id="app">
    <keep-alive>
    <router-view/>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"/>
  </div>
</template>

<script>
// import MainTabBar from 'compontent/content/mainTabbar/MainTabBar'
import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
    
  }
}
</script>

<style>
@import "./assets/css/base.css";
.main-tab-bar{
  z-index: 5;
}
</style>
