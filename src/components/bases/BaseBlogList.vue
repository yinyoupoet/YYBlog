<template>
    <div>
      <div class="blog-list-head">
        排序方式：
        <ul>
          <li>时间</li>
          <li>访问量</li>
        </ul>
      </div>

      <div>
        <!-- 博客列表 -->
        <div class="blog-item" v-for="(item,index) in bloglist" :key="item.id">
          <h3 class="blog-title-h3">
            <router-link to="/blog/123" @click.native="rou($event)">鬼鬼</router-link>
            <a :href="item.blogLink" class="common-link title-link">
            <!--<a @click="rou()" class="common-link title-link">-->
              <span class="blog-top-tag" v-if="item.isTop">[TOP]</span>
              <span class="common-title-link common-hover-show">{{item.blogTitle}}</span>
            </a>
          </h3>
          <div class="blog-info-bar">
            <i class="fa fa-github-alt" aria-hidden="true"></i>{{item.publishDate}} •
            <i class="fa fa-eye" aria-hidden="true"></i>{{item.readTimes}}浏览 •
            <i class="fa fa-check-circle" aria-hidden="true"></i>{{item.category}} •
            <i class="fa fa-commenting" aria-hidden="true"></i>{{item.commentNum}}条评论
          </div>
          <div class="blog-abstract">
            <img :src="item.abstractPic"  v-if="item.abstractPic.trim()!=''" class="blog-abstract-img">
            <div class="blog-abstract-text" v-html="item.abstractText"></div>
          </div>

          <button class="common-btn">阅</button>

          <hr class="blog-item-hr">

        </div>


        <!-- 博客分页 -->
        <ul class="common-page-split-ul">
          <li class="common-page-split-li"><span class="common-page-split-span">«</span></li>
          <li class="common-page-split-li"><span class="common-page-split-span">1</span></li>
          <span>...</span>
          <li class="common-page-split-li common-page-split-li-selected"><span class="common-page-split-span">2</span></li>
          <li class="common-page-split-li"><span class="common-page-split-span">»</span></li>
        </ul>

      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseBlogList",
        data: function(){
          return {
            bloglist: [
              {
                blogId: 1,
                blogLink: "http://www.baidu.com",
                isTop:true,
                blogTitle: "乐生",
                publishDate: "2019-03-14",
                readTimes: 12345,
                category: "日常",
                commentNum: 15,
                abstractPic: "/static/test/1.jpg",
                abstractText: "是的！xiaowiba 小程序版 先已震撼发布！\n" +
                  "              功能什么的很简单，就是展示博客文章内容。边学边做，无聊的时候写点。\n" +
                  "              写起来感觉和 vue 好像。\n" +
                  "              大概 5 天时间搞了出来并通过审核发布，兼职前端的我表示页面样式未来一定会慢慢优化的。\n" +
                  "              哈哈~\n" +
                  "\n" +
                  "              若转载请注明出处: http://xiaowiba.com/ © xiaowiba.com"
              },
              {
                blogId: 1,
                blogLink: "http://www.baidu.com",
                isTop:true,
                blogTitle: "乐生",
                publishDate: "2019-03-14",
                readTimes: 12345,
                category: "日常",
                commentNum: 15,
                abstractPic: "/static/test/1.jpg",
                abstractText: "是的！xiaowiba 小程序版 先已震撼发布！\n" +
                  "              功能什么的很简单，就是展示博客文章内容。边学边做，无聊的时候写点。\n" +
                  "              写起来感觉和 vue 好像。\n" +
                  "              大概 5 天时间搞了出来并通过审核发布，兼职前端的我表示页面样式未来一定会慢慢优化的。\n" +
                  "              哈哈~\n" +
                  "\n" +
                  "              若转载请注明出处: http://xiaowiba.com/ © xiaowiba.com"
              }
            ]
          }
        },
      methods: {
          rou: function($event) {
            /*console.log("执行了");
            var ele = $event.currentTarget;
            console.log(ele);
            $(ele).unbind();
            console.log("取消绑定");*/
            console.log(this);
            this.$router.push({path: '/blog/123'});
          }
      }
    }
</script>

<style scoped>
  .blog-list-head{
    text-align: right;
    color: #888;
    display: block;
  }

  .blog-list-head ul{
    list-style: none;
    color: #333;
    padding: 20px 20px 5px 20px;
    display: inline-block;
    padding-right: 15%;
  }

  .blog-list-head li{
    display: inline-block;
    padding: 0 10px;
  }

  .blog-title-h3{
    text-align: center;
    font-family: 'Comic Sans MS','Helvetica Neue','微软雅黑','Microsoft Yahei','Microsoft Yahei',-apple-system,sans-serif;
    font-weight: 300;
  }


  .title-link{
    font-size:1.2em;
  }

  .blog-top-tag{
    color: #ff706c;
  }

  .blog-info-bar{
    text-align: center;
    color: #999;
    letter-spacing: 1px;
  }


  .blog-abstract-img {
    max-height: 350px;
    min-height: 200px;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,.5) 0 0.625rem 1.125rem;
    transition: all 0.25s ease;
    margin-bottom: 20px;
  }

  .blog-abstract-img:hover{
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  }

  .blog-abstract {
    margin-top: 20px;
    text-align: center;
  }

  .blog-abstract-text{
    text-align: left;
    font-weight: 300;
    font-family: Arial;
    padding: 0px 15% 20px;
  }

  .blog-item{
    text-align: center;
  }

  .blog-item-hr{
    height: 6px;
    margin-left:10%;
    margin-right:10%;
    background: url(/static/hr_style/hr-1.png) repeat-x 0 0;
    border: 0;
  }
</style>


