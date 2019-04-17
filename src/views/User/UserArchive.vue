<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <BaseSecondBar :selectedIndex="2"></BaseSecondBar>

      <div class="container main-container">
        <index-archive></index-archive>
      </div>

      <BaseLive2d></BaseLive2d>
    </div>
</template>

<script>

  import BaseTopBar from "../../components/bases/BaseTopBar";
  import BaseLive2d from "../../components/bases/BaseLive2d";
  import BaseSecondBar from "../../components/bases/BaseSecondBar";
  import IndexArchive from "../../components/MainIndexComponent/indexArchive";

    export default {
        name: "UserArchive",
        components: {IndexArchive, BaseTopBar,BaseSecondBar,BaseLive2d},
    }
</script>

<style scoped>

</style>
