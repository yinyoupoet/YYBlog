<template>
    <div>
      <div class="blog-list-div">
        <div class="blog-list-item" v-for="blog in blogList" :key="blog.blogId">
          <router-link :to="'/blog/' + blog.blogId" class="common-title-link blog-title">
            {{blog.blogTitle}}
          </router-link>

          <div class="blog-item-abstract">
            <!--有图-->
            <div v-if="blog.abstractPic.trim()!=''" class="row">
              <div class="col-xs-3 blog-img-div">
                <img :src="blog.abstractPic" class="blog-img">
              </div>
              <div class="col-xs-9 blog-text-div">
                {{blog.abstractText}}
              </div>
            </div>
            <div v-else class="blog-text-div">
              {{blog.abstractText}}
            </div>
          </div>

          <div class="blog-item-menu-div">
            <span class="blog-menu-item">
              {{blog.publishDate}}
            </span>
            <span class="blog-menu-item">
              <router-link :to="'/user/' + blog.authorId" class="blog-author-link">{{blog.authorName}}</router-link>
            </span>

            <span class="blog-menu-item">
              <i class="fa fa-eye" aria-hidden="true"></i> {{blog.readTimes}}
            </span>

            <span class="blog-menu-item">
              <i class="fa fa-commenting" aria-hidden="true"></i> {{blog.commentNum}}
            </span>

          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseIndexBlogList",
        data: function() {
          return {
            blogList: [{
              blogId: 1,
              isTop:true,
              authorName: '鬼鬼',
              authorId: '1',
              blogTitle: "乐生",
              publishDate: "2019-03-14 12:12:12",
              readTimes: 12345,
              category: "日常",
              commentNum: 15,
              isOriginal: true,     /*是否原创*/
              abstractPic: "/static/test/1.jpg",
              abstractText: "是的！xiaowiba 小程序版 先已震撼发布！\n" +
                "              功能什么的很简单，就是展示博客文章内容。边学边做，无聊的时候写点。\n" +
                "              写起来感觉和 vue 好像。\n" +
                "              大概 5 天时间搞了出来并通过审核发布，兼职前端的我表示页面样式未来一定会慢慢优化的。\n" +
                "              哈哈~\n" +
                "\n" +
                "              若转载请注明出处: http://xiaowiba.com/ © xiaowiba.com"
            },{
              blogId: 1,
              isTop:true,
              blogTitle: "乐生",
              publishDate: "2019-03-14 12:12:12",
              authorName: '鬼鬼',
              authorId: '1',
              readTimes: 12345,
              category: "日常",
              commentNum: 15,
              isOriginal: true,     /*是否原创*/
              abstractPic: "",
              abstractText: "是的！xiaowiba 小程序版 先已震撼发布！\n" +
                "              功能什么的很简单，就是展示博客文章内容。边学边做，无聊的时候写点。\n" +
                "              写起来感觉和 vue 好像。\n" +
                "              大概 5 天时间搞了出来并通过审核发布，兼职前端的我表示页面样式未来一定会慢慢优化的。\n" +
                "              哈哈~\n" +
                "\n" +
                "              若转载请注明出处: http://xiaowiba.com/ © xiaowiba.com"
            }]
          }
        },
      methods: {
      }
    }
</script>

<style scoped>
  .blog-list-item{
    padding: 20px 30px 10px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
  }
  .blog-list-item:hover{
    background: rgba(188,188,188,0.3);
  }

  .blog-title{
    display: inline-block;
    font-weight: 600;
    font-size: 1.4em;
    margin-bottom: 10px;
    font-family: 'Comic Sans MS','Helvetica Neue','微软雅黑','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
  }

  .blog-item-abstract{
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .blog-img{
    width: 100%;
    background-size: cover;
    border-radius: 5px;
  }


  .blog-img-div {
    padding: 0 20px 0 15px;
  }

  .blog-text-div{
    color: #333;
    line-height: 1.5em;
    letter-spacing: 1px;
  }

  .blog-item-menu-div{
    margin-top: 12px;
  }

  .blog-menu-item{
    color: #999;
    line-height: 24px;
    margin-right: 15px;
  }

  .blog-author-link{
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    color: #999;
  }

  .blog-author-link:hover{
    color: #000;
  }


</style>
