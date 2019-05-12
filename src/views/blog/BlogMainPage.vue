<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <div class="blog-page-div">
        <!--一个菜单栏，目前只有一个返回主页-->
        <div class="left-menu-icon">
          <router-link class="common-title-link" :to="blogerMainPageUrl">
            <span class="fa-stack fa-lg">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-home fa-stack-1x"></i>
            </span>
          </router-link>
        </div>
        <div class="container blog-content">
          <div class="blog-title">
            <span class="common-title-link blog-title-span">{{blogTitle}}</span>
          </div>
          <div class="blog-info-bar">
            <i class="fa fa-github-alt" aria-hidden="true"></i>{{publishDate}} •
            <i class="fa fa-eye" aria-hidden="true"></i>{{readTimes}}浏览 •
            <i class="fa fa-check-circle" aria-hidden="true"></i>{{category}} •
            <i class="fa fa-commenting" aria-hidden="true"></i>{{commentNum}}条评论
          </div>
          <div class="blog-tags">
            <div v-for="(item, index) in blogTagList" :key="index" class="blog-tag-div">
              <router-link :to="item.tagUrl" class="blog-tag-link">{{item.tagName}}</router-link>
            </div>
          </div>
          <!--中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式-->
          <div class="blog-text-div">
            <BaseBlogContent :blogContent="blogContent"></BaseBlogContent>
          </div>

          <div>
            <BaseBottomBar></BaseBottomBar>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import BaseBlogContent from "../../components/bases/BaseBlogContent";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import BaseTopBar from "../../components/bases/BaseTopBar";
    export default {
        name: "BlogMainPage",
      components: {BaseTopBar, BaseBottomBar, BaseBlogContent},
      mounted(){
          this.doAutoType($('.blog-title-span'), 150)
        },
        data: function() {
          return {
            blogerMainPageUrl: '/user/123',
            blogTitle: '我自横刀向天笑',
            publishDate: '2019-01-02 20:12:13',
            readTimes: 123,
            category: '日常',
            commentNum: 125,
            blogTagList: [{
              tagName: '日常',
              tagUrl: '/user/1/archive/tag/1'
            },{
              tagName: '肥宅',
              tagUrl: '/user/1/archive/tag/2'
            }],
            blogContent: '<p>中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式中间是博客正文了，但是关于博客正文的样式，必须有单独的设置，因此采用组件的方式</p><a href="http://www.baidu.com">888</a>' +
              '<img src="/static/test/1.jpg">'
          }
        },
      methods: {
        doAutoType: function(ele,t) {
          var str = ele.html();
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


  .left-menu-icon{
    position: fixed;
    top: 90px;
    left: 50px;
  }

  .blog-content{
    padding: 50px 20px 0;
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

  .blog-tags{
    text-align: center;
    margin-top: 6px;
  }

  .blog-tag-div{
    display: inline-block;
    margin: 5px;
    text-align: center;
  }

  .blog-tag-link{
    color: #999;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid #999;
    padding: 2px 8px;
    transition: all 0.5s ease-in-out;
  }

  .blog-tag-link:hover{
    border: 1px solid #e65100;
    color: #e65100;
  }

  .blog-text-div{
    margin-top: 50px;
    padding: 0 100px;
    line-height: 1.8em;
    font-family: 'Comic Sans MS','Open Sans','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
    color: #333;
    font-weight: 900;
  }

</style>
