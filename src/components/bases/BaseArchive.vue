<template>
  <div>
    <div class="container-fluid archive-main-div">
      <h3 class="shaky">{{userName}}</h3>
      <p class="blog-info">
        博主诞生于{{registerTime}}，于{{firstBlogTime}}撰写了第一篇博客，到目前为止已发表了{{blogNum}}篇文章，共被访问{{visitNum}}次，收到了{{commentNum}}条评论</p>

      <h3 class="shaky">标签云</h3>
      <ul class="archive-tag-ul">
        <a class="archive-tag-li-a" v-for="(item, index) in tagList" :key="index" :href="item.tagLink">
          <li class="archive-tag-li">{{item.tagName}}（{{item.blogNum}})</li>
        </a>
      </ul>

      <h3 class="shaky">TOP 10</h3>
      <ul class="archive-top-ul common-list-ul">
        <a class="archive-tag-li-a" v-for="item in topBlogList" :key="item.index" :href="item.blogLink">
          <li class="archive-top-li common-list-li">
            <span class="archive-top-seq">[{{item.index}}]</span>
            <span class="archive-top-title common-hover-show">{{item.blogTitle}}</span>
            <span class="archive-top-visitNum">[浏览：{{item.visitNum}}]</span>
            <span class="archive-top-commentNum">[评论：{{item.commentNum}}]</span>
          </li>
        </a>
      </ul>


      <!--所有归档文章-->
      <div class="archive-all-list-div">

        <!--一个月的文章-->
        <div class="archive-list-item-div" v-for="item in allBlogList">
          <h4 class="archive-year-month">{{item.yearAndMonthFormat}}</h4>
          <ul class="archive-month-ul">
            <a class="archive-tag-li-a" v-for="blog in item.blogList" :href="blog.blogLink">
              <li class="archive-month-li">
                <span class="archive-month-list-time">{{blog.publishDateFormat}}</span>
                <span class="archive-top-title common-hover-show">{{blog.blogTitle}}</span>
                <span class="archive-top-visitNum">[浏览：{{blog.visitNum}}]</span>
                <span class="archive-top-commentNum">[评论：{{blog.commentNum}}]</span>
              </li>
            </a>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseArchive",
    data: function () {
      return {
        userName: "Yinyoupoet",
        registerTime: '2015-10-12',
        firstBlogTime: '2015-11-12',
        blogNum: 25,
        visitNum: 12345,
        commentNum: 222,
        tagList: [
          {
            tagLink: 'http://www.baidu.com1',
            tagName: '爱情',
            blogNum: 2
          },
          {
            tagLink: 'http://www.baidu.com2',
            tagName: '爱新觉罗',
            blogNum: 2
          },
          {
            tagLink: 'http://www.baidu.com3',
            tagName: '般若波罗蜜',
            blogNum: 2
          }
        ],
        topBlogList: [
          {
            index: 1,
            blogLink: "http://www.baidu.com1",
            blogTitle: "论吃螃蟹与不吃螃蟹",
            visitNum: 20000,
            commentNum: 200
          },
          {
            index: 2,
            blogLink: "http://www.baidu.com2",
            blogTitle: "Hello world!",
            visitNum: 20000,
            commentNum: 200
          }
        ],
        allBlogList: [
          {
            yearAndMonthFormat: '2019-Mar',
            blogList: [
              {
                blogLink: 'http://www.baidu.com',
                publishDateFormat: '03-18',
                blogTitle: 'Eat apple is good',
                visitNum: 200,
                commentNum: 100
              },
              {
                blogLink: 'http://www.baidu.com',
                publishDateFormat: '03-18',
                blogTitle: 'Eat apple is good',
                visitNum: 200,
                commentNum: 100
              }
            ]
          },
          {
            yearAndMonthFormat: '2019-Mar',
            blogList: [
              {
                blogLink: 'http://www.baidu.com',
                publishDateFormat: '03-18',
                blogTitle: 'Eat apple is good',
                visitNum: 200,
                commentNum: 100
              },
              {
                blogLink: 'http://www.baidu.com',
                publishDateFormat: '03-18',
                blogTitle: 'Eat apple is good',
                visitNum: 200,
                commentNum: 100
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .archive-main-div {
    margin: 0 30px;
    font-family: 'Comic Sans MS', 'Mirages Custom', 'Merriweather', 'Open Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'Segoe UI Emoji', 'Segoe UI Symbol', Helvetica, Arial, sans-serif;
  }

  .blog-info {
    text-indent: 2em;
    border-radius: 10px;
    cursor: pointer;
    padding: 5px 10px;
  }
  .blog-info:hover{
    background: #eee;
  }


  .archive-tag-ul {
    list-style: none;
  }

  .archive-tag-li {
    display: inline-block;
    margin: 2px 4px;
    padding: 10px 10px;
    border: #fff 1px solid;
    border-radius: 10px;
    font-weight: 500;

  }

  .archive-tag-li:hover {
    background: #eee;
  }

  .archive-tag-li-a {
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }

  .archive-tag-li-a:link {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  .archive-tag-li-a:active {
    color: #333;
    cursor: pointer;
  }

  .archive-tag-li-a:visited {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  .archive-tag-li-a:hover {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  h3 {
    color: #777;
    font-weight: 100;
    font-family: 'Mirages Custom', 'Merriweather', 'Open Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'Segoe UI Emoji', 'Segoe UI Symbol', Helvetica, Arial, sans-serif;
  }


  .archive-top-ul {
    padding-left: 10px;
  }

  .archive-top-li {
    font-size: 1.2em;
    line-height: 1.125em;
    padding: 7px 10px;
    border-radius: 10px;
  }

  .archive-top-li:hover {
    background: #eee;
  }


  .archive-top-seq {
    margin-right: 5px;
    font-size: 1.1em;
    font-weight: 500;
    color: #777;
  }

  .archive-top-visitNum {
    color: #1ABC9C;
  }


  .archive-top-commentNum {
    color: #ff706c;
  }

  .archive-all-list-div {
    margin-top: 30px;
  }

  .archive-month-ul {
    padding-left: 10px;
    list-style: none;
  }
  .archive-month-li{
    padding: 7px 10px;
    font-weight: 500;
    font-size: 1.2em;
    line-height: 1.125em;
    border-radius: 10px;
    margin: 5px 0;
  }

  .archive-month-li:hover{
    background: #eee;
  }

  .archive-month-list-time {
    color: #777;
    margin-right: 5px;
  }
  .archive-list-item-div{
    margin: 2.5em 0;
  }
</style>
