<template>
  <div id="app">
    <!--<BaseTopBar></BaseTopBar>
    <router-view></router-view>

    <div class="container main-container">
      <index-main></index-main>
      &lt;!&ndash;<index-archive></index-archive>&ndash;&gt;
    </div>

    <BaseLive2d></BaseLive2d>-->
    <router-view></router-view>

  </div>
</template>

<script>


  import BaseTopBar from "./components/bases/BaseTopBar";
  import BaseLive2d from "./components/bases/BaseLive2d";
  import BaseUserPageInfo  from "./components/bases/BaseUserPageInfo"
  import BaseFollowingModule from "./components/bases/BaseFollowingModule";
  import BaseFollowersModule from "./components/bases/BaseFollowersModule";
  import BaseRecentVisit from "./components/bases/BaseRecentVisit";
  import BaseBlogList from "./components/bases/BaseBlogList";
  import BaseBottomBar from "./components/bases/BaseBottomBar";
  import BaseArchive from "./components/bases/BaseArchive";
  import IndexMain from "./components/MainIndexComponent/indexMain";
  import IndexArchive from "./components/MainIndexComponent/indexArchive";

 export default {
    name: 'App',
   components: {
     IndexArchive,
     IndexMain,
     BaseArchive,
     BaseBottomBar,
     BaseBlogList,
     BaseRecentVisit, BaseFollowersModule, BaseLive2d, BaseTopBar, BaseUserPageInfo,BaseFollowingModule}
  }

</script>

<style>






</style>
