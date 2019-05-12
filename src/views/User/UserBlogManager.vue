<template>
    <div>
      <div class="blog-manager-main">
        <BaseTopBar></BaseTopBar>

        <div class="manager-main-div container">
          <div class="userblog-manager-title-div">
            <p class="manager-title-p">博客管理</p>
          </div>
          <div class="userblog-manager-options-list">
            <router-link :to="blogOptionsConfig.allBlogUrl" class="manager-option-link">全部（{{blogOptionsConfig.allNum}}）</router-link>
            <router-link :to="blogOptionsConfig.publicBlogUrl" class="manager-option-link">公开（{{blogOptionsConfig.publicNum}}）</router-link>
            <router-link :to="blogOptionsConfig.privateBlogUrl" class="manager-option-link">私密（{{blogOptionsConfig.privateNum}}）</router-link>
            <router-link :to="blogOptionsConfig.draftBlogUrl" class="manager-option-link">草稿（{{blogOptionsConfig.draftNum}}）</router-link>
          </div>

          <div class="manager-content">
              <router-view></router-view>
          </div>

          <BaseBottomBar></BaseBottomBar>
        </div>

        <BaseLive2d></BaseLive2d>
      </div>
    </div>
</template>

<script>
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    export default {
      name: "UserBlogManager",
      components: {BaseBottomBar, BaseLive2d, BaseTopBar},
      data: function() {
        return {
          blogOptionsConfig: {
            allNum: 123,
            allBlogUrl: '/userBlogManager/1/',
            publicNum: 122,
            publicBlogUrl: '/userBlogManager/1/public',
            privateNum: 1,
            privateBlogUrl: '/userBlogManager/1/private',
            draftNum: 4,
            draftBlogUrl: '/userBlogManager/1/draft',
          }
        }
      }
    }
</script>

<style scoped>
  .blog-manager-main{
    background: #fafafa;
    font-family: 'Comic Sans MS','Open Sans','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
    overflow-x: hidden;
  }
  .userblog-manager-title-div{
    margin-top: 20px;
  }
  .manager-title-p{
    font-size: 1.25em;
    text-shadow: 1px 1px 5px rgba(0,0,0,0.3);
  }

  .manager-option-link{
    padding: 5px 10px;
    text-decoration: none;
    color: #000;
    transition: all 0.3s ease-in-out;
  }

  .manager-option-link:hover{
    color: #F1562A;
  }


  .router-link-active {
    text-decoration: none;
  }

  .router-link-exact-active{
    text-decoration: none;
    color: #F1562A;
  }

  .manager-content{
    padding: 20px 20px;
    min-height: 360px;
  }


</style>
