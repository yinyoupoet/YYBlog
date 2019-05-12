<template>
    <div>
      <div class="blog-list-item-div" v-for="item in blogList" :key="item.blogId">
        <div class="blog-title-div"><router-link :to="'/blog/' + item.blogId" class="common-title-link">{{item.blogName}}</router-link></div>
        <div class="blog-menu-div">
          <span class="blog-menu-span"><img :src="item.authorAvatarUrl" class="blog-author-avatar-img"> {{item.authorName}}</span>
          <span class="blog-menu-span">{{item.publishDate}}</span>
          <span class="blog-menu-span">{{item.readNum}}浏览</span>
          <span class="blog-menu-span">{{item.commentNum}}评论</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseShowSimpleBlogList",
        data: function() {
          return {
            blogList: [{
              authorId: 1,
              authorName: '鬼鬼',
              authorAvatarUrl: '/static/head/12.jpg',
              publishDate: '2019-05-10 01:02:12',
              blogId: 123,
              blogName: '落英缤纷',
              readNum: 12,
              commentNum: 11
            },{
              authorId: 1,
              authorName: '鬼鬼',
              authorAvatarUrl: '/static/head/12.jpg',
              publishDate: '2019-05-10 01:02:12',
              blogId: 123,
              blogName: '落英缤纷',
              readNum: 12,
              commentNum: 11
            }]
          }
        }
    }
</script>

<style scoped>

  .blog-list-item-div{
    padding: 12px 25px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .blog-title-div{
    font-size: 1.8em;
    color: #000;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .blog-author-avatar-img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .blog-menu-span{
    font-size: 16px;
    color: #888;
    margin-right: 12px;
  }
</style>
