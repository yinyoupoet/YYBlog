<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <BaseSecondBar :selectedIndex="3"></BaseSecondBar>

      <div class="container main-container">
        <index-message-board></index-message-board>
      </div>

      <BaseLive2d></BaseLive2d>
    </div>
</template>

<script>

  import BaseTopBar from "../../components/bases/BaseTopBar";
  import BaseLive2d from "../../components/bases/BaseLive2d";
  import BaseSecondBar from "../../components/bases/BaseSecondBar";
  import IndexMessageBoard from "../../components/MainIndexComponent/indexMessageBoard";

    export default {
        name: "UserMessageBoard",
        components: {IndexMessageBoard, BaseTopBar,BaseSecondBar,BaseLive2d},
    }
</script>

<style scoped>

</style>
