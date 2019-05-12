<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <div class="collection-main-div">
        <div class="collection-dir-top-out-div">
          <div class="container collection-dir-top-div">
            <div class="row">
              <div class="collection-top-author-div col-xs-2">
                <img :src="authorAvatarUrl" class="collection-top-img">
                <p class="author-name-p"><router-link :to="'/user/' + authorId" class="author-link">{{authorName}}</router-link></p>
              </div>
              <div class="collection-top-intro-div col-xs-10">
                <p class="collection-top-title">{{collectionName}}</p>
                <p class="collection-top-describe">{{collectionDescribe}}</p>
                <div class="collection-top-menu">
                  <p class="collection-menu-item">创建于 {{createTime}}</p>
                  <span class="collection-menu-item">包含{{blogNum}}篇博客</span>
                  <span class="collection-menu-item">已有{{followerNum}}人关注</span>
                </div>

                <button class="collection-followed-btn collection-btn" v-if="isFollowed" @click="cancelFollow()">
                  已关注
                </button>
                <button class="collection-not-following-btn collection-btn" v-else @click="addFollow()">
                  ＋关注
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container blog-list-div">
          <BaseShowSimpleBlogList></BaseShowSimpleBlogList>
        </div>

      </div>

      <BaseBottomBar></BaseBottomBar>
      <BaseLive2d></BaseLive2d>
    </div>
</template>

<script>
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import BaseShowSimpleBlogList from "../../components/bases/BaseShowSimpleBlogList";
    export default {
        name: "CollectionDir",
        components: {BaseShowSimpleBlogList, BaseLive2d, BaseBottomBar, BaseTopBar},
        data: function() {
          return {
            authorId: 1,
            authorName: '鬼鬼',
            authorAvatarUrl: '/static/head/11.jpg',
            collectionId: 1,
            collectionName: '秋山吟赏',
            blogNum: 12,
            followerNum: 123,
            createTime: '2019-05-10 10:10:10',
            collectionDescribe: '呵呵....',
            isFollowed: false
          }
        },
      methods: {
          cancelFollow: function() {
            this.isFollowed = false;
          },
          addFollow: function() {
            this.isFollowed = true;
          }
      }
    }
</script>

<style scoped>
  .collection-main-div{
    font-family: "Comic Sans MS", "Helvetica Neue", 微软雅黑, "Microsoft Yahei", "Microsoft Yahei", -apple-system, sans-serif;
  }
  .collection-dir-top-out-div{
    border-bottom: 1px solid #ccc;
    border-radius: 10px;
  }

  .collection-dir-top-div{
    padding: 30px 30px 0;
  }


  .collection-top-img {
    width: 150px;
    height: 150px;
    border-radius: 20px;
  }

  .author-name-p{
    margin-top: 5px;
    font-weight: 600;
    font-size: 1.2em;
  }

  .author-link {
    text-decoration: none;
    color: #000;
    transition: all 0.3s ease-in-out;
  }

  .author-link:hover{
    color: #f1562a;
  }


  .collection-top-author-div{
    text-align: center;
  }

  .collection-top-title{
    font-size: 2em;
    font-weight: 600;
  }

  .collection-top-menu{
    color: #999;
    font-weight: 600;
  }

  .collection-top-describe{
    color: #000;
    font-size: 15px;
  }

  .collection-menu-item{
    margin-right: 10px;
  }

  .collection-btn{
    padding: 8px 15px;
    border-radius: 5px;
    outline: none;
    margin-top: 10px;
    transition: all 0.3s ease-in-out;
  }

  .collection-followed-btn{
    background: #eee;
    color: #000;
    border: 1px solid #ccc;
  }

  .collection-followed-btn:hover{
    background: #ccc;
  }


  .collection-not-following-btn{
    background: #4db6ac;
    color: #fff;
    border: 1px solid #009688
  }

  .collection-not-following-btn:hover{
    background: #009688;
  }


  .blog-list-div {
    margin-top: 20px;
  }
</style>
