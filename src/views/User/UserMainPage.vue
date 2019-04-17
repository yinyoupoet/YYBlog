<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <BaseSecondBar :selectedIndex="1"></BaseSecondBar>

      <div class="container main-container">
        <index-main></index-main>
      </div>

      <BaseLive2d></BaseLive2d>
    </div>
</template>

<script>
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import IndexMain from "../../components/MainIndexComponent/indexMain";
    import BaseSecondBar from "../../components/bases/BaseSecondBar";

    export default {
        name: "UserMainPage",
        components: {BaseTopBar,BaseSecondBar,BaseLive2d,IndexMain},
    }
</script>

<style scoped>

</style>
