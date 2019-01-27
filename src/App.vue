<template>
  <div id="app">
    <BaseTopBar></BaseTopBar>
  </div>
</template>

<script>
import BaseSideBar from "./components/bases/BaseSideBar";
import BaseTopBar from "./components/bases/BaseTopBar";
export default {
  name: 'App',
  components: {BaseTopBar, BaseSideBar}
}
</script>

<style>

</style>
