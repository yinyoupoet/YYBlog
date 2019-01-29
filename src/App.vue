<template>
  <div id="app">
    <BaseTopBar></BaseTopBar>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseSideBar from "./components/bases/BaseSideBar";
import BaseTopBar from "./components/bases/BaseTopBar";
export default {
  name: 'App',
  components: {BaseTopBar}
}
</script>

<style>

</style>
