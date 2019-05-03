<template>
  <div>
    <BaseTopBar></BaseTopBar>
    <BaseSecondBar :selectedIndex="1"></BaseSecondBar>

    <div class="container main-container">
      <div class="row main-layout">
        <div class="col-xs-3">
          <BaseUserPageInfo class="user-page-info"></BaseUserPageInfo>
          <BaseFollowingModule></BaseFollowingModule>
          <BaseFollowersModule></BaseFollowersModule>
          <BaseRecentVisit></BaseRecentVisit>
        </div>
        <div class="col-xs-9">
          <router-view class="main-part-div"></router-view>
        </div>
        <BaseBottomBar></BaseBottomBar>
      </div>
      <BaseLive2d/>
    </div>
  </div>


</template>

<script>

  import BaseTopBar from "../../components/bases/BaseTopBar";
  import BaseLive2d from "../../components/bases/BaseLive2d";
  import BaseSecondBar from "../../components/bases/BaseSecondBar";
  import BaseBottomBar from "../../components/bases/BaseBottomBar";

  export default {
    name: "UserPage",
    components: {BaseBottomBar, BaseTopBar,BaseSecondBar,BaseLive2d},
  }

</script>

<style scoped>
  .user-page-info{
    width: 100%;
    padding: 5px 5px 20px 0;
    margin-top:-40px;
  }


  .main-layout {
    position: absolute;
    width: 80%;
  }

  .main-part-div{
    margin-top: -70px;
  }
</style>
