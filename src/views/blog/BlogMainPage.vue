<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <div class="blog-page-div row">
        <!--一个菜单栏，目前只有一个返回主页-->
        <div class="left-menu-icon col-xs-2">
          <router-link class="common-title-link left-menu-link" :to="blogerMainPageUrl">
            <span class="fa-stack fa-lg">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-home fa-stack-1x"></i>
            </span>
          </router-link>
          <router-link class="common-title-link left-menu-link" :to="blogerMainPageUrl">
            <span class="fa-stack fa-lg">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-pencil fa-stack-1x" aria-hidden="true"></i>
            </span>
          </router-link>
        </div>
        <div class="blog-content col-xs-8">
          <div class="blog-title">
            <span class="common-title-link blog-title-span">{{blogTitle}}</span>
          </div>
          <div class="blog-info-bar">
            <i class="fa fa-optin-monster" aria-hidden="true"></i>{{categoryName}} •
            <i class="fa fa-github-alt" aria-hidden="true"></i>{{publishDate}} •
            <i class="fa fa-eye" aria-hidden="true"></i>{{readTimes}}浏览 •
            <i class="fa fa-check-circle" aria-hidden="true"></i>{{tagName}} •
            <i class="fa fa-commenting" aria-hidden="true"></i>{{commentNum}}条评论 •
            <i class="fa fa-anchor" aria-hidden="true"></i><span v-if="originType=='原创'">{{originType}}</span>
            <span v-else-if="originUrl!= null && originUrl.trim()!=''"><a :href="originUrl" target="_blank">{{originType}}</a></span>
            <span v-else>{{originType}}</span>
          </div>
          <!--中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式-->
          <div class="blog-text-div">
            <BaseBlogContent :blogContent="blogContent"></BaseBlogContent>
          </div>

          <div>
            <BaseBottomBar></BaseBottomBar>
          </div>
        </div>

        <div class="col-xs-2 right-bar">
          <BaseUserPageInfo></BaseUserPageInfo>
        </div>


      </div>
    </div>
</template>

<script>
    import BaseBlogContent from "../../components/bases/BaseBlogContent";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseSideBar from "../../components/bases/BaseSideBar";
    import BaseUserPageInfo from "../../components/bases/BaseUserPageInfo";
    export default {
        name: "BlogMainPage",
      components: {BaseUserPageInfo, BaseSideBar, BaseTopBar, BaseBottomBar, BaseBlogContent},
      mounted() {
        // 获取用户ID，用来判断其是否具有该博客的访问权限
        var userId = sessionStorage.getItem("userId");
        if (userId == null) {
          // 表示没有登录，则默认为0
          userId = 0;
        }

        // 根据URL获取博客ID
        let blogId = this.$route.params.id;
        this.blogId = blogId;
        this.$http.post('http://127.0.0.1:8080/blog/initBlog', {
          userId: userId,
          blogId: blogId
        }).then((response) => {
          console.log(response);
          var blog = response.data.blog;
          var authorId = blog.authorId;
          this.blogerMainPageUrl = '/user/' + authorId;
          this.blogTitle = blog.blogTitle;
          this.publishDate = response.data.publishTime;
          this.readTimes = blog.visitNum;
          this.categoryName = response.data.categoryName;
          this.tagId = blog.tagId;
          this.tagName = response.data.tagName;
          this.commentNum = blog.commentNum;
          this.blogContent = response.data.parsedContent;
          this.originType = blog.originType;
          this.originUrl = blog.originUrl;

          this.doAutoType($('.blog-title-span'), 150);
        }).catch((exception) => {
          console.log(exception);
          alert("加载失败");
        });

      },
        data: function() {
          return {
            blogId: '',
            blogerMainPageUrl: '',
            blogTitle: '',
            publishDate: '',
            readTimes: '',
            categoryName: '',
            tagId: '',
            tagName: '',
            commentNum: '',
            blogContent: '',
            originType: '',
            originUrl: ''
          }
        },
      methods: {
        doAutoType: function(ele,t) {
          console.log("doAutoType");
          var str = this.blogTitle;
          ele.css("opacity","0");

          ele.html(str.substring(0,1));
          ele.css("opacity","1");
          //console.log(str);
          var stopType = false;
          var tempWords = "";
          var time = t;

          var startType = setInterval(function(){
            if(tempWords.length == str.length){
              //打字打完了，就可以停止了
              stopType = true;
            }
            if(stopType){
              clearInterval(startType);
            }
            tempWords = str.substring(0,tempWords.length+1);
            ele.html(tempWords);

          },time);

        },
      }
    }
</script>

<style scoped>
  .blog-page-div {
    margin: 0;
    padding: 0;
    background: #fafafa;
    width: 100%;
    height: 100%;
    background-size: cover;
    font-family: 'Comic Sans MS','Open Sans','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
  }

  .left-menu-link {
    display: block;
  }


  .left-menu-icon{
    position: fixed;
    top: 90px;
    left: 50px;
  }

  .blog-content{
    padding: 50px 20px 0;
    margin: 0 auto;
    float: none;
  }

  .blog-title{
    font-weight: 500;
    font-size: 2em;
    text-align: center;
    height: 1.5em;
  }

  .blog-info-bar{
    margin-top: 20px;
    text-align: center;
    color: #999;
    letter-spacing: 1px;
  }


  .blog-text-div{
    margin-top: 50px;
    padding: 0 100px;
    line-height: 1.8em;
    font-family: 'Comic Sans MS','Open Sans','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
    color: #333;
    font-weight: 900;
    min-height: 300px;
  }

  .right-bar {
    position: fixed;
    top: 90px;
    right: 50px;
  }
</style>
