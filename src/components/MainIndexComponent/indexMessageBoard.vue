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
          <div class="main-part-div">
            <BaseInputComment></BaseInputComment>
            <hr class="comment-hr">
            <BaseCommentList></BaseCommentList>
          </div>
        </div>


        <BaseBottomBar></BaseBottomBar>
      </div>
    </div>
</template>

<script>
    import BaseInputComment from "../bases/BaseInputComment";
    import BaseCommentList from "../bases/BaseCommentList";
    export default {
        name: "indexMessageBoard",
      components: {BaseCommentList, BaseInputComment}
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
    margin-top: -50px;
    padding: 20px;
  }

  .comment-hr {
    background: #ccc;
  }
</style>
