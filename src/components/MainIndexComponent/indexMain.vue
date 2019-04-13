<template>
    <div>
      <div class="row main-layout">
        <div class="col-xs-3">
          <BaseUserPageInfo class="user-page-info"></BaseUserPageInfo>
          <BaseFollowingModule></BaseFollowingModule>
          <BaseFollowersModule></BaseFollowersModule>
          <BaseRecentVisit></BaseRecentVisit>
        </div>
        <div class="col-xs-9">
          <BaseBlogList class="main-part-div"></BaseBlogList>
        </div>


        <BaseBottomBar></BaseBottomBar>
      </div>
    </div>
</template>

<script>
    export default {
        name: "indexMain"
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
