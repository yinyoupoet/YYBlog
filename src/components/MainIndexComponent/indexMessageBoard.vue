<template>
    <div>
          <div class="main-part-div">
            <BaseInputComment></BaseInputComment>
            <hr class="comment-hr">
            <BaseCommentList></BaseCommentList>
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
  .main-part-div{
    margin-top: -30px;
    padding: 20px;
  }

  .comment-hr {
    background: #ccc;
  }
</style>
